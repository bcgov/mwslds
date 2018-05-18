import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const propTypes = {
  type: PropTypes.oneOf(['danger', 'warning', 'success', 'info']).isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  details: PropTypes.string,
  additional: PropTypes.string,
  onDismiss: PropTypes.func,
}

const defaultProps = {
  title: '',
  message: '',
  details: '',
  additional: '',
  onDismiss: () => {},
}

function MessageDisplay(props) {
  const {
    type,
    title,
    message,
    details,
    additional,
    onDismiss,
  } = props

  const classes = classnames('alert-dismissible', 'gov-alert', `gov-alert-${type}`)

  return (
    <div className={classes} role="alert" aria-live="assertive">
      <button
        type="button"
        onClick={onDismiss}
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        style={{ right: 0 }}
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <h3>
        <strong>{title}</strong>
      </h3>
      <p>
        <strong>{message}</strong>
      </p>
      <p>
        {details}
      </p>
      <p className="text-default">
        <strong>{additional}</strong>
      </p>
    </div>
  )
}

MessageDisplay.propTypes = propTypes
MessageDisplay.defaultProps = defaultProps

export default MessageDisplay
