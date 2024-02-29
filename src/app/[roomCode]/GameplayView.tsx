import { Stack } from "@chakra-ui/react";
import { ReactNode } from "react";
import Hand from "./Hand";
import { Game } from "@/types/game";

export default function GameplayView({ game, children }: { game: Game, children: ReactNode }) {
    return (
        <Stack>
            {children}
            <Hand cards={game.players[0].hand} />
        </Stack>
    )
}