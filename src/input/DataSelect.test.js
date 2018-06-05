import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import { createSerializer } from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import { UnwrappedDataSelect } from './DataSelect'

configure({ adapter: new Adapter() })
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))

describe('DataSelect', () => {
  describe('UnwrappedDataSelect', () => {
    it('renders', () => {
      const select = mount(<UnwrappedDataSelect onChange={() => {}} />)
      expect(select).toMatchSnapshot()
    })

    it('is disabled when loading', () => {
      const select = mount(<UnwrappedDataSelect loading onChange={() => {}} />)
      expect(select).toMatchSnapshot()
      expect(select.find('Select').props().disabled).toBe(true)
    })

    it('is disabled on error', () => {
      const select = mount(<UnwrappedDataSelect error={{ error: 'oops' }} onChange={() => {}} />)
      expect(select).toMatchSnapshot()
      expect(select.find('Select').props().disabled).toBe(true)
    })

    it('appends empty data', () => {
      const data = [
        { value: 'a', label: 'A' },
      ]
      const select = mount(<UnwrappedDataSelect data={data} onChange={() => {}} />)
      expect(select).toMatchSnapshot()
      expect(select.find('Select').props().data[0]).toMatchObject({ value: '', label: '' })
    })

    it('updates when data changes', () => {
      const props = {
        data: [
          { value: 'a', label: 'A' },
        ],
        value: '',
        loading: false,
        validationError: null,
      }

      const select = shallow(<UnwrappedDataSelect {...props} onChange={() => {}} />)
      // same props, should not update
      expect(select.instance().shouldComponentUpdate(props)).toBe(false)

      const newData = [
        { value: 'b', label: 'B' },
      ]
      const newProps = Object.assign({}, props, { data: newData })
      // new data, should always update
      expect(select.instance().shouldComponentUpdate(newProps)).toBe(true)
    })
  })
})
