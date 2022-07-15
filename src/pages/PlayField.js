import React from 'react'
import Btn from '../components/Btn'
import CardHolder from '../components/CardHolder'

function PlayField() {
    return (
        <div>
            <h1>PlayField</h1>
            <CardHolder/>
            <Btn text={"back"} to="/" />
        </div>
    )
}

export default PlayField