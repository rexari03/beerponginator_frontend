import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {loginUser} from "@/handler/userService";
import {User} from "@/types/user";

const handler = NextAuth({
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: './../../../auth/signin',
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials) {
                const {username, password} = credentials as { username: string, password: string };
                const response = await loginUser(username, password);
                if (response.ok) {
                    const data: User = await response.json();
                    return {id: '1', name: data.username};
                }
                return null;
            }
        })
    ]
})

export {handler as GET, handler as POST}