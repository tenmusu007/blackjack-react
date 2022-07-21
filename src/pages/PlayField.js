import React from 'react'
import Btn from '../components/Btn'
import CardHolderPlayer from '../components/CardHolderPlayer'
import { Header } from '../components/Header'

function PlayField() {
    return (
        <div className='playFieldContainer'>
            <Header/>
            <Btn text={"back"} to="/" />
            {/* <CardHolderPlayer/> */}
            <CardHolderPlayer/>
        </div>
    )
}

export default PlayField