import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import { createSerializer } from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import DataTable, { UnwrappedDataTable } from './DataTable'

configure({ adapter: new Adapter() })
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))

describe('DataTable', () => {
  describe('UnwrappedDataTable', () => {
    it('renders', () => {
      const table = shallow(<UnwrappedDataTable />)
      expect(table).toMatchSnapshot()
    })

    it('renders data', () => {
      const data = [
        { col1: 'aa', col2: 'ab', col3: 'ac' },
        { col1: 'ba', col2: 'bb', col3: 'bc' },
        { col1: 'ca', col2: 'cb', col3: 'cc' },
        { col1: 'da', col2: 'db', col3: 'dc' },
        { col1: 'ea', col2: 'eb', col3: 'ec' },
      ]
      const table = mount(<UnwrappedDataTable data={data} keyField="col1" />)
      expect(table).toMatchSnapshot()
    })

    it('renders loading indicator', () => {
      const table = shallow(<UnwrappedDataTable loading />)
      expect(table).toMatchSnapshot()
    })

    it('renders error indicator', () => {
      const table = shallow(<UnwrappedDataTable error={{ error: 'oops' }} />)
      expect(table).toMatchSnapshot()
    })
  })

  describe('WrappedDataTable', () => {
    it('renders', () => {
      const table = mount(<DataTable />)
      expect(table).toMatchSnapshot()
    })
  })
})
