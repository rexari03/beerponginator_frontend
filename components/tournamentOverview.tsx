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
            <Card.Header as="h5">Tournament Overview</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item><strong>Name:</strong> {name}</ListGroup.Item>
                <ListGroup.Item><strong>Date:</strong> {date}</ListGroup.Item>
                <ListGroup.Item><strong>Match Rounds:</strong> {matchRoundCount}</ListGroup.Item>
                <ListGroup.Item><strong>Table Count:</strong> {tableCount}</ListGroup.Item>
                <ListGroup.Item><strong>Division Count:</strong> {divisionCount}</ListGroup.Item>
            </ListGroup>
        </Card>
    );
}

export default TournamentOverview;