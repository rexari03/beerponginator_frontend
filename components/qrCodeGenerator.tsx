"use client"

import React, {useEffect, useState} from 'react';
import {QRCodeSVG} from 'qrcode.react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
    id: string;
}

const RandomQRCode = (props: Props) => {
    const [qrValue, setQrValue] = useState<string>('');
    const baseUrl = "https://example.com/";

    useEffect(() => {
        setQrValue(baseUrl + props.id);
    }, []);

    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center fixed-size bg-light p-4 rounded shadow">
            {qrValue && <QRCodeSVG value={qrValue} className="mb-3" style={{width: '200px', height: '200px'}}/>}
            <p className="h5 text-dark">TurnierID: {qrValue}</p>
        </div>
    );
};

export default RandomQRCode;