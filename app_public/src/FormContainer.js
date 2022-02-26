import './FormContainer.css';
import FormOne from './FormOne';
import FormTwo from './FormTwo';
import FormThree from './FormThree';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

const FormContainer = () => {
 
    const [page, setPage] =  useState(0);
    const [formData, setFormData] = useState({
        fileData: '',
        fileName: '',
        fileUploaded: false,
        startDate: '01/01/2021',
        endDate: '01/02/2021',
        minDate: '01/01/21',
        maxDate: '01/12/21',
        baseTemperature: 10,
        rainGraph: '',
        temperatureGraph: '',
        monthlyData: '',
        dailyData: ''
    });

    const validFirstPage = () => {
        if (formData.fileData != ''){
            return true;
        }
        return false;
    };

    const validFileName = () => {
        if (formData.fileName == '') return false;
        let re = /^[\w-]+$/;
        if (re.test(formData.fileName)) return true;
        return false;
    };

    const nextPage = () => {
        console.log(formData);
        if (page == 1 && !validFileName()) return page;
        setPage((currPage) => {
            if (currPage == 2){
                return 2;
            }
            return currPage + 1
        });
    };

    const previousPage = () => {
        setPage((currPage) => {
            if (currPage == 1){
                return 1;
            }
            return currPage - 1;
        });
    };

    const start = () => {
        if (formData.fileData != ''){
            nextPage();
        }
    };

    const FormDisplay = () => {
        switch (page) {
            case 0: {
                return <FormOne formData={formData} setFormData={setFormData} validFirstPage={validFirstPage}></FormOne>
            }
            case 1: {
                return <FormTwo formData={formData} setFormData={setFormData}></FormTwo>
            }
            case 2: {
                return <FormThree formData={formData} setFormData={setFormData}></FormThree>
            }
        }
    };

    return (
        <div className="FormContainer">
            <Container fluid className="summary-block">
                {FormDisplay()}
                <Row>
                    <Container>
                        <Button className='next-button me-2' hidden={page < 2} onClick={previousPage} variant='danger'>Nazaj</Button>
                        <Button className='next-button me-2' hidden={page != 0} onClick={start} variant='primary'>Začni</Button>
                        <Button className='next-button ms-2' hidden={page == 2 || page == 0} onClick={nextPage} variant='primary'>Naprej</Button>
                        <Button className='next-button ms-2' hidden={page != 2} variant='primary'>Generiraj</Button>
                    </Container>
                </Row>
            </Container>
        </div>
    );
}

export default FormContainer;