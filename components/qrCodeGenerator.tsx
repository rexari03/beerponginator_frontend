"use client"

import React, {useState} from 'react';
import {QRCodeSVG} from 'qrcode.react';
import {v4 as uuidv4} from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

const RandomQRCode = () => {
    const [qrValue, setQrValue] = useState<string>('');
    const baseUrl = "https://example.com/game/";

    const generateRandomQRCode = () => {
        const randomId = uuidv4();
        const qrCodeUrl = `${baseUrl}${randomId}`;
        console.log(qrCodeUrl);
        setQrValue(qrCodeUrl);
    };

    const handleNewGameClick = () => {
        if (window.confirm("Möchtest du wirklich ein neues Turnier starten?")) {
            generateRandomQRCode();
        }
    };

    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center fixed-size bg-light p-4 rounded shadow">
            <button className="btn btn-primary mb-3" onClick={handleNewGameClick}>Neues Turnier</button>
            {qrValue && <QRCodeSVG value={qrValue} className="mb-3" style={{width: '200px', height: '200px'}}/>}
            <p className="h5 text-dark">TurnierID: {qrValue}</p>
        </div>
    );
};

export default RandomQRCode;