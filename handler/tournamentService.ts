import {Tournament} from "@/types/tournament";

export const addNewTournament = async (
    name: string,
    description: string,
    date: string,
    sets: number
) => {
    const headers = {
        'Authorization': `Bearer XongXina`,
    };
    const body = JSON.stringify({
        "name": name,
        "description": description,
        "date": date,
        "sets": sets
    });

    const response = await fetch('https://beerpong.philipptrashman.dev/api/tournaments', {
        method: 'POST',
        headers,
        mode: 'cors',
        body
    });
    return response;
}

export const getTournament = async (id: string) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };
    const response = await fetch(`https://beerpong.philipptrashman.dev/api/tournaments/${id}`, {
        method: 'GET',
        headers,
        mode: 'cors'
    });
    const data = await response.json();

    // Convert tables dictionary to an array
    if (data.tables) {
        data.tables = Object.values(data.tables);
    }

    return data as Tournament;
}

export const getTournaments = async () => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };
    const response = await fetch('https://beerpong.philipptrashman.dev/api/tournaments', {
        method: 'GET',
        headers,
        mode: 'cors'
    });
    if (response.ok) {
        return await response.json();
    }
    throw new Error(response.statusText);
}

export const updateTournament = async (
    id: string,
    name: string,
    date: string,
    matchRoundCount: number,
    tableCount: number,
    divisionCount: number
) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };
    const body = JSON.stringify({
        "name": name,
        "date": date,
        "match_round_count": matchRoundCount,
        "table_count": tableCount,
        "divisions_count": divisionCount
    });

    const response = await fetch(`https://beerpong.philipptrashman.dev/api/tournaments/${id}`, {
        method: 'PUT',
        headers,
        body,
        mode: 'cors'
    });
    if (response.ok) {
        return await response.json();
    }
    throw new Error(response.statusText);
}