import {Tournament} from "@/types/tournament";
import {Player} from "@/types/player";

export type Team = {
    id: string,
    shown_id: string,
    name: string
    players: Player[],
    tournament: Tournament,
    wins: number,
}