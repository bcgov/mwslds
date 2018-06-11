import React from 'react'
import PropTypes from 'prop-types'
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip } from 'recharts'

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
  fill: '#337ab7',
  token: null,
}

class NowStats extends React.Component {
  constructor(props) {
    super(props)

    const data = []

    this.state = {
      data,
    }
  }

  componentDidMount() {
    this.mounted = true
    this.loadData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.loadData()
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  setData(newData) {
    this.setState({ data: newData })
  }

  loadData() {
    const { token } = this.props
    const url = 'https://i1api.nrs.gov.bc.ca/mwsl-reports-api/v1/noticesofworkstatistics?year=2017'

    if (!token) {
      return
    }

    const options = {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    }

    fetch(url, options)
      .then((resp) => {
        if (!resp.ok) {
          throw Error(resp.statusText)
        }
        return resp.json()
      })
      .then((parsed) => {
        if (this.mounted) {
        //  cache.put(url, parsed)
        //  this.addData({name: 'Region 1', count: 4000})
          const tempData = []
          parsed.noticesOfWorkAppTypesStatistics.forEach((nowdata) => {
            tempData.push({
              name: nowdata.applicationType,
              applications: nowdata.nowApplicationsYearUpToMonthCount,
              permitsApproved: nowdata.permitsYearUpToMonthCount,
              unprocessRejected: nowdata.rejectedUnProcessYearUpToMonthCount,
              processedRejected: nowdata.rejectedProcessYearUpToMonthCount,
            })
          })
          this.setData(tempData)
        }
      })
  }


  render() {
    const { width, height, fill } = this.props
    const { data } = this.state

    return (
      <BarChart width={width} height={height} data={data} style={{ margin: 'auto' }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="applications" fill={fill} />
        <Bar dataKey="permitsApproved" fill="#8884d8" />
        <Bar dataKey="unprocessRejected" fill="#82ca9d" />
        <Bar dataKey="processedRejected" fill="#ffc658" />
      </BarChart>
    )
  }
}

NowStats.propTypes = propTypes
NowStats.defaultProps = defaultProps

export default withToken(NowStats)
