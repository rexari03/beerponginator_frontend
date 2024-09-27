export const addNewTournament = async (
    name: string,
    description: string,
    date: string,
    sets: number,
    match_round_count: number,
    table_count: number
) => {
    const headers = {
        'Authorization': `Bearer XongXina`,
    };
    const body = JSON.stringify({
        "name": name,
        "description": description,
        "date": date,
        "sets": sets,
        "match_round_count": match_round_count,
        "table_count": table_count
    });

    const response = await fetch('https://beerpong.philipptrashman.dev/api/tournaments', {
        method: 'POST',
        headers,
        mode: 'cors',
        body
    });
    return response;
}

export const getTournament = async (
    id: string
) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };
    const response = await fetch(`https://beerpong.philipptrashman.dev/api/tournaments/${id}`, {
        method: 'GET',
        headers,
        mode: 'cors'
    });
    return response;
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