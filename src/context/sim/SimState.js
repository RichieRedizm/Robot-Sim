import React, { useReducer } from 'react'
import { SET_LOADING } from '../types'
import SimContext from './simContext'
import SimReducer from './simReducer'

const SimState = (props) => {
  // position x,y coordinates
  // facing north, south, east, west
  const initialState = {
    position: {
      x: 0,
      y: 0,
    },
    commands: ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'],
    facing: '',
    loading: false,
  }
  const [state, dispatch] = useReducer(SimReducer, initialState)

  const handleCommand = (command) => {
    // set state loading
    setLoading()
    const cmd = filterCommand(command)

    if (isCommandValid(cmd)) {
      processCommand(cmd)
      //   console.log('command is valid: ', cmd)
    } else {
      // handle error alert
      console.log('command not valid: ', cmd)
    }
  }

  // command validation
  const isCommandValid = (command) => state.commands.includes(command)

  // filter comnands
  const filterCommand = (command) => {
    const cmd = command.split(' ')
    if (cmd[0] === 'PLACE') {
      // check for additional placement coordinates and facing information
      if (cmd.length > 1) {
        // console.log('PLACE yes - cmd: ', cmd)
        const placement = cmd[1].split(',')
        console.log('placement: ', placement)
        return cmd[0]
      } else {
        // handle error alert
        console.log('no additional information for PLACE command: ', cmd)
      }
    } else {
      return command
    }
  }

  //  process valid commands
  const processCommand = (command) => {
    switch (command) {
      case 'PLACE':
        break
      case 'MOVE':
        break
      case 'LEFT':
        break
      case 'RIGHT':
        break
      case 'REPORT':
        break
    }
  }

  // set loading
  const setLoading = () => dispatch({ type: SET_LOADING })

  return (
    <SimContext.Provider
      value={{
        loading: state.loading,
        handleCommand,
        processCommand,
      }}>
      {props.children}
    </SimContext.Provider>
  )
}

export default SimState
