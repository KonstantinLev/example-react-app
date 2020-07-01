import React, {useContext} from 'react'
import './counter.scss'
import {RateContext} from "../../context/RateContext";
import {Button} from "../button/Button";

export const Counter = () => {

    const {state, inputValueHandler, currencyValueHandler, calculatorValueHandler} = useContext(RateContext)

    return(
        <div className='calcHead'>
            <div>
                <h4>Я хочу обменять:</h4>
            </div>
            <div className='operation'>
                <span>
                    <input
                        type="number"
                        value={state.inputValue}
                        onChange={inputValueHandler}
                    />&nbsp; RUB
                </span>
                <select onChange={currencyValueHandler}>
                    {
                        Object.keys(state.currency).map((item, idx) => {
                            return(
                                <option key={item}>{item}</option>
                            )
                        })
                    }
                </select>
                {/*<button onClick={() => calculatorValueHandler(state.currencyValue)}>Посчитать</button>*/}
                <Button
                    text = 'Посчитать'
                    click = {calculatorValueHandler}
                    arg = {state.currencyValue}
                />
            </div>
        </div>
    )
}
