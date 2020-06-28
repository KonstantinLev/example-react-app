import React, {useContext} from 'react'
import './sidebar.scss'
import {RateContext} from "../../context/RateContext";

export const Sidebar = () => {

    const {state} = useContext(RateContext)

    return(
        <div className='sidebar'>
            <div className='sidebarHead'>
                <h3>Все валюты</h3>
            </div>
            <div className='sidebarContent'>
                <ul>
                    {
                        Object.keys(state.currency).map((item, idx) => {
                            return(
                                <li key={item}>
                                    <p>
                                        <span>
                                            <img src={state.currency[item].flag} alt={item}/> {item}
                                            <i> {state.currency[item].name}</i>
                                        </span>
                                    </p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}