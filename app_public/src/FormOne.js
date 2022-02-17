import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './FormOne.css';

const FormOne = ({ formData, setFormData }) => {
    
    let fileReader;

    const handleFileRead = (e) => {
        const content = fileReader.result;
        let fileContentArray = content.split(/\r\n|\n/);
        let firstDataRow = fileContentArray[1];
        let firstDate = firstDataRow.split(/;/)[0];
        firstDate = firstDate.split(/\s/)[0];
        // firstDate[0] = day, firstDate[1] = month, firstDate[2] = year
        firstDate = firstDate.split(/\./);
        
        let lastDataRow = fileContentArray[fileContentArray.length - 2];
        let lastDate = lastDataRow.split(/;/)[0];
        lastDate = lastDate.split(/\s/)[0];
        lastDate = lastDate.split(/\./);
        
        let firstDateString = firstDate[1] + '/' + firstDate[0] + '/' + firstDate[2];
        let lastDateString = lastDate[1] + '/' + lastDate[0] + '/' + lastDate[2];
        
        setFormData({...formData, minDate: firstDateString, maxDate: lastDateString, startDate: firstDateString, endDate:lastDateString});
    }

    const handleFileChange = (e) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(e.target.files[0]);
        setFormData({...formData, fileData: e.target.files[0]});
    }
    
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
                                <Form.Control type="file" onChange={handleFileChange}/>
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