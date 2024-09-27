"use client"

import {useSession} from "next-auth/react";

export default function Home() {
    const {data: session} = useSession();

    return (
        <div>
            <h1 className="text-center display-1">BeerPonginator</h1>
            {session &&
                <>
                    <h2 className="text-center">Willkommen {session.user!.name}</h2>
                </>
            }
        </div>
    );
}