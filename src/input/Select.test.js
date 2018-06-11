import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import { createSerializer } from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import Select from './Select'

configure({ adapter: new Adapter() })
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))

describe('Select', () => {
  it('renders', () => {
    const select = mount(<Select name="selectceptional" onChange={() => {}} />)
    expect(select).toMatchSnapshot()
  })

  it('has the correct title', () => {
    const select = shallow(<Select name="selectceptional" title="not selectceptional" onChange={() => {}} />)
    expect(select).toMatchSnapshot()
  })

  it('has the correct width', () => {
    const wide = shallow(<Select name="selectceptional" width="100%" onChange={() => {}} />)
    expect(wide).toMatchSnapshot()

    const lesswide = shallow(<Select name="selectceptional" width="50%" onChange={() => {}} />)
    expect(lesswide).toMatchSnapshot()
  })

  it('renders options', () => {
    const opts = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
      { value: 'c', label: 'C' },
    ]
    const select = mount(<Select name="selectceptional" data={opts} onChange={() => {}} />)
    expect(select).toMatchSnapshot()
  })

  it('displays the correct values', () => {
    const opts = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
      { value: 'c', label: 'C' },
    ]
    const selected = 'a'
    const select = mount(<Select name="selectceptional" data={opts} value={selected} onChange={() => {}} />)
    expect(select).toMatchSnapshot()
    expect(select.find('VirtualizedSelect').props().value).toBe(selected)
  })

  it('returns value for change events', () => {
    const select = shallow(<Select name="selectceptional" value="whatever" onChange={val => val} />)
    const input = select.find('VirtualizedSelect')
    expect(input.props().onChange({ value: 'hi' })).toBe('hi')
    expect(input.props().onChange(null)).toBe('')
  })

  it('is disabled properly', () => {
    const disabled = shallow(<Select name="selectceptional" disabled onChange={() => {}} />)
    expect(disabled.find('VirtualizedSelect').props().disabled).toBe(true)

    const readOnly = shallow(<Select name="selectceptional" readOnly onChange={() => {}} />)
    expect(readOnly.find('VirtualizedSelect').props().disabled).toBe(true)
  })

  it('shows errors properly', () => {
    const error = mount(<Select name="selectceptional" validationError="whatever" onChange={() => {}} />)
    expect(error).toMatchSnapshot()
  })
})
