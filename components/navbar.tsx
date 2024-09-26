'use client'

import 'bootstrap/dist/css/bootstrap.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {usePathname} from "next/navigation";

const NavBar = () => {
    const pathname = usePathname();
    const tournamentId = 'test';

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href={`/${tournamentId}`} className="display-4 fw-bold">Beerponginator
                    ({tournamentId})</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="mxe-auto">
                        <Nav.Link href={`/game/${tournamentId}/table`}
                                  className={pathname == `/game/${tournamentId}/table` ? "active" : ""}>Rangliste</Nav.Link>
                        <Nav.Link href="/enter-score" className={pathname == "/enter-score" ? "active" : ""}>Spielstand
                            eingeben</Nav.Link>
                        <Nav.Link href="/setup" className={pathname == "/setup" ? "active" : ""}>Setup</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar