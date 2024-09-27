import {Team} from "@/types/teams";

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
}