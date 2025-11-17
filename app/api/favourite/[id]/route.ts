
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request , {params} : { params : Promise<{id : string}>}) {
    const {id} = await params;

    const { searchParams } = new URL(req.url);
    const mediaType = searchParams.get("mediaType");
    
  try {
    const session = await auth();
    if (!session?.user?.email)
      return NextResponse.json({ isFavourite: false, error: "Unauthorized" }, { status: 401 });       

    if (!mediaType || !id)
      return NextResponse.json({ isFavourite: false, error: "Missing parameters" }, { status: 400 });

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        favouriteAnimes: true,
        favouriteMovies: true,
        favouriteTvShows: true,
      },
    });

    if (!user)
      return NextResponse.json({ isFavourite: false, error: "User not found" }, { status: 404 });

    let isFavourite = false;

    switch (mediaType) {
      case "anime":
        isFavourite = user.favouriteAnimes.some((a) => a.malId === Number(id));
        break;
      case "movie":
        isFavourite = user.favouriteMovies.some((m) => m.tmdbId === Number(id));
        break;
      case "tv":
        isFavourite = user.favouriteTvShows.some((t) => t.tmdbId === Number(id));
        break;
    }

    return NextResponse.json({ isFavourite });
  } catch (error: any) {
    console.error("❌ Check Favourite error:", error);
    return NextResponse.json({ isFavourite: false, error: error.message }, { status: 500 });
  }
}
