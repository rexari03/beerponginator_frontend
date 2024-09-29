import {Division} from "@/types/division";

const getDivisionsByTournamentId = async (tournament_id: string) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };
    const response = await fetch(`https://beerpong.philipptrashman.dev/api/tournaments/${tournament_id}/divisions`, {
        method: 'GET',
        headers,
        mode: 'cors'
    });

    const data = await response.json();
    const result: Division[] = [];
    Object.entries(data).map(([key, value]) => {
        result.push(value as Division);
    });
    return result;
}