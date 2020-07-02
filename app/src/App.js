import React from 'react'
import './App.scss'
import Layout from "./components/layout/Layout";
import axios from 'axios'

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
            },

            //calculator

            inputValue: 100,
            currencyValue: 'USD',
            result: null,

            //sample

            sample: {
                base: 'USD',
                base2: 'RUB',
                date: '',
                course: ''
            },
            sampleList: ''

        }
    }

    inputValueHandler = (event) => {
        this.setState({
            inputValue: event.target.value,
            result: null
        })
    }

    currencyValueHandler = (event) => {
        this.setState({
            currencyValue: event.target.value,
            result: null
        })
    }

    calculatorValueHandler = async (value) => {
        let result
        //async
        await fetch(`https://api.exchangeratesapi.io/latest?base=RUB`)
            .then((response) => response.json())
            .then((response) => {
                result = response.rates[value] * this.state.inputValue
            })

        this.setState({result})

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

    baseHandler = (event) => {
        this.setState({
            sample: {...this.state.sample, base: event.target.value}
        })
    }

    base2Handler = (event) => {
        this.setState({
            sample: {...this.state.sample, base2: event.target.value}
        })
    }

    sampleDateHandler = (event) => {
        this.setState({
            sample: {...this.state.sample, date: event.target.value}
        })
    }

    dataWrite = async () => {
        await fetch(`https://api.exchangeratesapi.io/${this.state.sample.date}?base=${this.state.sample.base}`)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    sample: {...this.state.sample, course: response.rates[this.state.sample.base2]}
                })
            })

        await axios.post('https://example-react-app.firebaseio.com/sample.json', this.state.sample)
            .then((response) => {
                return('')
            })

        await axios.get('https://example-react-app.firebaseio.com/sample.json')
            .then((response) => {
                this.setState({sampleList: response.data})
            })
    }

    render(){
        return(
            <RateContext.Provider
                value={{
                    state: this.state,
                    inputValueHandler: this.inputValueHandler,
                    currencyValueHandler: this.currencyValueHandler,
                    calculatorValueHandler: this.calculatorValueHandler,
                    baseHandler: this.baseHandler,
                    base2Handler: this.base2Handler,
                    sampleDateHandler: this.sampleDateHandler,
                    dataWrite: this.dataWrite
                }}>
                <Layout />
            </RateContext.Provider>
        )
    }
}

export default App
