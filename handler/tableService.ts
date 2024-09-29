import {Team} from "@/types/teams";
import {Table} from "@/types/table";

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

    result.sort((a, b) => {
        if (b.wins === a.wins) {
            if (b.point_difference === a.point_difference) {
                return b.points_received - a.points_received;
            }
            return b.point_difference - a.point_difference;
        }
        return b.wins - a.wins;
    });

    return result;
}

export const getTables = async (tournament_id: string) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };
    const response = await fetch(`https://beerpong.philipptrashman.dev/api/tournaments/${tournament_id}/teams`, {
        method: 'GET',
        headers,
        mode: 'cors'
    });

    const data = await response.json();
    const result: Table[] = [];
    Object.entries(data).map(([key, value]) => {
        result.push(value as Table);
    });
    return result;
}