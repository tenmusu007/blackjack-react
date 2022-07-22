import React from 'react'
import Btn from '../components/Btn/Btn'
import CardHolderPlayer from '../components/CardHolder/CardHolderPlayer'
import { Header } from '../components/Header/Header'

function PlayField() {
    return (
        <div className='playFieldContainer'>
            <Header/>
            <Btn text={"back"} to="/" />
            <CardHolderPlayer/>
        </div>
    )
}

export default PlayField