import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';

const FormOne = () => {
    return (
        <div className='form'>
            <Container>
                <Row className='heading'>
                    <h1>Določite ime generirane datoteke in izberite željene datume.</h1>
                </Row>
                <Row>
                    <Col sm='4'></Col>
                    <Col sm='4'>
                        <Container>
                            <Form className='file-input'>
                                <Form.Group controlId="formFile" className="mb-2">
                                    <Form.Label className="text-light">Ime datoteke</Form.Label>
                                    <Form.Control type="text" placeholder='Vnesite ime  datoteke' />
                                </Form.Group>
                            </Form>
                        </Container>
                    </Col>
                    <Col sm='4'></Col>
                </Row>
                <Row>
                    <Col sm='4'></Col>
                    <Col sm='4'>
                        <Container className="mt-3">
                            <Form.Label className="text-light">Obdobje</Form.Label>
                            <DateRangePicker
                                initialSettings={{ startDate: '01/01/2020', endDate: '01/15/2020' }}
                                >
                                <input type="text" className="form-control" />
                            </DateRangePicker>
                        </Container>
                    </Col>
                    <Col sm='4'></Col>
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