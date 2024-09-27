import {Team} from "@/types/teams";

export const getTeams = async (id: string) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };
    const response = await fetch(`https://beerpong.philipptrashman.dev/api/tournaments/${id}/teams`, {
        method: 'GET',
        headers,
        mode: 'cors'
    });
    const result: Team[] = [];
    const data = await response.json();
    Object.entries(data).map(([key, value]) => {
        result.push(value as Team);
    });

    result.sort((a, b) => b.wins - a.wins);

    return result;
}