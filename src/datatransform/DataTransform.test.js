import React from 'react'

import { configure, mount } from 'enzyme'
import { createSerializer } from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import withDataTransform from './DataTransform'

configure({ adapter: new Adapter() })
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))

function Component() {
  return <div />
}

describe('withDataTransform', () => {
  it('transforms data', () => {
    const colours = ['red', 'purple', 'green', 'orange', 'yellow']
    const skittles = { skittles: colours }

    const transform = data => data.skittles

    const Wrapped = withDataTransform(Component)
    const rendered = mount(<Wrapped data={skittles} transform={transform} />)

    expect(rendered.find('Component').props().data).toEqual(colours)
  })
})
