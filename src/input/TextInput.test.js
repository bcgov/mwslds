import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import { createSerializer } from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import TextInput from './TextInput'

configure({ adapter: new Adapter() })
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))

describe('TextInput', () => {
  it('renders', () => {
    const text = shallow(<TextInput name="texty" onChange={() => {}} />)
    expect(text).toMatchSnapshot()
  })

  it('has the correct title', () => {
    const text = shallow(<TextInput name="texty" title="not texty" onChange={() => {}} />)
    expect(text).toMatchSnapshot()
  })

  it('has the correct width', () => {
    const wide = shallow(<TextInput name="texty" width="100%" onChange={() => {}} />)
    expect(wide).toMatchSnapshot()

    const lesswide = shallow(<TextInput name="texty" width="50%" onChange={() => {}} />)
    expect(lesswide).toMatchSnapshot()
  })

  it('displays the correct value', () => {
    const hello = mount(<TextInput name="texty" value="hello" onChange={() => {}} />)
    expect(hello).toMatchSnapshot()

    const empty = mount(<TextInput name="texty" value="" onChange={() => {}} />)
    expect(empty.find('input').props().value).toBe('')
  })

  it('returns value for change events', () => {
    const text = shallow(<TextInput name="texty" value="whatever" onChange={val => val} />)
    const input = text.find('input')
    expect(input.props().onChange({ target: { value: 'hi' } })).toBe('hi')
    expect(input.props().onChange({ target: { value: null } })).toBe(null)
  })

  it('is disabled properly', () => {
    const disabled = shallow(<TextInput name="texty" disabled onChange={() => {}} />)
    expect(disabled.find('input').props().disabled).toBe(true)
  })

  it('is readOnly properly', () => {
    const readOnly = shallow(<TextInput name="texty" readOnly onChange={() => {}} />)
    expect(readOnly.find('input').props().readOnly).toBe(true)
  })

  it('shows placeholder properly', () => {
    const nice = mount(<TextInput name="texty" placeholder="nice" onChange={() => {}} />)
    expect(nice).toMatchSnapshot()
    // checks like this are redundant but useful if the snapshot gets messed up
    expect(nice.find('input').props().placeholder).toBe('nice')
  })

  it('shows errors properly', () => {
    const error = mount(<TextInput name="texty" validationError="whatever" onChange={() => {}} />)
    expect(error).toMatchSnapshot()
    expect(error.find('.has-error').length).toBe(1)
  })
})
