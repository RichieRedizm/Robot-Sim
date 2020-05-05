import { cleanup, getByTestId, render } from '@testing-library/react'
import React from 'react'
import SingleUnit from './SingleUnit'

afterEach(cleanup)

const renderSingleUnitComponent = (props) => render(<SingleUnit {...props} />)

describe('SingleUnit component loads and renders correctly depending on props', () => {
  test('check if addRobot false effects the render', () => {
    const props = {
      unitId: 'x1y1',
      classes: 'unit-item',
      addRobot: false,
    }
    const { container, asFragment } = renderSingleUnitComponent(props)
    const unitItem = getByTestId(container, 'unitItem')
    expect(unitItem)
    // if addRobot is false the chevron and robot icons are not loaded for that unit
    expect(unitItem.children.length).toBe(0)
    expect(asFragment()).toMatchSnapshot()
  })
  test('check if addRobot false effects the render', () => {
    const props = {
      unitId: 'x1y1',
      classes: 'unit-item',
      addRobot: true,
    }
    const { container } = renderSingleUnitComponent(props)
    const unitItem = getByTestId(container, 'unitItem')
    // if addRobot is true the chevron and robot icons are loaded for that unit
    expect(unitItem.children.length).toBe(5)
  })
})
