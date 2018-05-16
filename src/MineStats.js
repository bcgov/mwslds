import React from 'react'
import PropTypes from 'prop-types'
import { BarChart, Bar, XAxis, YAxis } from 'recharts'
import { cloneDeep } from 'lodash'

import withToken from './datafetching/Token'

const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  token: PropTypes.string,
}
const defaultProps = {
  width: 900,
  height: 400,
  fill: '#005edd',
  token: null,
}

const BASE_URL = 'https://i1api.nrs.gov.bc.ca/mwsl-commonmines-api/v1'

function minesCountTransform(data) {
  if (data) {
    return data.mines.length
  }
  return null
}

class MineStats extends React.Component {
  constructor(props) {
    super(props)

    this.bars = [
      {
        name: 'Region 1 Mines',
        route: 'mines?regionCode=1',
        transform: minesCountTransform,
      },
      {
        name: 'Region 2 Mines',
        route: 'mines?regionCode=2',
        transform: minesCountTransform,
      },
      {
        name: 'Region 3 Mines',
        route: 'mines?regionCode=3',
        transform: minesCountTransform,
      },
      {
        name: 'Region 4 Mines',
        route: 'mines?regionCode=4',
        transform: minesCountTransform,
      },
      {
        name: 'Region 5 Mines',
        route: 'mines?regionCode=5',
        transform: minesCountTransform,
      },
    ]

    const data = this.bars.map(bar => ({ name: bar.name, count: null }))

    this.state = {
      data,
    }
  }

  componentDidMount() {
    const { token } = this.props
    const options = {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    }

    this.bars.forEach((bar) => {
      const url = `${BASE_URL}/${bar.route}`

      fetch(url, options)
        .then((resp) => {
          if (!resp.ok) {
            throw Error(resp.statusText)
          }
          return resp.json()
        })
        .then((parsed) => {
          const count = bar.transform(parsed)
          this.updateCount(bar.name, count)
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }

  addData(newData) {
    this.setState(({ data }) => ({ data: data.concat(newData) }))
  }

  updateCount(name, count) {
    // we have to create a new copy of the data object to re render the chart
    const data = cloneDeep(this.state.data)
    const param = data.find(bar => bar.name === name)
    param.count = count
    this.setState({ data })
  }

  render() {
    const { width, height, fill } = this.props
    const { data } = this.state

    return (
      <BarChart width={width} height={height} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="count" fill={fill} label />
      </BarChart>
    )
  }
}

MineStats.propTypes = propTypes
MineStats.defaultProps = defaultProps

export default withToken(MineStats)
