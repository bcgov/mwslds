import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import { createSerializer } from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import Footer from './Footer'

configure({ adapter: new Adapter() })
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))

describe('Footer', () => {
  it('renders', () => {
    const header = shallow(<Footer />)
    expect(header).toMatchSnapshot()
  })

  it('renders additional items correctly', () => {
    const items = [
      { name: 'far away', href: '/away' },
      { name: 'close to home', href: '/close' },
    ]
    const header = mount(<Footer items={items} />)
    expect(header).toMatchSnapshot()
  })
})
