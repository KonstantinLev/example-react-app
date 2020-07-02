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
                    <ul>
                        {
                            Object.keys(state.sampleList).map((item, idx) => {
                                return(
                                    <li key={item}>
                                        <span>
                                            <img src={state.currency[state.sampleList[item].base].flag} alt={item} />&nbsp; {state.sampleList[item].base}
                                        </span>
                                        <span>{state.sampleList[item].date}</span>
                                        <span>{`${state.sampleList[item].course} ${state.sampleList[item].base2}`}</span>
                                        <button><i className='fa fa-times'></i></button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}