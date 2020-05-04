import React, { useReducer } from 'react'
import { MOVE_ROBOT, SET_ALERT } from '../types'
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
    facing: null,
    alertInfo: null,
    robotClass: 'robot1',
  }
  const [state, dispatch] = useReducer(SimReducer, initialState)

  /** initial handler for command validation
   * @param {String} command - String from textarea input
   */
  const handleCommand = (command) => {
    if (command === '') {
      // send error alert information - we require 3 items of placement info
      dispatch({
        type: SET_ALERT,
        payload: {
          title: 'Sorry!',
          type: 'error',
          msg: ' please enter a command - "PLACE, MOVE, LEFT, RIGHT, REPORT"',
        },
      })
      return false
    }
    const cmd = filterCommand(command)
    if (isCommandValid(cmd)) {
      processCommand(cmd)
    } else {
      // send error alert information
      dispatch({
        type: SET_ALERT,
        payload: {
          title: `Sorry! "${cmd}"`,
          type: 'error',
          msg:
            ' is not valid. All commands are uppercase - "PLACE, MOVE, LEFT, RIGHT, REPORT"',
        },
      })
      return false
    }
  }

  /** command validation check
   * @param {String} command - String from textarea input
   * @return {Boolean} true or false - if exists in commands state
   */
  const isCommandValid = (command) => state.commands.includes(command)

  /** filter commands
   * @param {String} command - String from textarea input
   * @return {String} Filter commands - check for additional information
   */
  const filterCommand = (command) => {
    const cmd = command.split(' ')
    // check for additional PLACE coordinates and facing info
    if (cmd[0] === 'PLACE') {
      if (cmd.length > 1) {
        processAdditionalInfo(cmd[1])
        return cmd[0]
      } else {
        // send error alert information - we require 3 items of placement info
        dispatch({
          type: SET_ALERT,
          payload: {
            title: 'Sorry! PLACE',
            type: 'error',
            msg:
              ' command requires 3 additional parts of information: "PLACE X,Y,F"',
          },
        })
      }
    } else {
      return command
    }
  }

  /** process validated commands
   * @param {String} command - Validated command
   */
  const processAdditionalInfo = (additionalInfo) => {
    const info = additionalInfo.split(',')
    if (info.length !== 3) {
      // handle error alert - we require 3 items of placement info
      dispatch({
        type: SET_ALERT,
        payload: {
          title: 'Sorry! "PLACE"',
          type: 'error',
          msg:
            ' command requires all 3 additional parts of information: "PLACE X,Y,F"',
        },
      })
    } else {
      // set the post=ition xy values
      const position = {
        x: parseInt(info[0]),
        y: parseInt(info[1]),
      }
      // check for facing position value
      if (state.directions.includes(info[2])) {
        const facing = info[2]
        if (checkPositionValues(position)) {
          const robotClass = `robot${Math.round(Math.random() * 4) + 1}`
          // update state with position and facing info if all valid
          dispatch({
            type: MOVE_ROBOT,
            payload: { position, facing, robotClass },
          })
        }
      } else {
        // set error alert information - direction was onot valid
        dispatch({
          type: SET_ALERT,
          payload: {
            title: `Sorry! "${info[2]}"`,
            type: 'error',
            msg:
              ' is not a valid direction - please enter NORTH, SOUTH, EAST or WEST',
          },
        })
      }
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
      dispatch({
        type: SET_ALERT,
        payload: {
          title: 'Sorry!',
          type: 'error',
          msg:
            'This is the edge of the table, please change direction or PLACE robot again',
        },
      })
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

  return (
    <SimContext.Provider
      value={{
        position: state.position,
        facing: state.facing,
        alertInfo: state.alertInfo,
        robotClass: state.robotClass,
        handleCommand,
        processCommand,
      }}>
      {props.children}
    </SimContext.Provider>
  )
}

export default SimState
