import { MOVE_ROBOT, SET_ALERT } from '../types'

export default (state, action) => {
  switch (action.type) {
    case MOVE_ROBOT:
      return {
        ...state,
        position: action.payload.position,
        facing: action.payload.facing,
        alertInfo: null,
        robotClass: action.payload.robotClass,
      }
    case SET_ALERT:
      return {
        ...state,
        alertInfo: action.payload,
      }
    default:
      return state
  }
}
