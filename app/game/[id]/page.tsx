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
import {addTeam} from "@/handler/teamService";

const TeamTable = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
    const [visibleId, setVisibleId] = useState('');
    const [teamName, setTeamName] = useState('');
    const [description, setDescription] = useState('');
    const params = useParams();

    const fetchTable = async () => {
        const teamsTable: Team[] = await getTeams(params.id as string);
        setTeams(teamsTable);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchTable();

        const intervalId = setInterval(fetchTable, 30000);

        return () => clearInterval(intervalId);
    }, [params.id]);

    const handleAddPlayer = () => {
        setShowAddPlayerModal(true);
    };

    const handleCloseAddPlayerModal = async () => {
        const response = await addTeam(visibleId, teamName, params.id as string, description);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setShowAddPlayerModal(false);
            fetchTable();
        }
    }

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
            <Modal show={showAddPlayerModal} onHide={() => setShowAddPlayerModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Player</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formPlayerName">
                            <Form.Label>Sichtbare ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Gebe sichtbare ID ein"
                                value={visibleId}
                                onChange={(e) => setVisibleId(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPlayerTeam" className="mt-3">
                            <Form.Label>Teamname</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Teamnamen eingeben"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPlayerDescription" className="mt-3">
                            <Form.Label>Beschreibung</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Beschreibung eingeben"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddPlayerModal(false)}>
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