import { cleanup, fireEvent, getByTestId, render } from '@testing-library/react'
import React from 'react'
import SimContext from '../../context/sim/simContext'
import Form from './Form'

afterEach(cleanup)

const state = {
  position: {
    x: 0,
    y: 0,
  },
  commands: ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'],
  directions: ['NORTH', 'SOUTH', 'EAST', 'WEST'],
  facing: 'NORTH',
  alertInfo: null,
  handleCommand: jest.fn(),
}

const renderFormComponent = (state) =>
  render(
    <SimContext.Provider value={state}>
      <Form />
    </SimContext.Provider>
  )

describe('Form component and command functionality tests', () => {
  test('Loads form component and input field plus match snapshot', () => {
    const { container, asFragment } = renderFormComponent({ ...state })
    const commandForm = getByTestId(container, 'commandForm')
    const commandInput = getByTestId(container, 'commandInput')

    expect(commandForm)
    expect(commandInput)
    expect(asFragment()).toMatchSnapshot()
  })
  test('input field accepts text update commands', () => {
    const { container } = renderFormComponent({ ...state })
    const commandInput = getByTestId(container, 'commandInput')
    expect(commandInput.value).toBe('')
    fireEvent.change(commandInput, { target: { value: 'PLACE' } })
    expect(commandInput.value).toBe('PLACE')
    fireEvent.change(commandInput, { target: { value: 'MOVE' } })
    expect(commandInput.value).toBe('MOVE')
    fireEvent.change(commandInput, { target: { value: 'LEFT' } })
    expect(commandInput.value).toBe('LEFT')
    fireEvent.change(commandInput, { target: { value: 'RIGHT' } })
    expect(commandInput.value).toBe('RIGHT')
    fireEvent.change(commandInput, { target: { value: 'REPORT' } })
    expect(commandInput.value).toBe('REPORT')
  })
})
