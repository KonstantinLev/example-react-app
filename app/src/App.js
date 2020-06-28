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
                    course: '3213'
                },
                RUB: {
                    name: 'Рубль',
                    flag: RUB,
                    course: '31213'
                },
                JPY: {
                    name: 'Японская Юань',
                    flag: JPY,
                    course: '321'
                },
                GBP: {
                    name: 'Фунт Стерлингов',
                    flag: GBP,
                    course: '00067'
                },
                EUR: {
                    name: 'Евро',
                    flag: EUR,
                    course: '1234'
                },
                CNY: {
                    name: 'Китайский Юань',
                    flag: CNY,
                    course: '123'
                },
                CHF: {
                    name: 'Швейцарский Франк',
                    flag: CHF,
                    course: '321312'
                },
            }
        }
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
