import {Match} from "@/types/match";

export const getAllMatches = async (id: string) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };
    const response = await fetch(`https://beerpong.philipptrashman.dev/api/tournaments/${id}/matches`, {
        method: 'GET',
        headers,
        mode: 'cors'
    });
    const data = await response.json();
    const result: Match[] = [];
    Object.entries(data).map(([key, value]) => {
        result.push(value as Match);
    });
    return result;
}

export const addMatchScore = async (
    match_id: string,
    team1_score: number,
    team2_score: number,
    time_play: boolean,
) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };

    const body = JSON.stringify({
        "match_id": match_id,
        "team_1_points": team1_score,
        "team_2_points": team2_score,
        "timeplay": time_play
    });

    const response = await fetch(`https://beerpong.philipptrashman.dev/api/matches/${match_id}`, {
        method: 'PUT',
        headers,
        mode: 'cors',
        body
    });
    return response;
}

export const addMatch = async (
    tournament_id: string,
    table_id: string,
    team_1_id: string,
    team_2_id: string,
    division_id: string,
    match_round_id: string
) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };

    const body = JSON.stringify({
        "tournament_id": tournament_id,
        "table_id": table_id,
        "team_1_id": team_1_id,
        "team_2_id": team_2_id,
        "division_id": division_id,
        "match_round_id": match_round_id,
    });

    const response = await fetch('https://beerpong.philipptrashman.dev/api/matches', {
        method: 'POST',
        headers,
        mode: 'cors',
        body
    });
    if (response.ok) {
        return await response.json();
    }
    throw new Error(response.statusText);
}