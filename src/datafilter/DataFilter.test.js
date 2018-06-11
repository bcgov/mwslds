import React from 'react'

import { configure, mount } from 'enzyme'
import { createSerializer } from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import withDataFilter from './DataFilter'

configure({ adapter: new Adapter() })
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))

function Component() {
  return <div />
}

describe('withDataFilter', () => {
  it('filters data', () => {
    const skittles = {
      skittles: [
        { taste: 'amazing', colour: 'red' },
        { taste: 'ok', colour: 'purple' },
        { taste: 'could be better', colour: 'green' },
        { taste: 'ok', colour: 'orange' },
        { taste: 'could be better', colour: 'yellow' },
      ],
    }

    const okSkittles = {
      skittles: [
        { taste: 'ok', colour: 'purple' },
        { taste: 'ok', colour: 'orange' },
      ],
    }

    const preFilter = data => data.skittles
    const filter = { taste: 'ok' }
    const postFilter = rows => ({ skittles: rows })

    const Wrapped = withDataFilter(Component)
    const rendered = mount(<Wrapped
      data={skittles}
      preFilter={preFilter}
      filter={filter}
      postFilter={postFilter}
    />)

    expect(rendered.find('Component').props().data).toEqual(okSkittles)
  })
})
