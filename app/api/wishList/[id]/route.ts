
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
      return NextResponse.json({ isWishListed: false, error: "Unauthorized" }, { status: 401 });       

    if (!mediaType || !id)
      return NextResponse.json({ isWishListed: false, error: "Missing parameters" }, { status: 400 });

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        wishlistAnimes: true,
        wishlistMovies: true,
        wishlistTvShows: true,
      },
    });

    if (!user)
      return NextResponse.json({ isWishListed: false, error: "User not found" }, { status: 404 });

    let isWishListed = false;

    switch (mediaType) {
      case "anime":
        isWishListed = user.wishlistAnimes.some((a) => a.malId === Number(id));
        break;
      case "movie":
        isWishListed = user.wishlistMovies.some((m) => m.tmdbId === Number(id));
        break;
      case "tv":
        isWishListed = user.wishlistTvShows.some((t) => t.tmdbId === Number(id));
        break;
    }

    return NextResponse.json({ isWishListed });
  } catch (error: any) {
    console.error("❌ Check WishList error:", error);
    return NextResponse.json({ isWishListed: false, error: error.message }, { status: 500 });
  }
}
