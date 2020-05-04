import { MOVE_ROBOT } from '../types'

export default (state, action) => {
  switch (action.type) {
    case MOVE_ROBOT:
      return {
        ...state,
        position: action.payload.position,
        robotClass: action.payload.robotClass,
        facing: action.payload.facing,
      }
    default:
      return state
  }
}
