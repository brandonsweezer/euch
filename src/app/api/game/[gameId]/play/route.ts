import { gameService } from "@/lib/service/gameService";
import { notificationService } from "@/lib/service/notificationService";
import { PlayAction } from "@/types/actions/play";
import { NotificationType } from "@/types/notification";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params:  { gameId: string } }) {
    try {
        const action: PlayAction = await request.json();
        const newGameState = await gameService(params.gameId).play(action);
        notificationService(params.gameId).send(NotificationType.GameStateChange, newGameState);
        return NextResponse.json(newGameState, { status: 200 })
    } catch (e) {
        console.log(e);
        return NextResponse.error()
    }
}