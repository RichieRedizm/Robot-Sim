import { cleanup, getByTestId, render } from '@testing-library/react'
import React from 'react'
import SimContext from '../../context/sim/simContext'
import Table from './Table'

afterEach(cleanup)

const state = {
  position: {
    x: 0,
    y: 0,
  },
  robotClass: 'robot1',
  facing: 'NORTH',
}

const renderTableComponent = (state, addRobot) =>
  render(
    <SimContext.Provider value={state}>
      <Table addRobot={addRobot} />
    </SimContext.Provider>
  )

describe('Table component loads and functionality tests', () => {
  test('Loads table component plus match snapshot', () => {
    const { container, asFragment } = renderTableComponent({ ...state })
    const tableContainer = getByTestId(container, 'tableContainer')

    expect(tableContainer)
    expect(tableContainer.children.length).toBe(25)
    expect(asFragment()).toMatchSnapshot()
  })
})
