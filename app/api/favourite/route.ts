import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";


type MediaType = "anime" | "movie" | "tv";

interface FavouriteRequest {
  mediaType: MediaType;
  mediaId: number;
  title?: string;
  name?: string;
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        favouriteAnimes: {
          include: {
            titles: true,
            images: true,
            trailer: true,
            genres: { include: { genre: true } },
            studios: { include: { studio: true } },
            producers: { include: { producer: true } },
          },
        },
        favouriteMovies: {
          include: {
            genres: { include: { genre: true } },
          },
        },
        favouriteTvShows: {
          include: {
            genres: { include: { genre: true } },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // --- format unified response ---
    const animeFavourites = user.favouriteAnimes.map((a) => ({
      type: "anime" as const,
      id: a.id,
      malId: a.malId,
      title:
        a.titles?.find((t) => t.type === "Default")?.title ||
        a.titles?.[0]?.title ||
        "Unknown Anime",
      image: a.images?.jpgUrl || null,
      score: a.score,
      year: a.year,
      synopsis: a.synopsis,
      genres: a.genres.map((g) => g.genre.name),
    }));

    const movieFavourites = user.favouriteMovies.map((m) => ({
      type: "movie" as const,
      id: m.id,
      tmdbId: m.tmdbId,
      title: m.title,
      image: m.posterPath,
      score: m.voteAverage,
      year: m.releaseDate ? new Date(m.releaseDate).getFullYear() : null,
      synopsis: m.overview,
      genres: m.genres.map((g) => g.genre.name),
    }));

    const tvFavourites = user.favouriteTvShows.map((t) => ({
      type: "tv" as const,
      id: t.id,
      tmdbId: t.tmdbId,
      title: t.name,
      image: t.posterPath,
      score: t.voteAverage,
      year: t.firstAirDate
        ? new Date(t.firstAirDate).getFullYear()
        : null,
      synopsis: t.overview,
      genres: t.genres.map((g) => g.genre.name),
    }));

    const allFavourites = [
      ...animeFavourites,
      ...movieFavourites,
      ...tvFavourites,
    ];

    return NextResponse.json({ favourites: allFavourites });
  } catch (error: any) {
    console.error("GET favourites error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



//POST
async function fetchJikanAnime(malId: number) {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${malId}`);
  if (!res.ok) throw new Error(`Jikan fetch failed: ${res.status}`);
  const json = await res.json();
  return json.data;
}

async function fetchTmdbMovie(tmdbId: number) {
  const key = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const res = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${key}&language=en-US`);
  if (!res.ok) throw new Error(`TMDB movie fetch failed: ${res.status}`);
  return await res.json();
}

async function fetchTmdbTv(tmdbId: number) {
  const key = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const res = await fetch(`https://api.themoviedb.org/3/tv/${tmdbId}?api_key=${key}&language=en-US`);
  if (!res.ok) throw new Error(`TMDB tv fetch failed: ${res.status}`);
  return await res.json();
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: FavouriteRequest = await req.json();
    const { mediaType, mediaId, title, name } = body;
    if (!mediaType || !mediaId)
      return NextResponse.json({ error: "Missing mediaType or mediaId" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // -------- prepare config that contains a create function (which may call external API) --------
    const config = (() => {
      switch (mediaType) {
        case "anime":
          return {
            relationField: "favouriteAnimes" as const,
            find: async () => prisma.anime.findUnique({ where: { malId: mediaId } }),
            create: async () => {
              // fetch from Jikan
              const data = await fetchJikanAnime(mediaId);
              // prepare nested create objects
              const titles = (data.titles || []).map((t: any) => ({ type: t.type, title: t.title }));
              const jpg = data.images?.jpg?.image_url ?? null;
              const webp = data.images?.webp?.image_url ?? null;
              const trailer = data.trailer;
              // genres/studios/producers connectOrCreate
              const genresConnectOrCreate = (data.genres || []).map((g: any) => ({
                where: { malId: g.mal_id },
                create: { malId: g.mal_id, name: g.name },
              }));
              const studiosConnectOrCreate = (data.studios || []).map((s: any) => ({
                where: { malId: s.mal_id },
                create: { malId: s.mal_id, name: s.name },
              }));
              const producersConnectOrCreate = (data.producers || []).map((p: any) => ({
                where: { malId: p.mal_id },
                create: { malId: p.mal_id, name: p.name },
              }));
              // create
              return prisma.anime.create({
                data: {
                  malId: data.mal_id,
                  synopsis: data.synopsis ?? "",
                  background: data.background ?? null,
                  score: data.score ?? null,
                  rank: data.rank ?? null,
                  popularity: data.popularity ?? null,
                  members: data.members ?? null,
                  favorites: data.favorites ?? null,
                  episodes: data.episodes ?? null,
                  status: data.status ?? null,
                  rating: data.rating ?? null,
                  season: data.season ?? null,
                  year: data.year ?? null,
                  type: data.type ?? null,
                  duration: data.duration ?? null,
                  source: data.source ?? null,
                  airedString: data.aired?.string ?? null,
                  // nested relations
                  titles: {
                    create: titles,
                  },
                  images: jpg || webp
                    ? {
                        create: {
                          jpgUrl: jpg ?? "",
                          webpUrl: webp ?? null,
                        },
                      }
                    : undefined,
                  trailer: trailer && trailer.embed_url
                    ? {
                        create: {
                          url: trailer.url ?? null,
                          youtubeId: trailer.youtube_id ?? null,
                          embedUrl: trailer.embed_url ?? "",
                          imageUrl: trailer.images?.image_url ?? null,
                          smallImageUrl: trailer.images?.small_image_url ?? null,
                          mediumImageUrl: trailer.images?.medium_image_url ?? null,
                          maximumImageUrl: trailer.images?.maximum_image_url ?? null,
                        },
                      }
                    : undefined,
                  // connectOrCreate genres/studios/producers
                  genres: genresConnectOrCreate.length
                    ? { create: genresConnectOrCreate.map((g: any) => ({ genre: { connectOrCreate: g } })) }
                    : undefined,
                  studios: studiosConnectOrCreate.length
                    ? { create: studiosConnectOrCreate.map((s: any) => ({ studio: { connectOrCreate: s } })) }
                    : undefined,
                  producers: producersConnectOrCreate.length
                    ? { create: producersConnectOrCreate.map((p: any) => ({ producer: { connectOrCreate: p } })) }
                    : undefined,
                },
              });
            },
          };

        case "movie":
          return {
            relationField: "favouriteMovies" as const,
            find: async () => prisma.movie.findUnique({ where: { tmdbId: mediaId } }),
            create: async () => {
              const data = await fetchTmdbMovie(mediaId);
              // map genres -> use same Genre table; store TMDB id in malId (shared field)
              const genresCOC = (data.genres || []).map((g: any) => ({
                where: { malId: g.id },
                create: { malId: g.id, name: g.name },
              }));
              return prisma.movie.create({
                data: {
                  tmdbId: data.id,
                  title: data.title ?? data.original_title ?? "Unknown",
                  overview: data.overview ?? "",
                  posterPath: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null,
                  backdropPath: data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : null,
                  releaseDate: data.release_date ? new Date(data.release_date) : new Date(),
                  voteAverage: data.vote_average ?? 0,
                  voteCount: data.vote_count ?? 0,
                  popularity: data.popularity ?? 0,
                  originalLanguage: data.original_language ?? "",
                  originalTitle: data.original_title ?? "",
                  adult: !!data.adult,
                  video: !!data.video,
                  genres: genresCOC.length
                    ? { create: genresCOC.map((g: any) => ({ genre: { connectOrCreate: g } })) }
                    : undefined,
                },
              });
            },
          };

        case "tv":
          return {
            relationField: "favouriteTvShows" as const,
            find: async () => prisma.tvShow.findUnique({ where: { tmdbId: mediaId } }),
            create: async () => {
              const data = await fetchTmdbTv(mediaId);
              const genresCOC = (data.genres || []).map((g: any) => ({
                where: { malId: g.id },
                create: { malId: g.id, name: g.name },
              }));
              return prisma.tvShow.create({
                data: {
                  tmdbId: data.id,
                  name: data.name ?? data.original_name ?? "Unknown",
                  overview: data.overview ?? "",
                  posterPath: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null,
                  backdropPath: data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : null,
                  firstAirDate: data.first_air_date ? new Date(data.first_air_date) : new Date(),
                  voteAverage: data.vote_average ?? 0,
                  voteCount: data.vote_count ?? 0,
                  popularity: data.popularity ?? 0,
                  originalLanguage: data.original_language ?? "",
                  originalName: data.original_name ?? "",
                  adult: false,
                  genres: genresCOC.length
                    ? { create: genresCOC.map((g: any) => ({ genre: { connectOrCreate: g } })) }
                    : undefined,
                },
              });
            },
          };

        default:
          throw new Error("Invalid media type");
      }
    })();

    // try find the media first
    let media = await (config as any).find();

    // if not found, create by fetching details and populating DB
    if (!media) {
      try {
        media = await (config as any).create();
      } catch (e: any) {
        // handle possible rate-limit or other fetch/create errors
        console.error("Create media error:", e);
        return NextResponse.json({ error: "Failed to create media: " + (e.message ?? e) }, { status: 500 });
      }
    }

    // toggle favourite
    const existingFavourite = await prisma.user.findFirst({
      where: {
        id: user.id,
        [config.relationField]: { some: { id: media.id } },
      },
    });

    if (existingFavourite) {
      await prisma.user.update({
        where: { id: user.id },
        data: { [config.relationField]: { disconnect: { id: media.id } } },
      });
      return NextResponse.json({ message: "Removed from favourites" });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: { [config.relationField]: { connect: { id: media.id } } },
      });
      return NextResponse.json({ message: "Added to favourites" });
    }
  } catch (error: any) {
    console.error("Favourite error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { type, mediaId } = await req.json();

  if (!type || !mediaId)
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  let updateQuery: any = {};

  switch (type) {
    case "movie":
      updateQuery = {
        favouriteMovies: { disconnect: { id: mediaId } },
      };
      break;
    case "tv":
      updateQuery = {
        favouriteTvShows: { disconnect: { id: mediaId } },
      };
      break;
    case "anime":
      updateQuery = {
        favouriteAnimes: { disconnect: { id: mediaId } },
      };
      break;
    default:
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: updateQuery,
  });

  return NextResponse.json({ message: "Removed from favourites" });
}