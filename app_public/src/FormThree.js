import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

const FormOne = () => {
    return (
        <div className='form'>
            <Container>
                <Row className='heading'>
                    <h1>Napredne nastavitve</h1>
                </Row>
                <Row>
                    <Col sm='3' lg='4'></Col>
                    <Col sm='6' lg='4'>
                        <Container>
                            <Form className='mt-2'>
                                <Form.Group>
                                    <h3 className='form-text text-light fs-6 mt-3'>Izhodiščna temperatura</h3>
                                    <Form.Check className="ms-4 text-light" inline label="5°C" name="base_temperature" type="radio"></Form.Check>
                                    <Form.Check className='text-light' inline label="8°C" name="base_temperature" type="radio"></Form.Check>
                                    <Form.Check className='text-light' inline label="10°C" name="base_temperature" type="radio"></Form.Check>
                                </Form.Group>
                                <Container className='mt-3 d-flex flex-column align-items-center'>
                                    <Form.Group>
                                            <Form.Check className="text-light text-start mt-1" label="Graf temperatur" name="temperature_graph" type="switch"></Form.Check>
                                            <Form.Check className="text-light text-start mt-1" label="Graf padavin" name="rain_graph" type="switch"></Form.Check>
                                            <Form.Check className="text-light text-start mt-1" label="Mesečni podatki" name="monthly_data" type="switch"></Form.Check>
                                            <Form.Check className="text-light text-start mt-1" label="Dnevni podatki" name="daily_data" type="switch"></Form.Check>
                                    </Form.Group>
                                </Container>
                            </Form>
                        </Container>
                    </Col>
                    <Col sm='3' lg='4'></Col>
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