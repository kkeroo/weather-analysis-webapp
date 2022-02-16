import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './FormOne.css';
import { useState } from 'react';

const FormOne = ({ formData, setFormData, validPage }) => {
    return (
        <div className='form'>
            <Container>
                <Row className='heading'>
                    <h1>Najprej naložite datoteko.</h1>
                </Row>
                <Row>
                    <Col sm='3' lg='4'></Col>
                    <Col sm='6' lg='4'>
                        <Form className='file-input'>
                            <Form.Group controlId="formFile" className="mb-2">
                                <Form.Control type="file" onChange={(e) => setFormData({...formData, fileData: e.target.files[0]})}/>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm='3' lg='4'></Col>
                </Row>
            </Container>
        </div>
    );
}

export default FormOne;