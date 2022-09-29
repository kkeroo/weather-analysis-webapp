import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import './FormComponent.css';

import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const FormComponent = (props) => {

    const [file, setFile] = useState('');
    // ['', uploading, uploaded]
    const [uploadStatus, setUploadStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [boundingDates, setBoundingDates] = useState({
        startingDate: '',
        endingDate: '',
        startingDateYMD: '',
        endingDateYMD: ''
    });

    const uploadFileOnServer = (file) => {
        setUploadStatus('uploading');
        let data = new FormData();
        data.append('file', file);

        axios({
            method: "POST",
            url: "http://localhost:8000/",
            data: data
        }).then((response => {
            setUploadStatus('uploaded');
            setErrorMessage('');
            setBoundingDates({
                startingDate: response.data.starting_date,
                endingDate: response.data.ending_date,
                startingDateYMD: response.data.starting_date_ymd,
                endingDateYMD: response.data.ending_date_ymd
            });
        })).catch(error => {
            console.log(error);
            setErrorMessage("Error in uploading file to server.");
        });
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        uploadFileOnServer(e.target.files[0]);
    };

    const handleReset = () => {
        setFile('');
        setUploadStatus('');
    };

    return(
        <Container>
            <Row className='form-row'>
                <Col sm='12' md='1' lg='3' xl='4'></Col>
                <Col sm='12' md='10' lg='6' xl='4' className='form-col'>
                    <Form>
                        <Form.Group className="mb-3">
                            <input id='upload-hidden' type='file' accept='.csv' hidden onChange={(e) => {handleFileChange(e)}}/>
                            <Button disabled={ file !== '' } name='upload-btn' className='upload-btn' onClick={(e) => {document.getElementById('upload-hidden').click();}}>
                                <div hidden={uploadStatus !== ''}>Upload weather data</div>
                                <div hidden={uploadStatus !== 'uploading'}>
                                    <div class="spinner-border" role="status">
                                        <span class="sr-only"></span>
                                    </div>
                                    Uploading...
                                </div>
                                <div hidden={uploadStatus !== 'uploaded'}>
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
                                    <Form.Control disabled={ file === '' } inline type="date" value={boundingDates.startingDateYMD}></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label className="text-light">Select ending date</Form.Label>
                                    <Form.Control disabled={ file === '' } inline type="date" value={boundingDates.endingDateYMD}></Form.Control>
                                </Form.Group>
                            </Row>
                            <div className='text-center' hidden={ uploadStatus !== 'uploaded' }>
                                <Form.Text>Available dates: {boundingDates.startingDate} - {boundingDates.endingDate}</Form.Text>
                            </div>
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Button disabled={ file === '' }>Generate file</Button>
                        </Form.Group>

                        <Form.Group className='mt-3' hidden={ errorMessage === '' }>
                            <Alert variant="danger">{errorMessage}</Alert>
                        </Form.Group>
                    </Form>
                </Col>
                <Col sm='12' md='1' lg='3' xl='4'></Col>
            </Row>
        </Container>
    )
};

export default FormComponent;