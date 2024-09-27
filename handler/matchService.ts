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
        "team1_score": team1_score,
        "team2_score": team2_score,
        "time_play": time_play
    });

    const response = await fetch(`https://beerpong.philipptrashman.dev/api/matches/${match_id}`, {
        method: 'PUT',
        headers,
        mode: 'cors',
        body
    });
    return response;

}