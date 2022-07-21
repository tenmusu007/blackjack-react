import React from 'react'
import { Link } from 'react-router-dom'

function Btn(props) {
    // console.log(props.onClick);
    return (
        <div className='btn' >
            <div onClick={() => props.onClick}>
                <Link to={props.to}>
                    {props.text}
                </Link>
            </div>
        </div>
    )
}

export default Btn