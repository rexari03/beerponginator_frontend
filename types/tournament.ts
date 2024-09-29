import {Table} from "@/types/table";
import {Match} from "@/types/match";
import {Team} from "@/types/teams";
import {MatchRound} from "@/types/matchRound";
import {Division} from "@/types/division";

export type Tournament = {
    id: string,
    name: string,
    date: string,
    match_round_count: number,
    match_rounds: MatchRound[],
    description: string,
    table_count: number,
    divisions_count: number,
    divisions: Division[],
    matches: Match[],
    tables: Table[],
    teams: Team[]
}