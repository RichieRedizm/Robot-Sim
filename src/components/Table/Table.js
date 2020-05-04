import React, { useContext, useEffect, useState } from 'react'
import SimContext from '../../context/sim/simContext'
import SingleUnit from './SingleUnit'
import './Table.css'

const Table = () => {
  const [tableUnits, setTableUnits] = useState([])
  const [target, setTarget] = useState('')
  const simContext = useContext(SimContext)
  const { position, robotClass, facing } = simContext

  useEffect(() => {
    let units = []
    for (let x = 4; x >= 0; --x) {
      for (let y = 0; y < 5; y++) {
        units.push(`x${x}y${y}`)
      }
    }
    setTableUnits(units)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setTarget(`x${position.x}y${position.y}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position])

  return (
    <div className='table container'>
      {tableUnits.map((unit) => {
        const classes =
          unit === target ? `unit-item ${robotClass} ${facing}` : 'unit-item'
        return <SingleUnit key={unit} unitId={unit} classes={classes} />
      })}
    </div>
  )
}

export default Table
