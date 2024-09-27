'use client'

import 'bootstrap/dist/css/bootstrap.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {usePathname} from "next/navigation";
import {signIn, signOut, useSession} from "next-auth/react";

const NavBar = () => {
    const pathname = usePathname();
    const {data: session} = useSession();

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href={`/`} className="display-4 fw-bold">Beerponginator</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="mxe-auto">
                        {session && (
                            <>
                                <Nav.Link href={`/new-tournament`}
                                          className={pathname == `/new-tournament` ? "active" : ""}>Neues Turnier
                                    erstellen</Nav.Link>
                            </>
                        )}
                    </Nav>
                    <Nav>
                        {session ?
                            <>
                                <Nav.Link href={`/game/`}
                                          className={pathname == `/game/` ? "active" : ""}>Turnier
                                    Übersicht</Nav.Link>
                                <Nav.Link href={`/dashboard/${session.user!.name}/table`}
                                          className={pathname == `/game/${session.user!.name}/table` ? "active" : ""}>Rangliste</Nav.Link>
                                <Nav.Link onClick={() => signOut({callbackUrl: '/'})}>Abmelden</Nav.Link>
                            </>
                            :
                            <Nav.Link onClick={() => signIn()}>Anmelden</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar