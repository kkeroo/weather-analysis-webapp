import './Header.css'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const Header = () => {
    return (
        <div className="Navbar">
            <Navbar className="navbar" expand="lg">
            <Container>
                <Navbar.Brand className="brand" href="#">Corteva</Navbar.Brand>
            </Container>
            </Navbar>
        </div>
    );
}

export default Header;