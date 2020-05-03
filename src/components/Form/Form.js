import React, { Fragment, useContext, useState } from 'react'
import SimContext from '../../context/sim/simContext'

const Form = () => {
  const simContext = useContext(SimContext)
  const { handleCommand } = simContext
  const [command, setCommand] = useState('')

  // handles key characters entered to input and sets as state
  const handleOnChange = (e) => setCommand(e.target.value)

  // handles key down events.
  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      // If key pressed is 'enter' call handleCommand function
      e.preventDefault()
      handleCommand(e.target.value)
    }
  }

  return (
    <Fragment>
      <header>
        <h2>Type your command and press enter</h2>
      </header>
      <form className='form' onKeyDown={(e) => handleOnKeyDown(e)}>
        <input
          type='textarea'
          value={command}
          placeholder='Enter Command Here....'
          onChange={(e) => handleOnChange(e)}
        />
      </form>
    </Fragment>
  )
}

export default Form
