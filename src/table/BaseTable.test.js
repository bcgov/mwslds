import React from 'react'
import { configure, mount } from 'enzyme'
import { createSerializer } from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import BaseTable from './BaseTable'

configure({ adapter: new Adapter() })
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))

describe('BaseTable', () => {
  it('renders', () => {
    const table = mount(<BaseTable />)
    expect(table).toMatchSnapshot()
  })

  it('renders with data', () => {
    const data = [
      { col1: 'aa', col2: 'ab', col3: 'ac' },
      { col1: 'ba', col2: 'bb', col3: 'bc' },
      { col1: 'ca', col2: 'cb', col3: 'cc' },
      { col1: 'da', col2: 'db', col3: 'dc' },
      { col1: 'ea', col2: 'eb', col3: 'ec' },
    ]
    const table = mount(<BaseTable keyField="col1" data={data} />)
    expect(table).toMatchSnapshot()
  })

  it('renders column labels', () => {
    const data = [
      { col1: 'aa', col2: 'ab', col3: 'ac' },
      { col1: 'ba', col2: 'bb', col3: 'bc' },
      { col1: 'ca', col2: 'cb', col3: 'cc' },
      { col1: 'da', col2: 'db', col3: 'dc' },
      { col1: 'ea', col2: 'eb', col3: 'ec' },
    ]
    const columnLabels = { col1: 'first', col2: 'second', col3: 'third' }
    const table = mount(<BaseTable keyField="col1" data={data} columnLabels={columnLabels} />)
    expect(table).toMatchSnapshot()
  })

  it('renders expand indicator column', () => {
    const data = [
      { col1: 'aa', col2: 'ab', col3: 'ac' },
    ]
    const table = mount(<BaseTable keyField="col1" data={data} expandComponent={() => <div />} />)
    expect(table).toMatchSnapshot()
  })

  it('renders expand compoent', () => {
    const data = [
      { col1: 'aa', col2: 'ab', col3: 'ac' },
    ]
    const update = () => {}
    const expand = jest.fn(() => <div />)
    mount(<BaseTable keyField="col1" data={data} expandComponent={expand} updateData={update} />)
    // make sure the expand component gets called with the row data and update function
    expect(expand.mock.calls[0][0]).toEqual(Object.assign({ updateTableData: update }, data[0]))
  })

  it('renders search compoent', () => {
    const data = [
      { col1: 'aa', col2: 'ab', col3: 'ac' },
    ]
    const filter = () => {}
    const search = jest.fn(() => <div />)
    mount(<BaseTable keyField="col1" data={data} searchComponent={search} updateFilter={filter} />)
    // make sure the search component got called with its onFilter prop
    expect(search.mock.calls[0][0].onFilter).toEqual(filter)
  })
})
