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
        startDate: '01/01/2021',
        endDate: '01/02/2021',
        baseTemperature: 10,
        rainGraph: '',
        temperatureGraph: '',
        monthlyData: '',
        dailyData: ''
    });

    let validFirstPage = 0;

    const nextPage = () => {
        if (page == 0){
            if (formData.fileData === '' || formData.fileName === ''){
                validFirstPage = -1;
            }
            else{
                validFirstPage = 1;
            }
        }
        
        setPage((currPage) => {
            if (currPage == 2){
                return 2;
            }
            return currPage + 1
        });
        console.log(validFirstPage);
    };

    const previousPage = () => {
        setPage((currPage) => {
            if (currPage == 0){
                return 0;
            }
            return currPage - 1;
        });
    };

    const FormDisplay = () => {
        switch (page) {
            case 0: {
                return <FormOne formData={formData} setFormData={setFormData} validPage={validFirstPage}></FormOne>
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
                        <Button className='next-button me-2' hidden={page == 0} onClick={previousPage} variant='danger'>Nazaj</Button>
                        <Button className='next-button ms-2' hidden={page == 2} onClick={nextPage} variant='primary'>Naprej</Button>
                        <Button className='next-button ms-2' hidden={page != 2} variant='primary'>Generiraj</Button>
                    </Container>
                </Row>
            </Container>
        </div>
    );
}

export default FormContainer;