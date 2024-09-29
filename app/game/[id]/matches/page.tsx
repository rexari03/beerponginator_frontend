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
import {Match} from "@/types/match";

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
            filtered = filtered.filter(match =>
                match.team_1.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                match.team_2.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1>Match Page</h1>
            <Container>
                <Row className="mb-4">
                    <Col>
                        <Form>
                            <Form.Group controlId="divisionNumber">
                                <Form.Label>Filter by Division Number</Form.Label>
                                <Form.Select
                                    value={divisionNumber}
                                    onChange={(e) => setDivisionNumber(e.target.value)}
                                >
                                    <option value="">All Divisions</option>
                                    {divisionNumbers.map((number, index) => (
                                        <option key={index} value={number}>{number}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="searchQuery" className="mt-3">
                                <Form.Label>Search by Team Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter team name"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <div>
                            <Button variant="secondary" onClick={() => setSelectedMatchRound(null)}>
                                All Rounds
                            </Button>
                            {matchRounds.map((round, index) => (
                                <Button
                                    key={index}
                                    variant={selectedMatchRound === round ? "primary" : "secondary"}
                                    onClick={() => setSelectedMatchRound(round)}
                                    className="ms-2"
                                >
                                    Round {round}
                                </Button>
                            ))}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Division</th>
                                <th>Spielrunde</th>
                                <th>Team1</th>
                                <th>Team2</th>
                                <th>Punktestand</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredMatches.map((match, index) => (
                                <tr key={index} onClick={() => handleOpenEnterScoresModal(match)}>
                                    <td>{match.id}</td>
                                    <td>{match.division.number}</td>
                                    <td>{match.match_round.number}</td>
                                    <td>{match.team_1.name}</td>
                                    <td>{match.team_2.name}</td>
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
                    <Modal.Title>Enter Scores</Modal.Title>
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
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveScores}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default MatchPage;