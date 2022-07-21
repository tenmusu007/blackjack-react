import React from 'react'
import Btn from '../components/Btn'
import { Header } from '../components/Header'

const Home = () => {
  return (
    <div className='homeContainer'>
      <Header />
      <h1 className='title'>Black Jack</h1>
      <div className='playBtn'>
        <Btn text={"play"} to="/playfield" />
      </div>
      <div className='btnContainer'>
        <Btn text={"setting"} to="/setting" />
        <Btn text={"setting"} to="/setting" />
      </div>
    </div>
  )
}

export default Home