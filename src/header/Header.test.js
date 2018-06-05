import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import { createSerializer } from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import Header from './Header'

configure({ adapter: new Adapter() })
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))

describe('Header', () => {
  it('renders', () => {
    const header = shallow(<Header title="headerless horseman" />)
    expect(header).toMatchSnapshot()
  })

  it('renders links correctly', () => {
    const header = mount((
      <Header>
        <a href="">earth</a>
        <a href="">sun</a>
        <a href="">moon</a>
        <a href="">mars</a>
      </Header>
    ))
    expect(header).toMatchSnapshot()
  })
})
