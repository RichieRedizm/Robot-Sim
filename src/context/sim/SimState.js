import React, { useReducer } from 'react'
import { MOVE_ROBOT, SET_LOADING } from '../types'
import SimContext from './simContext'
import SimReducer from './simReducer'

const SimState = (props) => {
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

  /** initial handler for command validation
   * @param {String} command - String from textarea input
   */
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

  /** filter commands
   * @param {String} command - String from textarea input
   * @return {String} Filtered single string command
   * TODO fix tripple nesting if statement (time permitting)
   */
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
          // update state with position and facing info
          const position = { x: parseInt(info[0]), y: parseInt(info[1]) }
          if (state.directions.includes(info[2])) {
            const facing = info[2]
            dispatch({ type: MOVE_ROBOT, payload: { position, facing } })
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
        // check the facing direction to calc position
        handleMove()
        break
      case 'LEFT':
      case 'RIGHT':
        // update the facing direction
        handleFacing(command)
        break
      case 'REPORT':
        break
      default:
        return false
    }
  }

  //  process valid commands
  const handleMove = () => {
    let px = state.position.x
    let py = state.position.y
    switch (state.facing) {
      case 'north':
        px++
        break
      case 'south':
        --px
        break
      case 'east':
        py++
        break
      case 'west':
        --py
        break
      default:
        return false
    }
    const position = { x: px, y: py }
    console.log('MOVE position', position)
    dispatch({ type: MOVE_ROBOT, payload: { position, facing: state.facing } })
  }

  //  process valid commands
  const handleFacing = (command) => {}

  // set loading
  const setLoading = () => dispatch({ type: SET_LOADING })

  return (
    <SimContext.Provider
      value={{
        position: state.position,
        loading: state.loading,
        handleCommand,
        processCommand,
      }}>
      {props.children}
    </SimContext.Provider>
  )
}

export default SimState
