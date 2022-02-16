import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { useState } from 'react';

const FormOne = ({ formData, setFormData }) => {
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
                                    <Form.Check className="ms-4 text-light" checked={formData.baseTemperature == 5} inline value="5" label="5°C" name="base_temperature" type="radio" onChange={(e) => setFormData({...formData, baseTemperature: e.target.value})}></Form.Check>
                                    <Form.Check className='text-light' checked={formData.baseTemperature == 8} inline value="8" label="8°C" name="base_temperature" type="radio" onChange={(e) => setFormData({...formData, baseTemperature: e.target.value})}></Form.Check>
                                    <Form.Check className='text-light' checked={formData.baseTemperature == 10} inline value="10" label="10°C" name="base_temperature" type="radio" onChange={(e) => setFormData({...formData, baseTemperature: e.target.value})}></Form.Check>
                                </Form.Group>
                                <Container className='mt-3 d-flex flex-column align-items-center'>
                                    <Form.Group>
                                            <Form.Check className="text-light text-start mt-1" label="Graf temperatur" name="temperature_graph" type="switch" checked={formData.temperatureGraph} onChange={(e) => setFormData({...formData, temperatureGraph: e.target.checked})}></Form.Check>
                                            <Form.Check className="text-light text-start mt-1" label="Graf padavin" name="rain_graph" type="switch" checked={formData.rainGraph} onChange={(e) => setFormData({...formData, rainGraph: e.target.checked})}></Form.Check>
                                            <Form.Check className="text-light text-start mt-1" label="Mesečni podatki" name="monthly_data" type="switch" checked={formData.monthlyData} onChange={(e) => setFormData({...formData, monthlyData: e.target.checked})}></Form.Check>
                                            <Form.Check className="text-light text-start mt-1" label="Dnevni podatki" name="daily_data" type="switch" checked={formData.dailyData} onChange={(e) => setFormData({...formData, dailyData: e.target.checked})}></Form.Check>
                                    </Form.Group>
                                </Container>
                            </Form>
                        </Container>
                    </Col>
                    <Col sm='3' lg='4'></Col>
                </Row>
            </Container>
        </div>
    );
}

export default FormOne;