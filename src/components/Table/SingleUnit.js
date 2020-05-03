import React from 'react'

const SingleUnit = ({ unitId, classes }) => {
  return (
    <div data-unit-position={unitId} className={classes}>
      {unitId}
    </div>
  )
}

export default SingleUnit
