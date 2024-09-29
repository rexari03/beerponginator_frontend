"use client"

import Link from "next/link";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {getTournaments} from "@/handler/tournamentService";
import {Tournament} from "@/types/tournament";
import {Alert, Spinner} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {useRouter} from "next/navigation";

export default function Page() {
    const {data: session} = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const router = useRouter();

    const fetchTournaments = async () => {
        const t: Tournament[] = await getTournaments();
        setTournaments(t);
    }

    useEffect(() => {
        fetchTournaments();
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <Spinner animation="border"/>
            </div>
        );
    }

    if (!session) {
        return <Alert variant="danger">Unauthorized. Please <Link href="/auth/signin">sign in</Link>.</Alert>;
    }

    return (
        <div>
            {tournaments.length > 0 ? (
                    <>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Datum</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tournaments.map((tournament, index) => (
                                <tr key={index} onClick={() => router.push(`/game/${tournament.id}`)}>
                                    <td>{tournament.name}</td>
                                    <td>{tournament.date}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </>
                ) :
                <Alert variant="info">No tournaments found.</Alert>
            }
        </div>
    );
}