import React, { useEffect, useState} from 'react';
import './App.css';
import CurrencyRow from './components/CurrencyRow';

const API_URL = 'https://api.exchangeratesapi.io/latest';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]) // useState usa um array vazio pois nao ha opcoes quando a app carrega pela primeira vez
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();

  useEffect(() => {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const firstCurrency = Object.keys(data.rates)[0]; // pega a primeira chave do array para torna-la a primeira moeda a ser usada para conversao
      setCurrencyOptions([data.base, ...Object.keys(data.rates)]) // insere nos options dos selescts as keys do array retornado como values
      setFromCurrency(data.base); // moeda da qual sao feitas as conversoes
      setToCurrency(firstCurrency); // moeda para qual serao feitas as conversoes
    })
  }, [])

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions = {currencyOptions} // values dos options sendo passados como prop
        selectedCurrency = {fromCurrency} // value padrao para a option no select
        onChangeCurrency = {e => setFromCurrency(e.target.value)} // define value como o value selecionado no option da interface
       />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions = {currencyOptions} // values dos options sendo passados como prop
        selectedCurrency = {toCurrency} // value padrao para a option no select
        onChangeCurrency = {e => setToCurrency(e.target.value)} // define value como o value selecionado no option da interface
      />
    </>
  );
}

export default App;
