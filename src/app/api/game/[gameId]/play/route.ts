import { gameService } from "@/lib/service/gameService";
import { PlayAction } from "@/types/actions/play";
import { NextRequest, NextResponse } from "next/server";

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID ?? '',
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY ?? '',
  secret: process.env.PUSHER_APP_SECRET ?? '',
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER ?? '',
  useTLS: true
});

export async function POST(request: NextRequest) {
    try {
        const { gameId, action }: { gameId: string, action: PlayAction } = await request.json();
        const newGameState = gameService(gameId).play(action);
        pusher.trigger("gameState", "gameStateChange", newGameState);
        return NextResponse.json(newGameState, { status: 200 })
    } catch (e) {
        console.log(e);
        return NextResponse.error()
    }
}