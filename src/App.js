import React from 'react'
import './App.css'
import Form from './components/Form/Form'
import SimState from './context/sim/SimState'

function App() {
  return (
    <SimState>
      <div className='App'>
        <header className='App-header'>
          <Form />
        </header>
      </div>
    </SimState>
  )
}

export default App
