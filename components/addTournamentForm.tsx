"use client"

import {useState} from "react";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {addNewTournament} from "@/handler/tournamentService";
import {useRouter} from "next/navigation";

const AddTournamentForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        date: "",
        sets: 0,
        match_round_count: 0,
        table_count: 0
    });

    const [showModal, setShowModal] = useState(false);
    const [tournamentId, setTournamentId] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await addNewTournament(formData.name, formData.description, formData.date, formData.sets, formData.match_round_count, formData.table_count);
        if (!response.ok) {
            console.error("Error while creating tournament");
            return;
        }
        const data = await response.json();
        setTournamentId(data.id);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        router.push(`/auth/signin`);

    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h2 className="text-center my-4">Turnier erstellen</h2>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="name" className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange}
                                                  required/>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="description" className="mb-3">
                                    <Form.Label>Beschreibung</Form.Label>
                                    <Form.Control type="text" name="description" value={formData.description}
                                                  onChange={handleChange}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="date" className="mb-3">
                                    <Form.Label>Datum</Form.Label>
                                    <Form.Control type="date" name="date" value={formData.date} onChange={handleChange}
                                                  required/>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="sets" className="mb-3">
                                    <Form.Label>Sätze</Form.Label>
                                    <Form.Control type="number" name="sets" value={formData.sets}
                                                  onChange={handleChange} required/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="match_round_count" className="mb-3">
                                    <Form.Label>Spielrunden</Form.Label>
                                    <Form.Control type="number" name="match_round_count"
                                                  value={formData.match_round_count} onChange={handleChange} required/>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="table_count" className="mb-3">
                                    <Form.Label>Anzahl Tische</Form.Label>
                                    <Form.Control type="number" name="table_count" value={formData.table_count}
                                                  onChange={handleChange} required/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit" className="w-100">Abschicken</Button>
                    </Form>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Turnier erstellt</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Turnier wurde erfolgreich erstellt. Turnier-ID: {tournamentId}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Schließen
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AddTournamentForm;