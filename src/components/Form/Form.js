import React, { Fragment, useContext, useState } from 'react'
import SimContext from '../../context/sim/simContext'

const Form = () => {
  const simContext = useContext(SimContext)
  const { processCommand } = simContext
  const [command, setCommand] = useState('')

  // handles key characters entered to input and sets as state
  const handleOnChange = (e) => setCommand(e.target.value)

  // handles key down events.
  const handleOnKeyDown = (e) => {
    if (e.keyCode == 13) {
      // If key pressed is 'enter' call processCommand function
      e.preventDefault()
      processCommand(e.target.value)
    }
  }

  // handles leaving the input field and calls processCommand function
  const handleOnBlur = (e) => {
    processCommand(e.target.value)
  }

  return (
    <Fragment>
      <header>
        <title>
          <h2>Enter your command</h2>
        </title>
      </header>
      <form className='form' onKeyDown={(e) => handleOnKeyDown(e)}>
        <input
          type='textarea'
          value={command}
          placeholder='Enter Command Here....'
          onChange={(e) => handleOnChange(e)}
          onBlur={(e) => handleOnBlur(e)}
        />
      </form>
    </Fragment>
  )
}

export default Form
