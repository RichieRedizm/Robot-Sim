import React, { useReducer } from 'react'
import { SET_LOADING } from '../types'
import SimContext from './simContext'
import SimReducer from './simReducer'

const SimState = (props) => {
  const initialState = {
    position: null,
    loading: false,
  }
  const [state, dispatch] = useReducer(SimReducer, initialState)

  const processCommand = (command) => {
    // set state loading
    setLoading()

    if (isTextValid(command)) {
      // set state to show success alert
      //   setStatus('success')
    } else {
      // set status to show error alert
      //   setStatus('error')
    }
  }

  // text valid condition
  const isTextValid = (command) => {
    return (
      command === 'PLACE' ||
      command === 'MOVE' ||
      command === 'LEFT' ||
      command === 'RIGHT' ||
      command === 'REPORT'
    )
  }

  // set loading
  const setLoading = () => dispatch({ type: SET_LOADING })

  return (
    <SimContext.Provider
      value={{
        position: state.position,
        loading: state.loading,
        processCommand,
      }}>
      {props.children}
    </SimContext.Provider>
  )
}

export default SimState
