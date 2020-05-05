import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faRobot,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment } from 'react'

const SingleUnit = ({ unitId, classes, addRobot }) => {
  return (
    <Fragment>
      {unitId && (
        <div
          data-testid='unitItem'
          data-unit-position={unitId}
          className={classes}>
          {addRobot === true && <FontAwesomeIcon icon={faChevronLeft} />}
          {addRobot === true && <FontAwesomeIcon icon={faChevronUp} />}
          {addRobot === true && <FontAwesomeIcon icon={faChevronRight} />}
          {addRobot === true && <FontAwesomeIcon icon={faChevronDown} />}
          {addRobot === true && <FontAwesomeIcon icon={faRobot} />}
        </div>
      )}
    </Fragment>
  )
}

export default SingleUnit
