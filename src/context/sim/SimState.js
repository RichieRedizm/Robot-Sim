import React, { useReducer } from 'react'
import { MOVE_ROBOT, SET_LOADING } from '../types'
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
    directions: ['north', 'south', 'east', 'west'],
    facing: '',
    loading: false,
  }
  const [state, dispatch] = useReducer(SimReducer, initialState)
  console.log('SimState state', state)

  const handleCommand = (command) => {
    // set state loading
    setLoading()
    const cmd = filterCommand(command)

    if (isCommandValid(cmd)) {
      processCommand(cmd)
    } else {
      // handle error alert
      console.log('command not valid: ', cmd)
    }
  }

  // command validation
  const isCommandValid = (command) => state.commands.includes(command)

  // filter commands
  const filterCommand = (command) => {
    const cmd = command.split(' ')
    if (cmd[0] === 'PLACE') {
      // check for additional placement coordinates and facing information
      if (cmd.length > 1) {
        const info = cmd[1].split(',')
        if (info.length !== 3) {
          // handle error alert - we require 3 items of placement information
          console.log(
            'we require 3 pieces of info for using PLACE command: X,Y,F',
            cmd
          )
          return false
        } else {
          const position = { x: info[0], y: info[1] }
          if (state.directions.includes(info[2])) {
            const facing = info[2]
            dispatch({ type: MOVE_ROBOT, payload: { position, facing } })
            console.log('placement position: ', position)
            return cmd[0]
          } else {
            // handle error alert
            console.log(
              `${info[2]} is not a valid direction - please enter north, south, east or west`,
              cmd
            )
            return false
          }
        }
      } else {
        console.log(
          'we require 3 pieces of info for using PLACE command: X,Y,F',
          cmd
        )
        return false
      }
    } else {
      return command
    }
  }

  //  process valid commands
  const processCommand = (command) => {
    switch (command) {
      case 'PLACE':
        // this is handled by filterCommand()
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
