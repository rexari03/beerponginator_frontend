import {Team} from "@/types/teams";

export type Match = {
    id: string;
    division: {
        id: string;
        number: number;
    }
    team_1: Team;
    team_2: Team;
}