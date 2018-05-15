import React from 'react'

import PropTypes from 'prop-types'

const propTypes = {
  transform: PropTypes.func,
  data: PropTypes.any,
}

const defaultProps = {
  data: null,
  transform: data => data,
}

export default function withDataTransform(Wrapped) {
  function WithDataTransformHOC(props) {
    const { data, transform, ...otherProps } = props
    const transformed = transform(data)
    return <Wrapped data={transformed} {...otherProps} />
  }

  WithDataTransformHOC.propTypes = propTypes
  WithDataTransformHOC.defaultProps = defaultProps

  return WithDataTransformHOC
}
