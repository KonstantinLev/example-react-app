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
import {Dark} from "./components/dark/Dark";
import {Modal} from "./components/modal/Modal";
import {Input} from "./components/input/Input";

class App extends React.Component
{

    constructor(props){
        super(props);
        this.state = {

            formControls: {
                email: {
                    value: '',
                    type: 'email',
                    label: 'Email',
                    errorMessage: 'Введите корректный Email',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        email: true
                    }
                },
                password: {
                    value: '',
                    type: 'password',
                    label: 'Пароль',
                    errorMessage: 'Пароль не может быть пустым',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 6
                    }
                }
            },

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
            sampleList: '',

            showModal: false

        }
    }

    modalShowHandler = () => {
        this.setState({showModal: true})
    }

    modalHideHandler = () => {
        this.setState({showModal: false})
    }

    onChangeHandler = (event, controlName) => {
        console.log(`${controlName} - ${event.target.value}`)

        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}



        control.value = event.target.value
        control.touched = true



        control.valid = this.validateControl(control.value, control.validation)

        console.log(control)

        formControls[controlName] = control

        this.setState({formControls})
    }

    validateControl = (value, validation) => {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = this.validateEmail(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid

    }

    // validateEmail(email) {
    //     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return re.test(String(email).toLowerCase());
    // }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, idx) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + idx}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={true}
                    onChange={(event) => this.onChangeHandler(event, controlName)}
                />
            )
        })
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

        axios.get('https://example-react-app.firebaseio.com/sample.json')
            .then((response) => {
                this.setState({sampleList: response.data})
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

    sampleRemove = async (id) => {
        let sampleList = {...this.state.sampleList}
        delete sampleList[id]
        this.setState({sampleList})

        await axios.delete(`https://example-react-app.firebaseio.com/sample/${id}.json`)
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
                    dataWrite: this.dataWrite,
                    sampleRemove: this.sampleRemove,
                    renderInputs: this.renderInputs,
                    modalHideHandler: this.modalHideHandler,
                    modalShowHandler: this.modalShowHandler,
                }}>
                <Dark showModal={this.state.showModal} modalHideHandler={this.modalHideHandler} />
                <Modal />
                <Layout />
            </RateContext.Provider>
        )
    }
}

export default App
