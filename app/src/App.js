import React from 'react'
import './App.scss'
import Layout from "./components/layout/Layout";

import CHF from './img/CHF.png'
import CNY from './img/CNY.png'
import EUR from './img/EUR.png'
import GBP from './img/GBP.png'
import JPY from './img/JPY.png'
import RUB from './img/RUB.png'
import USD from './img/USD.png'
import {RateContext} from "./context/RateContext";

class App extends React.Component
{

    constructor(props){
        super(props);
        this.state = {
            base: 'USD',
            rate: '',
            date: '',
            currency: {
                USD: {
                    name: 'Доллар США',
                    flag: USD,
                    course: ''
                },
                RUB: {
                    name: 'Рубль',
                    flag: RUB,
                    course: ''
                },
                JPY: {
                    name: 'Японская Юань',
                    flag: JPY,
                    course: ''
                },
                GBP: {
                    name: 'Фунт Стерлингов',
                    flag: GBP,
                    course: ''
                },
                EUR: {
                    name: 'Евро',
                    flag: EUR,
                    course: ''
                },
                CNY: {
                    name: 'Китайский Юань',
                    flag: CNY,
                    course: ''
                },
                CHF: {
                    name: 'Швейцарский Франк',
                    flag: CHF,
                    course: ''
                },
            }
        }
    }


    componentDidMount() {
        fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
            .then((response) => response.json())
            .then((response) => {

                const rateArr = ['USD', 'RUB', 'JPY', 'GBP', 'EUR', 'CNY', 'CHF']
                //const currency = {...this.state.currency}
                const currency = this.state.currency

                for (let i=0; i < rateArr.length; i++) {
                    currency[rateArr[i]].course = response.rates[rateArr[i]]
                }

                this.setState({
                    rate: response.rates,
                    date: response.date,
                    currency
                })
            })
    }

    render(){
        return(
            <RateContext.Provider value={{state: this.state}}>
                <Layout />
            </RateContext.Provider>
        )
    }
}

export default App
