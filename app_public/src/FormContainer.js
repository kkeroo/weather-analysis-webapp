import './FormContainer.css';
import FormOne from './FormOne';
import FormTwo from './FormTwo';
import FromThree from './FormThree';
import Container from 'react-bootstrap/Container';

const FormContainer = () => {
    return (
        <div className="FormContainer">
            <Container fluid className="summary-block">
                <FormOne></FormOne>
                <FormTwo></FormTwo>
                <FromThree></FromThree>
            </Container>
        </div>
    );
}

export default FormContainer;