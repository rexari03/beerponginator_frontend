"use client"

import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Card from 'react-bootstrap/Card';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';

interface Props {
    id: string;
}

const RandomQRCode = (props: Props) => {
    const [qrValue, setQrValue] = useState<string>('');
    const baseUrl = "https://beerponginator-visualizer.vercel.app/";

    useEffect(() => {
        setQrValue(baseUrl + props.id);
    }, [props.id]);

    return (
        <Card bg="dark" text="white" className="text-center p-4 m-4 shadow">
            <Card.Body>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        {qrValue && <QRCodeSVG value={qrValue} className="mb-3" style={{ width: '200px', height: '200px' }} />}
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto" className="text-wrap">
                        <Card.Link className="h5" href={qrValue}>TurnierID: {qrValue}</Card.Link>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default RandomQRCode;