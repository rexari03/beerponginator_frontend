"use client"

import {useEffect, useRef, useState} from "react";
import {Button, Container, Form, Overlay, Spinner, Tooltip} from "react-bootstrap";
import {Team} from "@/types/teams";
import {getTeamsByTournament} from "@/handler/teamService";
import {useParams, useRouter} from "next/navigation";
import {Table} from "@/types/table";
import {getTournament} from "@/handler/tournamentService";
import {Division} from "@/types/division";
import {MatchRound} from "@/types/matchRound";
import {addMatch} from "@/handler/matchService";

const MatchPage = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [tables, setTables] = useState<Table[]>([]);
    const [divisions, setDivisions] = useState<Division[]>([]);
    const [matchRounds, setMatchRounds] = useState<MatchRound[]>([]);
    const [team1ShownId, setTeam1ShownId] = useState("");
    const [team2ShownId, setTeam2ShownId] = useState("");
    const [table, setTable] = useState("");
    const [division, setDivision] = useState("");
    const [matchRound, setMatchRound] = useState("");
    const [showTooltip1, setShowTooltip1] = useState(false);
    const [showTooltip2, setShowTooltip2] = useState(false);
    const [teamName1, setTeamName1] = useState("");
    const [teamName2, setTeamName2] = useState("");
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const target1 = useRef(null);
    const target2 = useRef(null);
    const router = useRouter();

    const fetchTeams = async () => {
        const response = await getTeamsByTournament(params.id as string);
        setTeams(response);
    }

    const fetchTournament = async () => {
        const response = await getTournament(params.id as string);
        setTables(response.tables);
        setDivisions(response.divisions);
        setMatchRounds(response.match_rounds);
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchTeams();
            await fetchTournament();
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleShownIdChange = (e, setShownId, setTeamName, setShowTooltip) => {
        const value = e.target.value;
        setShownId(value);
        const regex = new RegExp(`^${value}$`, 'i');
        const team = teams.find(team => regex.test(team.shown_id));
        if (team) {
            setTeamName(team.name);
            setShowTooltip(true);
        } else {
            setShowTooltip(false);
        }
    };

    const isFormValid = () => {
        return team1ShownId && team2ShownId && table && division && matchRound;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const regex1 = new RegExp(`^${team1ShownId}$`, 'i');
        const team1UUID = teams.find(team => regex1.test(team.shown_id))!.id;

        const regex2 = new RegExp(`^${team2ShownId}$`, 'i');
        const team2UUID = teams.find(team => regex2.test(team.shown_id))!.id;
        const response = await addMatch(params.id as string, table, team1UUID, team2UUID, division, matchRound);

        if (response) {
            console.log("Match added successfully");
            router.push(`/game/${params.id as string}/matches`);
        } else {
            console.error("Failed to add match");
        }
    };

    return (
        <Container>
            <h1 className="text-center mb-4">Spiel hinzufügen</h1>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="team1ShownId" className="mb-3">
                        <Form.Label>Team 1 Shown ID</Form.Label>
                        <Form.Control
                            type="text"
                            value={team1ShownId}
                            onChange={(e) => handleShownIdChange(e, setTeam1ShownId, setTeamName1, setShowTooltip1)}
                            ref={target1}
                        />
                        <Overlay target={target1.current} show={showTooltip1} placement="bottom"
                                 container={document.body}>
                            {(props) => (
                                <Tooltip id="overlay-example1" {...props}>
                                    {teamName1}
                                </Tooltip>
                            )}
                        </Overlay>
                    </Form.Group>
                    <Form.Group controlId="team2ShownId" className="mb-3">
                        <Form.Label>Team 2 Shown ID</Form.Label>
                        <Form.Control
                            type="text"
                            value={team2ShownId}
                            onChange={(e) => handleShownIdChange(e, setTeam2ShownId, setTeamName2, setShowTooltip2)}
                            ref={target2}
                        />
                        <Overlay target={target2.current} show={showTooltip2} placement="bottom"
                                 container={document.body}>
                            {(props) => (
                                <Tooltip id="overlay-example2" {...props}>
                                    {teamName2}
                                </Tooltip>
                            )}
                        </Overlay>
                    </Form.Group>
                    <Form.Group controlId="table" className="mb-3">
                        <Form.Label>Tisch</Form.Label>
                        <Form.Select
                            value={table}
                            onChange={(e) => setTable(e.target.value)}
                        >
                            <option value="">Tisch auswählen</option>
                            {tables.map((table) => (
                                <option key={table.id} value={table.id}>
                                    {table.shown_id}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="division" className="mb-3">
                        <Form.Label>Spielrunde</Form.Label>
                        <Form.Select
                            value={division}
                            onChange={(e) => setDivision(e.target.value)}
                        >
                            <option value="">Spielrunde auswählen</option>
                            {divisions.map((division) => (
                                <option key={division.id} value={division.id}>
                                    {division.number}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="matchRound" className="mb-3">
                        <Form.Label>Spieltag</Form.Label>
                        <Form.Select
                            value={matchRound}
                            onChange={(e) => setMatchRound(e.target.value)}
                        >
                            <option value="">Spieltag auswählen</option>
                            {matchRounds.map((round) => (
                                <option key={round.id} value={round.id}>
                                    {round.number}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={!isFormValid()}>
                        Speichern
                    </Button>
                </Form>
            )}
        </Container>
    );
}

export default MatchPage;