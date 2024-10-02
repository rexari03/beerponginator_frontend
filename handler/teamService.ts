import {Team} from "@/types/teams";

export const addTeam = async (
    shown_id: string,
    name: string,
    tournament_id: string,
    description: string,
) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };
    const body = JSON.stringify({
        "shown_id": shown_id,
        "name": name,
        "tournament_id": tournament_id,
        "description": description,
    });

    const response = await fetch(`https://beerpong.philipptrashman.dev/api/tournaments/${tournament_id}/teams`, {
        method: 'POST',
        headers,
        mode: 'cors',
        body
    });
    return response;
}

export const getTeamsByTournament = async (
    tournament_id: string
) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };
    const response = await fetch(`https://beerpong.philipptrashman.dev/api/tournaments/${tournament_id}/teams`, {
        method: 'GET',
        headers,
        mode: 'cors'
    });

    const data = await response.json();
    const result: Team[] = [];
    Object.entries(data).map(([key, value]) => {
        result.push(value as Team);
    });
    return result;
}

export const updateTeam = async (
    id: string,
    shown_id: string,
    name: string,
    description?: string
) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };
    const body = JSON.stringify({
        "shown_id": shown_id,
        "name": name,
        "description": description,
    });

    return await fetch(`https://beerpong.philipptrashman.dev/api/teams/${id}`, {
        method: 'PUT',
        headers,
        mode: 'cors',
        body
    });
}

export const deleteTeam = async (
    id: string
) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };
    return await fetch(`https://beerpong.philipptrashman.dev/api/teams/${id}`, {
        method: 'DELETE',
        headers,
        mode: 'cors'
    });
}