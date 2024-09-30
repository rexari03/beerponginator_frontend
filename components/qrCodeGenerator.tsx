"use client"

import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Card from 'react-bootstrap/Card';
import 'bootswatch/dist/darkly/bootstrap.min.css';

interface Props {
    id: string;
}

const RandomQRCode = (props: Props) => {
    const [qrValue, setQrValue] = useState<string>('');
    const baseUrl = "https://beerponginator-visualizer.app/";

    useEffect(() => {
        setQrValue(baseUrl + props.id);
    }, [props.id]);

    return (
        <Card bg="dark" text="white" className="text-center p-4 m-4 shadow">
            <Card.Body>
                {qrValue && <QRCodeSVG value={qrValue} className="mb-3" style={{ width: '200px', height: '200px' }} />}
                <Card.Text className="h5">TurnierID: {qrValue}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default RandomQRCode;