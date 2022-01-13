import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function App() {

  const [datoteka, nastaviDatoteko] =  useState({ime: '', podatki: ''});

  const generirajDatoteko = (event) => {
    event.preventDefault();
    console.log(datoteka);
    axios.post('http://localhost:4000/generiraj_datoteko', datoteka).then((response) => {
      console.log("uspesno");
    }).catch((napaka) => {
      console.log("napaka");
    });
  };

  const obdelajSprememboDatoteke = (e) => {
    nastaviDatoteko({ime: e.target.files[0].name, podatki: e.target.files[0], });
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
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
