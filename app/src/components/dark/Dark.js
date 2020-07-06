import React from 'react'
import './dark.scss'

export const Dark = (props) => {

    const cls = ['dark']

    if (props.showModal) {
        cls.push('showDark')
    }

    return(
        <div
            onClick={props.modalHideHandler}
            className={cls.join(' ')}
        ></div>
    )
}