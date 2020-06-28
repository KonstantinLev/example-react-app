import React, {Fragment} from 'react'
import {Route, Switch} from 'react-router-dom'
import './layout.scss'
import {AddClass} from "../../hoc/AddClass";
import {Header} from "../header/Header";
import {Home} from "../../pages/home/Home";
import {Sidebar} from "../sidebar/Sidebar";
import {Calc} from "../../pages/calc/Calc";
import {Sample} from "../../pages/sample/Sample";
import {Info} from "../../pages/info/Info";

const Layout = () => {
    return(
        <Fragment>
            <Header />
            <div className='content'>
                <div className='routes'>
                    <Switch>
                        <Route path='/' exact component = {Home} />
                        <Route path='/calc' render={() => <Calc />} />
                        <Route path='/sample' component = {Sample} />
                        <Route path='/info' component = {Info} />
                    </Switch>
                </div>
                <Sidebar />
            </div>
        </Fragment>

    )
}

export default AddClass(Layout, 'layout')