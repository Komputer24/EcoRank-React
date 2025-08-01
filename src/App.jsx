import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
      <div id="appName">
        <h1 style={{color: '#267988'}}>Eco</h1><h1 style={{color: '#88a24a'}}>Rank</h1>
      </div>
      <div id="btns">
        <button className="btn">Login</button>
        <button className="btn">Signup</button>
      </div>
      <p style={{fontSize: '22px'}}>Developed by Kaleab Beteselassie</p>
    </>
  )
}

export default App
