import './FormContainer.css';
import FormOne from './FormOne';
import FormTwo from './FormTwo';
import FormThree from './FormThree';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import axios from 'axios';

const FormContainer = () => {
 
    const baseURL = 'http://localhost:5000'

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
        rainGraph: false,
        temperatureGraph: false,
        monthlyData: false,
        dailyData: false
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

    const donwloadTheFile = (fileId, newFileName) => {
        axios({
            url: baseURL+'/get',
            method: 'GET',
            params: { 'fileId': fileId },
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', newFileName + '.xlsx');
            document.body.appendChild(link);
            link.click();
        });
    };
    /*
    const checkForFile = (generatedFileName, newFileName) => {
        axios.get(baseURL+'/check', { params: { fileId: generatedFileName } }).then(response =>  {
            console.log(response.data);
            if (response.data == true){
                donwloadTheFile(generatedFileName, newFileName);
                clearInterval(intervalId);
            }
        });
    };*/

    const generateFile = () => {
        let reqData = new FormData();
        reqData.append('fileData', formData.fileData);
        reqData.append('fileName', formData.fileName);
        reqData.append('startDate', formData.startDate);
        reqData.append('endDate', formData.endDate);
        reqData.append('baseTemperature', formData.baseTemperature);
        reqData.append('rainGraph', formData.rainGraph);
        reqData.append('temperatureGraph', formData.temperatureGraph);
        reqData.append('dailyData', formData.dailyData);
        reqData.append('monthlyData', formData.monthlyData);

        axios.post(baseURL+'/generate', reqData).then((response) => {
            let newFileName = response.data[0];
            let generatedFileName = response.data[2];
            console.log(response);
            
            let intervalId = setInterval(checkForFile, 2000);

            function checkForFile() {
                axios.get(baseURL+'/check', { params: { fileId: generatedFileName } }).then(response =>  {
                    console.log(response.data);
                    if (response.data == true){
                        donwloadTheFile(generatedFileName, newFileName);
                        clearInterval(intervalId);
                    }
                });
            }
            /*axios({
                url: baseURL+'/get',
                method: 'GET',
                responseType: 'blob', // important
              }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', newFileName + '.xlsx');
                document.body.appendChild(link);
                link.click();
              });*/
        }).catch((napaka) => {
            console.log("napaka");
        });
    }

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
                        <Button className='next-button ms-2' hidden={page != 2} onClick={generateFile} variant='primary'>Generiraj</Button>
                    </Container>
                </Row>
            </Container>
        </div>
    );
}

export default FormContainer;