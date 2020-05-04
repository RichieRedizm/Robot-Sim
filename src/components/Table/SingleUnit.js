import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faRobot,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const SingleUnit = ({ unitId, classes }) => {
  return (
    <div data-unit-position={unitId} className={classes}>
      <FontAwesomeIcon icon={faChevronLeft} />
      <FontAwesomeIcon icon={faChevronUp} />
      <FontAwesomeIcon icon={faChevronRight} />
      <FontAwesomeIcon icon={faChevronDown} />
      <FontAwesomeIcon icon={faRobot} />
    </div>
  )
}

export default SingleUnit
