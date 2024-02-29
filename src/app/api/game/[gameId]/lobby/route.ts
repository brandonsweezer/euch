import { gameService } from "@/lib/service/gameService";
import { notificationService } from "@/lib/service/notificationService";
import { AddPlayerAction } from "@/types/actions/addPlayer";
import { EditPlayerAction } from "@/types/actions/editPlayer";
import { StartGameAction } from "@/types/actions/startGame";
import { NotificationType } from "@/types/notification";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params:  { gameId: string } }) {
    try {
        const { type, action } = await request.json();
        let newGameState;
        switch (type) {
            case 'editPlayer':
                newGameState = await gameService(params.gameId).editPlayer(action as EditPlayerAction)
                break;
            case 'joinGame':
                newGameState = await gameService(params.gameId).addPlayer(action as AddPlayerAction)
                break;
            case 'startGame':
                newGameState = await gameService(params.gameId).startGame(action as StartGameAction)
                break;
        }

        notificationService(params.gameId).send(NotificationType.GameStateChange, newGameState);
        return NextResponse.json(newGameState, {status: 200})
    } catch(e) {
        console.error(e);
        return NextResponse.error()
    }
}