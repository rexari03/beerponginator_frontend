import {Team} from "@/types/teams";
import {Table} from "@/types/table";

export type Match = {
    id: string;
    division: {
        id: string;
        number: number;
    }
    team_1: Team;
    team_2: Team;
    team_1_points: number;
    team_2_points: number;
    match_round: MatchRound;
    table: Table;
}

type MatchRound = {
    id: string;
    number: number;
}