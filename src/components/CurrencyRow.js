import React from 'react'

export default function CurrencyRow(props) {
    const { currencyOptions, selectedCurrency, onChangeCurrency } = props; // faz destructuring da currencyOptions para props

    return (
        <div>
            <input type="number" className="input"/>
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map(option => ( // map simplesmente retorna os valores de currencyOptions
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}
