import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './FormOne.css';

const FormOne = () => {
    return (
        <div className='form'>
            <Container>
                <Row className='heading'>
                    <h1>Najprej naložite datoteko.</h1>
                </Row>
                <Row>
                    <Col></Col>
                    <Col>
                        <Form className='file-input'>
                            <Form.Group controlId="formFile" className="mb-2">
                                <Form.Control type="file" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Container>
                        <Button className='next-button' variant='primary'>Naprej</Button>
                    </Container>

                </Row>
            </Container>
        </div>
    );
}

export default FormOne;