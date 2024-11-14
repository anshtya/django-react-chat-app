import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Logout } from "../App";

const NavBar = () => {
    return (
        <Navbar bg="dark" className="nb-4" style={{ height:"3.75rem" }}>
            <Container>
                <h2>
                    Chat
                </h2>
                <Nav>
                    <Stack direction="horizontal" gap={3}>
                        <Logout/>
                    </Stack>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;