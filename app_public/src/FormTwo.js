import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';

const FormOne = ({ formData, setFormData }) => {

    const handleApply = (e, picker) => {
        console.log(picker)
        setFormData({...formData, startDate: convertMomentDateToString(picker.startDate), endDate: convertMomentDateToString(picker.endDate)});
    };

    const convertMomentDateToString = (momentDate) => {
        return momentDate.format('MM/DD/YY');
    };

    const validFileName = () => {
        if (formData.fileName == '') return false;
        let re = /^[\w-]+$/;
        if (re.test(formData.fileName)) return true;
        return false;
    };

    return (
        <div className='form'>
            <Container>
                <Row className='heading'>
                    <h1>Določite ime generirane datoteke in izberite željene datume.</h1>
                </Row>
                <Row>
                    <Col sm='3' lg='4'></Col>
                    <Col sm='6' lg='4'>
                        <Container>
                            <Form>
                                <Form.Group controlId="formFile" className="mb-2">
                                    <Form.Label className="text-light">Ime datoteke</Form.Label>
                                    <Form.Control type="text" placeholder='Vnesite ime  datoteke' isInvalid={!validFileName()} value={formData.fileName} onChange={(e) => setFormData({...formData, fileName: e.target.value})}/>
                                </Form.Group>
                            </Form>
                        </Container>
                    </Col>
                    <Col sm='3' lg='4'></Col>
                </Row>
                <Row>
                    <Col sm='3' lg='4'></Col>
                    <Col sm='6' lg='4'>
                        <Container className="mt-3">
                            <Form.Label className="text-light">Obdobje</Form.Label>
                            <DateRangePicker
                                initialSettings={{ minDate:formData.minDate, maxDate:formData.maxDate, drops:"auto", opens:"auto", startDate: formData.startDate, endDate: formData.endDate }}
                                onApply={handleApply}
                                >
                                <input type="text" className="form-control" />
                            </DateRangePicker>
                        </Container>
                    </Col>
                    <Col sm='3' lg='4'></Col>
                </Row>
            </Container>
        </div>
    );
}

export default FormOne;