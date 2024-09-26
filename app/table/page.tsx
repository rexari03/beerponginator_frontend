"use client"

import {useEffect, useState} from "react";
import {Team} from "@/types/teams";
import {getTable} from "@/handler/table.handler";
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';

const TeamTable = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTeamOrder = async () => {
        const teams: Team[] = getTable();
        setTeams(teams);
    }

    useEffect(() => {
        fetchTeamOrder()
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div style={{ width: '3rem', height: '3rem' }}>
                    <Spinner animation="border" role="status" style={{ width: '100%', height: '100%' }}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className={"text-center display-4"}>Tabelle</h1>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Platzierung</th>
                        <th>TeamID</th>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teams.map((team, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{team.id}</td>
                            <td>{team.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
        </div>
    );
}

export default TeamTable;