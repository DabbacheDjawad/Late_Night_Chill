import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { watchProgress: true },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Sort by lastWatched descending
    const sorted = user.watchProgress.sort((a, b) => b.lastWatched.getTime() - a.lastWatched.getTime());

    return NextResponse.json({ watchProgress: sorted });
  } catch (error: any) {
    console.error("GET watchProgress error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


interface WatchProgressRequest {
  mediaType: "anime" | "movie" | "tv";
  mediaId: string;
  title?: string;
  image?: string;
  lastEpisode?: number;
  notes?: string;
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body: WatchProgressRequest = await req.json();
    console.log("POST /watchProgress body:", body);

    const { mediaType, mediaId, title, image, lastEpisode, notes } = body;

    if (!mediaType || !mediaId) {
      console.error("Missing mediaType or mediaId in request body");
      return NextResponse.json(
        { error: "Missing mediaType or mediaId" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      console.error("User not found for email:", session.user.email);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Ensure userId type matches WatchProgress schema
    const userId = typeof user.id === "number" ? user.id as string : user.id;

    // Upsert watch progress
    const progress = await prisma.watchProgress.upsert({
      where: {
        userId_mediaType_mediaId: {
          userId,
          mediaType,
          mediaId,
        },
      },
      update: {
        lastWatched: new Date(),
        lastEpisode,
        notes,
        title,
        image,
      },
      create: {
        userId,
        mediaType,
        mediaId,
        lastEpisode,
        notes,
        title,
        image,
      },
    });

    console.log("Watch progress upserted:", progress);
    return NextResponse.json({ message: "Progress updated", progress });
  } catch (error: any) {
    console.error("POST /watchProgress unexpected error:", error);
    return NextResponse.json(
      { error: error?.message || String(error) },
      { status: 500 }
    );
  }
}




interface DeleteRequest {
  mediaType: "anime" | "movie" | "tv";
  mediaId: string;
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { mediaType, mediaId }: DeleteRequest = await req.json();

    if (!mediaType || !mediaId) return NextResponse.json({ error: "Missing parameters" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    await prisma.watchProgress.delete({
      where: { userId_mediaType_mediaId: { userId: user.id, mediaType, mediaId } },
    });

    return NextResponse.json({ message: "Removed from keep watching" });
  } catch (error: any) {
    console.error("DELETE watchProgress error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}