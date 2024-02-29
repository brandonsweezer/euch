import { NewGameRequest } from "@/lib/db/game";
import { gameService } from "@/lib/service/gameService";
import { notificationService } from "@/lib/service/notificationService";
import { NotificationType } from "@/types/notification";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const newGameRequest: NewGameRequest = await request.json();

        const newGame = await gameService('').newGame(newGameRequest);
        notificationService(newGame._id).send(NotificationType.GameStateChange, newGame);
        return NextResponse.json(newGame, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.error();
    }
}