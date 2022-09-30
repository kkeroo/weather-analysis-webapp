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

import { useInterval } from '../hooks/useInterval';

const FormComponent = (props) => {

    const [file, setFile] = useState('');
    // ['', uploading, uploaded]
    const [uploadStatus, setUploadStatus] = useState('');
    // ['', generating, generated]
    const [generateStatus, setGenerateStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [boundingDates, setBoundingDates] = useState({
        startingDate: '',
        endingDate: '',
        startingDateYMD: '',
        endingDateYMD: ''
    });
    const [selectedDates, setSelectedDates] = useState({
        startingDate: '',
        endingDate: ''
    });
    const [baseTemperature, setBaseTemperature] = useState(0);
    const [jobId, setJobId] = useState(0);
    const delay = 1000;
    const [pooling, setPooling] = useState(false);

    useInterval(() => {
        if (jobId == 0) return;
        axios({
            method: "GET",
            url: "http://localhost:8000/generate/"+jobId,
        }).then(response => {
            console.log(response);
            if (response.data.job_status == "finished") {
                setPooling(false);
                getFileFromServer(response.data.filename);
                setGenerateStatus("generated");
            }
        })
    }, pooling ? delay : null);

    const getFileFromServer = (filename) => {
        const link = document.createElement('a');
        link.href = "http://localhost:8000/files/"+filename;
        link.download = filename + '.xlsx';
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    }

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
            setSelectedDates({
                startingDate: response.data.starting_date_ymd,
                endingDate: response.data.ending_date_ymd
            });
        })).catch(error => {
            console.log(error);
            setErrorMessage("Error in uploading file to server.");
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        uploadFileOnServer(e.target.files[0]);
    };

    const handleReset = () => {
        document.location.reload();
    };

    const handleStartingDateChange = (e) => {
        setSelectedDates(prevDates => ({...prevDates, startingDate: e.target.value}));
    };
    
    const handleEndingDateChange = (e) => {
        setSelectedDates(prevDates => ({...prevDates, endingDate: e.target.value}));
    };

    const validateForm = () => {
        let sd = new Date(selectedDates.startingDate);
        let ed = new Date(selectedDates.endingDate);

        let minDate = new Date(boundingDates.startingDateYMD);
        let maxDate = new Date(boundingDates.endingDateYMD);

        if (sd > maxDate || sd < minDate) {
            setErrorMessage("Please pick valid starting date between " + boundingDates.startingDate + " and " + boundingDates.endingDate + ".");
            return false;
        }
        else if(ed > maxDate || ed < minDate) {
            setErrorMessage("Please pick valid ending date between " + boundingDates.startingDate + " and " + boundingDates.endingDate + ".");
            return false;
        }
        else if (sd > ed) {
            setErrorMessage("Please pick dates in a way that starting date is before ending date.");
            return false;
        }
        else if (baseTemperature == 0) {
            setErrorMessage("Please select base temperature for GDD calculation.");
            return false;
        }
        else if (file === '') {
            setErrorMessage("Please upload file with weather data");
            return false;
        }
        else {
            setErrorMessage('');
            return true;
        }
    };

    const handleGenerateFile = () => {
        if (!validateForm()) {
            return;
        }
        setGenerateStatus('generating');
        let data = new FormData();
        data.append('file', file);
        data.append('base_temperature', baseTemperature);
        data.append('starting_date', selectedDates.startingDate);
        data.append('ending_date', selectedDates.endingDate);

        axios({
            method: "POST",
            url: "http://localhost:8000/generate",
            data: data
        }).then(response => {
            setJobId(response.data.job);
            setErrorMessage('');
            setPooling(true);
        }).catch(error => {
            setErrorMessage("Error in sending form data to server.");
        });
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
                                <Form.Check disabled={ file === '' } name="base_temperature" inline type="radio" value="5" label="5°C" className='text-light' onChange={(e) => {setBaseTemperature(e.target.value)}} ></Form.Check>
                                <Form.Check disabled={ file === '' } name="base_temperature" inline type="radio" value="8" label="8°C" className='text-light ms-4' onChange={(e) => {setBaseTemperature(e.target.value)}}></Form.Check>
                                <Form.Check disabled={ file === '' } name="base_temperature" inline type="radio" value="10" label="10°C" className='text-light ms-4' onChange={(e) => {setBaseTemperature(e.target.value)}}></Form.Check>
                            </Form.Group>
                        </Form.Group>

                        <Form.Group>
                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label className="text-light">Select starting date</Form.Label>
                                    <Form.Control disabled={ file === '' } inline type="date" min={boundingDates.startingDateYMD} max={boundingDates.endingDateYMD} defaultValue={boundingDates.startingDateYMD} onChange={(e) => {handleStartingDateChange(e)}}></Form.Control>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label className="text-light">Select ending date</Form.Label>
                                    <Form.Control disabled={ file === '' } inline type="date" min={boundingDates.startingDateYMD} max={boundingDates.endingDateYMD} defaultValue={boundingDates.endingDateYMD} onChange={(e) => {handleEndingDateChange(e)}}></Form.Control>
                                </Form.Group>
                            </Row>
                            <div className='text-center' hidden={ uploadStatus !== 'uploaded' }>
                                <Form.Text>Available dates: {boundingDates.startingDate} - {boundingDates.endingDate}</Form.Text>
                            </div>
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Button disabled={ file === '' || generateStatus !== '' } onClick={() => {handleGenerateFile()}}>
                                <div hidden={generateStatus !== ''}>Generate excel file</div>
                                <div hidden={generateStatus !== 'generating'}>
                                    <div class="spinner-border" role="status">
                                        <span class="sr-only"></span>
                                    </div>
                                    Generating...
                                </div>
                                <div hidden={generateStatus !== 'generated'}>
                                    <i class="bi bi-check-lg"></i> Generated
                                </div>
                            </Button>
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