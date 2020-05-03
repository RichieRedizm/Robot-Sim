import { MOVE_ROBOT, PLACE_ROBOT, SET_LOADING } from '../types'

export default (state, action) => {
  switch (action.type) {
    case PLACE_ROBOT:
      return {
        ...state,
        position: action.payload,
        loading: false,
      }
    case MOVE_ROBOT:
      return {
        ...state,
        position: action.payload.position,
        robotClass: action.payload.robotClass,
        facing: action.payload.facing,
        loading: false,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}
