"use client"

import {useEffect, useState} from "react";
import {addMatchScore, getAllMatches} from "@/handler/matchService";
import {useParams} from "next/navigation";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Match} from "@/types/match";
import Link from "next/link";

const MatchPage = () => {
    const params = useParams();
    const [matches, setMatches] = useState<Match[]>([]);
    const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
    const [divisionNumber, setDivisionNumber] = useState<string>("");
    const [divisionNumbers, setDivisionNumbers] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedMatchRound, setSelectedMatchRound] = useState<number | null>(null);
    const [matchRounds, setMatchRounds] = useState<number[]>([]);
    const [showEnterScoresModal, setShowEnterScoresModal] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
    const [team1Score, setTeam1Score] = useState<number>(0);
    const [team2Score, setTeam2Score] = useState<number>(0);
    const [isOvertime, setIsOvertime] = useState<boolean>(false);

    const getMatches = async () => {
        const m = await getAllMatches(params.id as string);
        setMatches(m);
        setFilteredMatches(m);
        const divisions = Array.from(new Set(m.map(match => match.division.number.toString())));
        setDivisionNumbers(divisions);
        const rounds = Array.from(new Set(m.map(match => match.match_round.number)));
        setMatchRounds(rounds);
    }

    useEffect(() => {
        getMatches();
    }, []);

    useEffect(() => {
        let filtered = matches;

        if (divisionNumber) {
            filtered = filtered.filter(match => match.division.number.toString() === divisionNumber);
        }

        if (searchQuery) {
            const regex = new RegExp(`^${searchQuery}$`, 'i');
            filtered = filtered.filter(match =>
                match.team_1.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                match.team_2.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                regex.test(String(match.team_1.shown_id)) ||
                regex.test(String(match.team_2.shown_id))
            );
        }

        if (selectedMatchRound !== null) {
            filtered = filtered.filter(match => match.match_round.number === selectedMatchRound);
        }

        setFilteredMatches(filtered);
    }, [divisionNumber, searchQuery, selectedMatchRound, matches]);

    const handleOpenEnterScoresModal = (match: Match) => {
        setTeam1Score(match.team_1_points);
        setTeam2Score(match.team_2_points);
        setSelectedMatch(match);
        setShowEnterScoresModal(true);
    };

    const handleCloseEnterScoresModal = () => {
        setShowEnterScoresModal(false);
        setSelectedMatch(null);
    };

    const handleSaveScores = async () => {
        const result = await addMatchScore(selectedMatch!.id, team1Score, team2Score, isOvertime);
        if (result.ok) {
            handleCloseEnterScoresModal();
            getMatches();
        }
    };

    return (
        <div>
            <h1 className={"text-center mb-4"}>Match Page</h1>
            <Container>
                <Row className="mb-4">
                    <Col>
                        <Link href={`/game/${params.id}/add-match`} passHref>
                            <Button variant="success" className="w-100">Spiel hinzufügen</Button>
                        </Link>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <Card className="shadow">
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="divisionNumber" className="mb-3">
                                        <Form.Label>Nach Division filtern</Form.Label>
                                        <Form.Select
                                            value={divisionNumber}
                                            onChange={(e) => setDivisionNumber(e.target.value)}
                                        >
                                            <option value="">Alle Divisionen</option>
                                            {divisionNumbers.map((number, index) => (
                                                <option key={index} value={number}>{number}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId="searchQuery" className="mb-3">
                                        <Form.Label>Nach Teamnamen oder ID suchen</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter team name or shown ID"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <div className="d-flex flex-nowrap">
                            <Button variant="secondary" onClick={() => setSelectedMatchRound(null)}
                                    className="flex-grow-1">
                                Alle Runden
                            </Button>
                            {matchRounds.map((round, index) => (
                                <Button
                                    key={index}
                                    variant={selectedMatchRound === round ? "primary" : "secondary"}
                                    onClick={() => setSelectedMatchRound(round)}
                                    className="ms-2 flex-grow-1"
                                >
                                    Runde {round}
                                </Button>
                            ))}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover responsive>
                            <thead>
                            <tr>
                                <th>Division</th>
                                <th>Spielrunde</th>
                                <th>Tisch</th>
                                <th>Team1</th>
                                <th>Team2</th>
                                <th>Punktestand</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredMatches.map((match, index) => (
                                <tr key={index} onClick={() => handleOpenEnterScoresModal(match)}>
                                    <td>{match.division.number}</td>
                                    <td>{match.match_round.number}</td>
                                    <td>{match.table.shown_id}</td>
                                    <td>{match.team_1.name} ({match.team_1.shown_id})</td>
                                    <td>{match.team_2.name} ({match.team_2.shown_id})</td>
                                    <td>{match.team_1_points} - {match.team_2_points}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

            {/* Enter Scores Modal */}
            <Modal show={showEnterScoresModal} onHide={handleCloseEnterScoresModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Punkte eingeben</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedMatch && (
                        <Form>
                            <Form.Group controlId="team1Score">
                                <Form.Label>{selectedMatch.team_1.name} Score</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={team1Score}
                                    onChange={(e) => setTeam1Score(Number(e.target.value))}
                                />
                            </Form.Group>
                            <Form.Group controlId="team2Score" className="mt-3">
                                <Form.Label>{selectedMatch.team_2.name} Score</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={team2Score}
                                    onChange={(e) => setTeam2Score(Number(e.target.value))}
                                />
                            </Form.Group>
                            <Form.Group controlId="isOvertime" className="mt-3">
                                <Form.Check
                                    type="switch"
                                    label="Overtime"
                                    checked={isOvertime}
                                    onChange={(e) => setIsOvertime(e.target.checked)}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEnterScoresModal}>
                        Schließen
                    </Button>
                    <Button variant="primary" onClick={handleSaveScores}>
                        Speichern
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default MatchPage;