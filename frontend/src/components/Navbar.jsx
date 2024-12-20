import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const Logout = () => {
        const handleLogout = () => {
            localStorage.clear();
            setUser(null);
            navigate('/login');
        };

        return (
            <button class="logout-btn" onClick={handleLogout}>
                Log Out
            </button>
        );
    }

    return (
        <Navbar bg="dark" className="justify-content-between" style={{ height: "3.75rem"}}>
            <Container>
            <h2>
                <Link to="/" className="link-light text-decoration-none">Chat</Link>
            </h2>
            <Nav>
                <Logout />
            </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;