export const addTeam = async (
    shown_id: string,
    name: string,
    tournament_id: string,
    description: string,
) => {
    const headers = {
        'Authorization': `Bearer XongXina`,
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