import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './FormComponent.css';
import { useState } from 'react';
import { useEffect } from 'react';

const FormComponent = (props) => {

    const [file, setFile] = useState('');

    useEffect(() => {

    });

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleReset = () => {
        setFile('');
    };

    return(
        <Container>
            <Row className='form-row'>
                <Col sm='12' md='1' lg='3' xl='4'></Col>
                <Col sm='12' md='10' lg='6' xl='4' className='form-col'>
                    <Form>
                        <Form.Group className="mb-3">
                            <input id='upload-hidden' type='file' accept='.csv' hidden onChange={(e) => {handleFileChange(e)}}/>
                            <Button name='upload-btn' className='upload-btn' onClick={(e) => {document.getElementById('upload-hidden').click();}}>
                                {/* Upload weather data */}
                                {/* <div>
                                    <div class="spinner-border" role="status">
                                        <span class="sr-only"></span>
                                    </div>
                                    Uploading...
                                </div> */}
                                <div>
                                    <i class="bi bi-check-lg"></i> Uploaded
                                </div>
                            </Button>
                            <Button name='upload-btn' className='delete-btn btn-danger' onClick={() => {handleReset()}}>
                                <i class="bi bi-trash"></i>
                            </Button>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="text-light">Select base temperature for GDD</Form.Label>
                            <Form.Group className="text-center">
                                <Form.Check disabled={ file === '' } name="base_temperature" inline type="radio" label="5°C" className='text-light'></Form.Check>
                                <Form.Check disabled={ file === '' } name="base_temperature" inline type="radio" label="8°C" className='text-light ms-4'></Form.Check>
                                <Form.Check disabled={ file === '' } name="base_temperature" inline type="radio" label="10°C" className='text-light ms-4'></Form.Check>
                            </Form.Group>
                        </Form.Group>

                        <Form.Group>
                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label className="text-light">Select starting date</Form.Label>
                                    <Form.Control disabled={ file === '' } inline type="date" min="2020-06-01"></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label className="text-light">Select ending date</Form.Label>
                                    <Form.Control disabled={ file === '' } inline type="date" min="2020-06-01"></Form.Control>
                                </Form.Group>
                            </Row>
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Button disabled={ file === '' }>Generate file</Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col sm='12' md='1' lg='3' xl='4'></Col>
            </Row>
        </Container>
    )
};

export default FormComponent;