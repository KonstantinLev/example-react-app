import React, {useContext} from 'react'
import './header.scss'
import {Navbar} from "../navbar/Navbar";
import {RateContext} from "../../context/RateContext";

export const Header = () => {

    const {modalShowHandler} = useContext(RateContext)

    return(
        <div className='header'>
            <div className='headerWrap'>
                <div className='logo'>
                    <a href="/">
                        <h2>Rate App</h2>
                    </a>
                </div>
                <Navbar />
                <div className='person'>
                    <i className='fa fa-user' area-hidden='true' onClick={modalShowHandler}/>
                </div>
            </div>
            <hr/>
        </div>
    )
}