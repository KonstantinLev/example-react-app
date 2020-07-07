import React, {Fragment, useContext} from 'react'
import {NavLink} from 'react-router-dom'
import './navbar.scss'
import {RateContext} from "../../context/RateContext";

export const Navbar = () => {

    const {state} = useContext(RateContext)

    return(
        <nav>
            <ul>
                <li><NavLink to="/">Главная</NavLink></li>
                {
                    state.auth ?
                    <Fragment>
                        <li><NavLink to="/calc">Калькулятор</NavLink></li>
                        <li><NavLink to="/sample">Выборки</NavLink></li>
                        <li><NavLink to="/info">Информация</NavLink></li>
                    </Fragment> : ''
                }
            </ul>
        </nav>
    )
}