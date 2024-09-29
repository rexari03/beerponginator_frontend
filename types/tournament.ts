import {Table} from "@/types/table";
import {Match} from "@/types/match";
import {Team} from "@/types/teams";

export type Tournament = {
    id: string,
    name: string,
    date: string,
    match_round_count: number,
    description: string,
    table_count: number,
    division_count: number,
    matches: Match[],
    tables: Table[],
    teams: Team[]
}