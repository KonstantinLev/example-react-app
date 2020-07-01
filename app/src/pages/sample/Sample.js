import React, {useContext} from 'react'
import './sample.scss'
import {RateContext} from "../../context/RateContext";
import {Button} from "../../components/button/Button";

export const Sample = () => {

    const {state, baseHandler, base2Handler, sampleDateHandler, dataWrite} = useContext(RateContext)

    return(
        <div className='sample'>
            <div className='sampleContainer'>
                <div>
                    <h3>
                        Получить курс: &nbsp;

                        <select onChange={baseHandler} value={state.sample.base}>
                            {
                                Object.keys(state.currency).map((item, idx) => {
                                    return(
                                        <option key={item}>{item}</option>
                                    )
                                })
                            }
                        </select>
                        &nbsp; &nbsp; к &nbsp; &nbsp;
                        <select onChange={base2Handler} value={state.sample.base2}>
                            {
                                Object.keys(state.currency).map((item, idx) => {
                                    return(
                                        <option key={item}>{item}</option>
                                    )
                                })
                            }
                        </select>
                    </h3>
                </div>
                <div className='sampleHead'>
                    <span>Дата: <input onChange={sampleDateHandler} type="date"/></span>
                    <Button click={dataWrite} arg={state.sample} text='Получить курс' />
                </div>
                <div className='sampleResult'>
                    <ul></ul>
                </div>
            </div>
        </div>
    )
}