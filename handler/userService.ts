export const loginUser = async (
    userName: string,
    password: string
) => {
    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    };
    const body = JSON.stringify({
        "username": userName,
        "password": password
    });
    const response = await fetch('https://beerpong.philipptrashman.dev/api/login', {
        method: 'POST',
        headers,
        mode: 'cors',
        body
    });
    return response;
}
export const mockLoginUser = async () => {
    return {
        ok: true,
        status: 200,
        json: async () => ({message: "Success"})
    };
};
