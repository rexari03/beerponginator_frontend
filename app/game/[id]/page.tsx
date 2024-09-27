"use client"

import {useEffect, useState} from "react";
import {Team} from "@/types/teams";
import {getTeams} from "@/handler/tableService";
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useParams} from "next/navigation";
import QrCodeGenerator from "@/components/qrCodeGenerator";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';

const TeamTable = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
    const params = useParams();

    useEffect(() => {
        const fetchTable = async () => {
            const teamsTable: Team[] = await getTeams(params.id as string);
            setTeams(teamsTable);
            setIsLoading(false);
        };
        fetchTable();

        const intervalId = setInterval(fetchTable, 30000);

        return () => clearInterval(intervalId);
    }, [params.id]);

    const handleAddPlayer = () => {
        setShowAddPlayerModal(true);
    };

    const handleCloseAddPlayerModal = () => setShowAddPlayerModal(false);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
                <div style={{width: '3rem', height: '3rem'}}>
                    <Spinner animation="border" role="status" style={{width: '100%', height: '100%'}}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </div>
        );
    }

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <h1 className="text-center display-4">Dashboard</h1>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col className="d-flex justify-content-center">
                    <QrCodeGenerator id={params.id as string}/>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col className="d-flex justify-content-center">
                    <Button variant="primary" onClick={handleAddPlayer} className="me-2">Add Player</Button>
                    <Link href={`/game/${params.id}/matches`} passHref>
                        <Button variant="secondary">Enter Scores</Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Platzierung</th>
                            <th>TeamID</th>
                            <th>Name</th>
                            <th>Siege</th>
                        </tr>
                        </thead>
                        <tbody>
                        {teams.map((team, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{team.id}</td>
                                <td>{team.name}</td>
                                <td>{team.wins}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            {/* Add Player Modal */}
            <Modal show={showAddPlayerModal} onHide={handleCloseAddPlayerModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Player</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formPlayerName">
                            <Form.Label>Player Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter player name"/>
                        </Form.Group>
                        <Form.Group controlId="formPlayerTeam" className="mt-3">
                            <Form.Label>Team</Form.Label>
                            <Form.Control type="text" placeholder="Enter team"/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddPlayerModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseAddPlayerModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default TeamTable;