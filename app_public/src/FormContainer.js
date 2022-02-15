import './FormContainer.css';
import FormOne from './FormOne';
import Container from 'react-bootstrap/Container';

const FormContainer = () => {
    return (
        <div className="FormContainer">
            <Container fluid className="summary-block">
                <FormOne></FormOne>
            </Container>
        </div>
    );
}

export default FormContainer;