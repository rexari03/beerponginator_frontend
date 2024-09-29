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
import {getTournament, updateTournament} from "@/handler/tournamentService";
import TournamentOverview from "@/components/tournamentOverview";

const TeamTable = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
    const [showEditTournamentModal, setShowEditTournamentModal] = useState(false);
    const [visibleId, setVisibleId] = useState('');
    const [teamName, setTeamName] = useState('');
    const [description, setDescription] = useState('');
    const [tournamentName, setTournamentName] = useState('');
    const [tournamentDate, setTournamentDate] = useState('');
    const [matchRoundCount, setMatchRoundCount] = useState(0);
    const [tableCount, setTableCount] = useState(0);
    const [divisionCount, setDivisionCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const params = useParams();

    const fetchTable = async () => {
        const teamsTable: Team[] = await getTeams(params.id as string);
        const teamsWithIndex = teamsTable.map((team, index) => ({...team, originalIndex: index + 1}));
        setTeams(teamsWithIndex);
    };

    const getTournamentDetails = async () => {
        const tournamentDetails = await getTournament(params.id as string);
        setTournamentName(tournamentDetails.name);
        setTournamentDate(tournamentDetails.date);
        setMatchRoundCount(tournamentDetails.match_round_count ?? 0);
        setTableCount(tournamentDetails.table_count ?? 0);
        setDivisionCount(tournamentDetails.division_count ?? 0);
    }

    useEffect(() => {
        fetchTable();
        getTournamentDetails();

        const intervalId = setInterval(fetchTable, 30000);
        setIsLoading(false);
        return () => clearInterval(intervalId);
    }, [params.id]);

    const handleAddPlayer = () => {
        setShowAddPlayerModal(true);
    };

    const handleEditTournament = () => {
        setShowEditTournamentModal(true);
    };

    const handleCloseAddPlayerModal = async () => {
        const response = await addTeam(visibleId, teamName, params.id as string, description);
        if (response.ok) {
            setShowAddPlayerModal(false);
            fetchTable();
        }
    }

    const handleCloseEditTournamentModal = async () => {
        await updateTournament(params.id as string, tournamentName, tournamentDate, matchRoundCount, tableCount);

        setShowEditTournamentModal(false);
        getTournamentDetails();
    }

    const filteredTeams = teams.filter(team => {
        const regex = new RegExp(`^${searchQuery}$`, 'i');
        return team.name.toLowerCase().includes(searchQuery.toLowerCase()) || regex.test(String(team.shown_id));
    });

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
                    <Button variant="primary" onClick={handleAddPlayer} className="me-2">Team hinzufügen</Button>
                    <Button variant="primary" onClick={handleEditTournament} className="me-2">Bearbeiten</Button>
                    <Link href={`/game/${params.id}/matches`} passHref>
                        <Button variant="primary" className="me-2">Matches</Button>
                    </Link>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <TournamentOverview
                        name={tournamentName}
                        date={tournamentDate}
                        matchRoundCount={matchRoundCount}
                        tableCount={tableCount}
                        divisionCount={divisionCount}
                    />
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="Nach Teamnamen oder ID suchen"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>Platzierung</th>
                            <th>TeamID</th>
                            <th>Name</th>
                            <th>Differenz</th>
                            <th>Cups getroffen</th>
                            <th>Punkte</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredTeams.map((team) => (
                            <tr key={team.id}>
                                <td>{team.originalIndex}</td>
                                <td>{team.shown_id}</td>
                                <td>{team.name}</td>
                                <td>{team.point_difference}</td>
                                <td>{`${team.points_made} : ${team.points_received}`}</td>
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

            {/* Edit Tournament Modal */}
            <Modal show={showEditTournamentModal} onHide={() => setShowEditTournamentModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Tournament</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTournamentName">
                            <Form.Label>Turniername</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter tournament name"
                                value={tournamentName}
                                onChange={(e) => setTournamentName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTournamentDate" className="mt-3">
                            <Form.Label>Datum</Form.Label>
                            <Form.Control
                                type="date"
                                value={tournamentDate}
                                onChange={(e) => setTournamentDate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTournamentMatchRoundCount" className="mt-3">
                            <Form.Label>Spielrunden</Form.Label>
                            <Form.Control
                                type="number"
                                value={matchRoundCount}
                                onChange={(e) => setMatchRoundCount(Number(e.target.value))}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTournamentTableCount" className="mt-3">
                            <Form.Label>Anzahl Tische</Form.Label>
                            <Form.Control
                                type="number"
                                value={tableCount}
                                onChange={(e) => setTableCount(Number(e.target.value))}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditTournamentModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseEditTournamentModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default TeamTable;