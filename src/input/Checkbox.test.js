import React from 'react'
import { configure, shallow } from 'enzyme'
import { createSerializer } from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import Checkbox from './Checkbox'

configure({ adapter: new Adapter() })
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))

describe('Checkbox', () => {
  it('renders', () => {
    const checkbox = shallow(<Checkbox name="checkers" onChange={() => {}} />)
    expect(checkbox).toMatchSnapshot()
  })

  it('has the correct title', () => {
    const checkbox = shallow(<Checkbox name="checkers" title="not checkers" onChange={() => {}} />)
    expect(checkbox).toMatchSnapshot()
  })

  it('has the correct width', () => {
    const checkbox = shallow(<Checkbox name="checkers" width="100%" onChange={() => {}} />)
    expect(checkbox).toMatchSnapshot()
  })

  it('displays checked value', () => {
    const checked = shallow(<Checkbox name="checkers" value onChange={() => {}} />)
    expect(checked.find('input').props().checked).toBe(true)

    const unchecked = shallow(<Checkbox name="checkers" value={false} onChange={() => {}} />)
    expect(unchecked.find('input').props().checked).toBe(false)
  })

  it('returns checked value for change events', () => {
    const checkbox = shallow(<Checkbox name="checkers" value onChange={val => val} />)
    const input = checkbox.find('input')
    expect(input.props().onChange({ target: { checked: true } })).toBe(true)
    expect(input.props().onChange({ target: { checked: false } })).toBe(false)
  })

  it('is disabled properly', () => {
    const disabled = shallow(<Checkbox name="checkers" disabled onChange={() => {}} />)
    expect(disabled.find('input').props().disabled).toBe(true)

    const readOnly = shallow(<Checkbox name="checkers" readOnly onChange={() => {}} />)
    expect(readOnly.find('input').props().disabled).toBe(true)
  })
})
