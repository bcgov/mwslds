import React from 'react'

import 'bootstrap-theme/dist/css/bootstrap-theme.min.css'

export default function Table() {
  return (
    <table className="table table-striped table-hover table-bordered">
      <thead className="thead-dark">
        <tr>
          <th>col 1</th>
          <th>col 2</th>
          <th>col 3</th>
        </tr>
      </thead>
      <tbody>
        <tr className="table-info">
          <td>val 1</td>
          <td>val 2</td>
          <td>val 3</td>
        </tr>
        <tr className="table-success">
          <td>val 1</td>
          <td>val 2</td>
          <td>val 3</td>
        </tr>
        <tr className="table-warning">
          <td>val 1</td>
          <td>val 2</td>
          <td>val 3</td>
        </tr>
      </tbody>
    </table>
  )
}
