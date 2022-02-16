import './FormContainer.css';
import FormOne from './FormOne';
import FormTwo from './FormTwo'
import Container from 'react-bootstrap/Container';

const FormContainer = () => {
    return (
        <div className="FormContainer">
            <Container fluid className="summary-block">
                <FormOne></FormOne>
                <FormTwo></FormTwo>
            </Container>
        </div>
    );
}

export default FormContainer;