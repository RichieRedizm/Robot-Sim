import React from 'react'
import './App.css'
import Form from './components/Form/Form'
import SimState from './context/sim/SimState'
import logo from './logo.svg'

function App() {
  return (
    <SimState>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <Form />
        </header>
      </div>
    </SimState>
  )
}

export default App
