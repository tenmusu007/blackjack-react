import React from 'react'
import { Link } from 'react-router-dom'

function Btn(props) {
    return (
        <div className='btn' >
            <Link to={props.to}>
                <div onClick={props.Onclick}>{props.text}</div>
            </Link>
        </div>
    )
}

export default Btn