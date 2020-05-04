import React from 'react'
import './App.css'
import Form from './components/Form/Form'
import Table from './components/Table/Table'
import SimState from './context/sim/SimState'

function App() {
  return (
    <SimState>
      <div className='App'>
        <div className='App-wrapper'>
          <Form />
          <Table />
        </div>
      </div>
    </SimState>
  )
}

export default App
