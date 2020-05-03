import React, { useReducer } from 'react'
import { MOVE_ROBOT, SET_LOADING } from '../types'
import SimContext from './simContext'
import SimReducer from './simReducer'

const SimState = (props) => {
  const initialState = {
    position: {
      x: null,
      y: null,
    },
    commands: ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'],
    directions: ['NORTH', 'SOUTH', 'EAST', 'WEST'],
    facing: '',
    robotClass: 'robot1',
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

  /** command validation check
   * @param {String} command - String from textarea input
   * @return {Boolean} true or false - if exists in commands state
   */
  const isCommandValid = (command) => state.commands.includes(command)

  /** filter commands
   * @param {String} command - String from textarea input
   * @return {String} Filtered single string command
   * TODO fix tripple nesting if statement (time permitting)
   */
  const filterCommand = (command) => {
    const cmd = command.split(' ')
    if (cmd[0] === 'PLACE') {
      // check for additional placement coordinates and facing info
      if (cmd.length > 1) {
        const info = cmd[1].split(',')
        if (info.length !== 3) {
          // handle error alert - we require 3 items of placement info
          console.log(
            'we require 3 pieces of info for using PLACE command: X,Y,F',
            cmd
          )
          return false
        } else {
          // set the post=ition xy values
          const position = { x: parseInt(info[0]), y: parseInt(info[1]) }
          // check for facing position value
          if (state.directions.includes(info[2])) {
            const facing = info[2]
            if (checkPositionValues(position)) {
              const robotClass = `robot${Math.round(Math.random() * 2) + 1}`
              // update state with position and facing info if all valid
              dispatch({
                type: MOVE_ROBOT,
                payload: { position, facing, robotClass },
              })
              return cmd[0]
            }
          } else {
            // handle error alert
            console.log(
              `${info[2]} is not a valid direction - please enter NORTH, SOUTH, EAST or WEST`,
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

  /** process validated commands
   * @param {String} command - Validated command
   */
  const processCommand = (command) => {
    switch (command) {
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

  /** MOVE command
   * check facing direction to update position
   * no param required
   */
  const handleMove = () => {
    let px = state.position.x
    let py = state.position.y
    switch (state.facing) {
      case 'NORTH':
        px++
        break
      case 'SOUTH':
        --px
        break
      case 'EAST':
        py++
        break
      case 'WEST':
        --py
        break
      default:
        return false
    }
    const position = { x: px, y: py }
    if (checkPositionValues(position)) {
      dispatch({
        type: MOVE_ROBOT,
        payload: {
          position,
          facing: state.facing,
          robotClass: state.robotClass,
        },
      })
      return true
    }
  }

  /** Validate Position Values
   * @param {Object} position - contains x y coordinates
   */
  const checkPositionValues = (position) => {
    if (
      position.x >= 0 &&
      position.x <= 4 &&
      position.y >= 0 &&
      position.y <= 4
    ) {
      return true
    } else {
      console.log(
        'you have reached the edge of the table, please change direction or PLACE robot again'
      )
    }
  }

  /** Handle facing direction update
   * @param {String} command - Validated command LEFT or RIGHT
   */
  const handleFacing = (command) => {
    let facing = ''
    switch (state.facing) {
      case 'NORTH':
        facing = command === 'LEFT' ? 'WEST' : 'EAST'
        break
      case 'SOUTH':
        facing = command === 'LEFT' ? 'EAST' : 'WEST'
        break
      case 'EAST':
        facing = command === 'LEFT' ? 'NORTH' : 'SOUTH'
        break
      case 'WEST':
        facing = command === 'LEFT' ? 'SOUTH' : 'NORTH'
        break
      default:
        facing = state.facing
    }
    dispatch({
      type: MOVE_ROBOT,
      payload: {
        position: state.position,
        facing: facing,
        robotClass: state.robotClass,
      },
    })
  }

  /**
   * set loading state
   */
  const setLoading = () => dispatch({ type: SET_LOADING })

  return (
    <SimContext.Provider
      value={{
        position: state.position,
        robotClass: state.robotClass,
        loading: state.loading,
        handleCommand,
        processCommand,
      }}>
      {props.children}
    </SimContext.Provider>
  )
}

export default SimState
