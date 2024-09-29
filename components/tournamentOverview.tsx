import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

interface TournamentOverviewProps {
    name: string;
    date: string;
    matchRoundCount: number;
    tableCount: number;
    divisionCount: number;
}

const TournamentOverview: React.FC<TournamentOverviewProps> = ({
                                                                   name,
                                                                   date,
                                                                   matchRoundCount,
                                                                   tableCount,
                                                                   divisionCount
                                                               }) => {
    return (
        <Card className="mb-4">
            <Card.Header as="h5">Turnierübersicht</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item><strong>Name:</strong> {name}</ListGroup.Item>
                <ListGroup.Item><strong>Datum:</strong> {date}</ListGroup.Item>
                <ListGroup.Item><strong>Spieltag:</strong> {matchRoundCount}</ListGroup.Item>
                <ListGroup.Item><strong>Anzahl Tische:</strong> {tableCount}</ListGroup.Item>
                <ListGroup.Item><strong>Spielrunde:</strong> {divisionCount}</ListGroup.Item>
            </ListGroup>
        </Card>
    );
}

export default TournamentOverview;