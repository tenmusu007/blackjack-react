import './scss/App.scss';
import React from 'react';
import Home from './pages/Home';
import Btn from './components/Btn';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import PlayField from './pages/PlayField';
import Setting from './pages/Setting';
import { BetProvider } from './useContext/betContext';


function App() {
  return (
    <BetProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/playfield" element={<PlayField />}  />
            <Route path="/setting" element={<Setting />} />
          </Routes>
      </BrowserRouter>
    </BetProvider>

  )
}

export default App;
