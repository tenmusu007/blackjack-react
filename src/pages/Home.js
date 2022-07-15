import React from 'react'
import Btn from '../components/Btn'

const Home = () => {
  return (
    <div>
        <h1>Black Jack</h1>
        <Btn text={"play"} to="/playfield"/>
        <Btn text={"setting"} to="/setting"/>
    </div>
  )
}

export default Home