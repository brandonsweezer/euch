import { gameService } from "@/lib/service/gameService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params:  { gameId: string } }) {
    try {
        const game = await gameService(params.gameId).getGame();
        return NextResponse.json(game, { status: 200 })
    } catch (e) {
        console.log(e);
        return NextResponse.error();
    }
}