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