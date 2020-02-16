import React, { useEffect, useState} from 'react';
import './App.css';
import CurrencyRow from './components/CurrencyRow';

const API_URL = 'https://api.exchangeratesapi.io/latest';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]) // useState usa um array vazio pois nao ha opcoes quando a app carrega pela primeira vez
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount; // as duas variaveis sao criadas de forma implicita
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate || 0;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const firstCurrency = Object.keys(data.rates)[0]; // pega a primeira chave do array para torna-la a primeira moeda a ser usada para conversao
      setCurrencyOptions([data.base, ...Object.keys(data.rates)]) // insere nos options dos selescts as keys do array retornado como values
      setFromCurrency(data.base); // moeda da qual sao feitas as conversoes
      setToCurrency(firstCurrency); // moeda para qual serao feitas as conversoes
      setExchangeRate(data.rates[firstCurrency]); // taxa de conversao a partir da primeira moeda
    })
  }, [])

  useEffect(() => { // permite que ao selecionar um option diferente na interface, seja feita uma nova requisicao para atualizar taxas na tela
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${API_URL}?base=${fromCurrency}&symbols=${toCurrency}`) // ver documentacao da API para entender esta requisicao
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency])) 
    }
  }, [fromCurrency, toCurrency]) // se algum dos arrays passados for alterado, a funcao eh executada

  function handleFromAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  
  function handleToAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions = {currencyOptions} // values dos options sendo passados como prop
        selectedCurrency = {fromCurrency} // value padrao para a option no select
        onChangeCurrency = {e => setFromCurrency(e.target.value)} // define value como o value selecionado no option da interface
        onChangeAmount = {handleFromAmountChange}
        amount = {fromAmount}
       />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions = {currencyOptions} // values dos options sendo passados como prop
        selectedCurrency = {toCurrency} // value padrao para a option no select
        onChangeCurrency = {e => setToCurrency(e.target.value)} // define value como o value selecionado no option da interface
        amount = {toAmount}
        onChangeAmount = {handleToAmountChange}
      />
    </>
  );
}

export default App;
