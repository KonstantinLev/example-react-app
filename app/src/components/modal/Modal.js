import React, {Fragment, useState, useContext} from 'react'
import './modal.scss'
import {Login} from "../login/Login";
import {Register} from "../register/Register";
import {RateContext} from "../../context/RateContext";

export const Modal = () => {

    const {state, modalHideHandler} = useContext(RateContext)

    const [value, setValue] = useState('login')

    const links = [{name: 'Вход', id: 'login'}, {name: 'Регистрация', id: 'register'}]

    const cls = ['modal']

    if(state.showModal){
        cls.push('modalShow')
    }

    const windowHandler = (id) => [
        setValue(id)
    ]



    return(
        <div className={cls.join(' ')}>
            <Fragment>
                <div className='modalHead'>
                    <ul>
                        {links.map((item, idx) => {
                            return(
                                <li
                                    onClick={() => windowHandler(item.id)}
                                    key={idx}
                                    style={{fontWeight: item.id === value ? 'bold' : 'normal', cursor: 'pointer'}}
                                >{item.name}
                                </li>
                            )
                        })}
                    </ul>

                    <i className='fa fa-times' aria-hidden='true' onClick = {modalHideHandler}/>
                </div>
                <hr/>
            </Fragment>

            {value === 'register' ? <Register /> : <Login />}

        </div>
    )
}