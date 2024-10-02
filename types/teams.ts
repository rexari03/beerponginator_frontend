import {Tournament} from "@/types/tournament";
import {Player} from "@/types/player";
import {Match} from "@/types/match";

export type Team = {
    id: string,
    shown_id: string,
    name: string,
    description: string,
    players: Player[],
    tournament: Tournament,
    matches: Match[],
    wins: number,
    point_difference: number,
    points_made: number,
    points_received: number,
    originalIndex: undefined | number
}