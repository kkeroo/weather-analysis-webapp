import './App.css';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './Header';
import FormContainer from './FormContainer'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  const [datoteka, nastaviDatoteko] =  useState({ime: '', podatki: ''});
  
  const generirajDatoteko = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('datoteka', datoteka.podatki);
    axios.post('http://localhost:5000/', formData).then((response) => {
      console.log("uspesno");
    }).catch((napaka) => {
      console.log("napaka");
    });
  };
  
  const obdelajSprememboDatoteke = (e) => {
    nastaviDatoteko({ime: e.target.files[0].name, podatki: e.target.files[0] });
  }
  return (
    <div className="App">
      <Header></Header>
      <FormContainer></FormContainer>
      <body>
        <form onSubmit={generirajDatoteko}>
          <input type="file" name={datoteka} onChange={obdelajSprememboDatoteke} />
          <input type="submit" value="GENERATE"/>
        </form>
      </body>
    </div>
  );
}

export default App;
