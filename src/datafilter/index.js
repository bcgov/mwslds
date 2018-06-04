import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  data: PropTypes.any,
  filter: PropTypes.object,
  preFilter: PropTypes.func,
  postFilter: PropTypes.func,
}

const defaultProps = {
  data: null,
  filter: null,
  preFilter: data => data,
  postFilter: data => data,
}

function withDataFilter(Component) {
  class DataFilter extends React.Component {
    constructor(props) {
      super(props)

      this.onUpdateFilter = this.onUpdateFilter.bind(this)

      const { filter } = props
      this.state = {
        filter,
      }
    }

    onUpdateFilter(filter) {
      this.setState({
        filter,
      })
    }

    filterData(data) {
      const { filter } = this.state

      if (!filter || !data) {
        return data
      }

      const keys = Object.keys(filter)
      return data.filter((obj) => {
        for (let i = 0; i < keys.length; i += 1) {
          const key = keys[i]
          const val = obj[key]

          if (val === undefined) {
            // object doesnt have the key, no match
            return false
          }

          const filterVal = filter[key]
          if (val !== filterVal) {
            // values dont match
            return false
          }
        }
        return true
      })
    }

    render() {
      // dont pass the filter from props on here. its potentially out of date
      // as we fork it in the constructor and the wrapped component doesnt need
      // to know about it anyways
      const {
        data,
        filter,
        preFilter,
        postFilter,
        ...otherProps
      } = this.props

      const filtered = postFilter(this.filterData(preFilter(data)))

      return (
        <Component
          data={filtered}
          updateFilter={this.onUpdateFilter}
          {...otherProps}
        />
      )
    }
  }

  DataFilter.propTypes = propTypes
  DataFilter.defaultProps = defaultProps

  return DataFilter
}

export default withDataFilter
