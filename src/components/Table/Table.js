import React, { useContext, useEffect, useState } from 'react'
import SimContext from '../../context/sim/simContext'
import SingleUnit from './SingleUnit'
import './Table.css'

const Table = () => {
  const [target, setTarget] = useState('')
  const simContext = useContext(SimContext)
  const { position, robotClass } = simContext

  useEffect(() => {
    setTarget(`x${position.x}y${position.y}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position])

  // TODO - generate this array (time permitting)
  const units = [
    'x4y0',
    'x4y1',
    'x4y2',
    'x4y3',
    'x4y4',
    'x3y0',
    'x3y1',
    'x3y2',
    'x3y3',
    'x3y4',
    'x2y0',
    'x2y1',
    'x2y2',
    'x2y3',
    'x2y4',
    'x1y0',
    'x1y1',
    'x1y2',
    'x1y3',
    'x1y4',
    'x0y0',
    'x0y1',
    'x0y2',
    'x0y3',
    'x0y4',
  ]
  return (
    <div className='table container'>
      {units.map((item) => {
        const classes =
          item === target ? `unit-item ${robotClass}` : 'unit-item'
        return <SingleUnit unitId={item} classes={classes} />
      })}
    </div>
  )
}

export default Table
