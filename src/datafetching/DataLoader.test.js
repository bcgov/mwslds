import React from 'react'

import { configure, mount } from 'enzyme'
import { createSerializer } from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'

import cache from '../cache/SimpleCache'

import withData from './DataLoader'
import { BASE_URL } from './Routes'

configure({ adapter: new Adapter() })
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))

function Component() {
  return <div />
}

const mockResponse = (status, statusText, response) => (
  new Response(JSON.stringify(response), {
    status,
    statusText,
    headers: new Headers({
      'Content-type': 'application/json',
    }),
  })
)

function mockFetchSuccess(data) {
  return jest.fn().mockImplementation(() => (
    Promise.resolve(mockResponse(200, 'OK', data))
  ))
}

function mockFetchFailure(data) {
  return jest.fn().mockImplementation(() => (
    Promise.reject(mockResponse(500, 'NOPE', data))
  ))
}

describe('withData', () => {
  it('fetches data', () => {
    const mockedFetch = mockFetchSuccess({ feelsLikeImWearing: 'nothin at all' })
    global.fetch = mockedFetch

    const token = 'x'
    const route = 'whatever'

    const Wrapped = withData(Component, null)
    mount(<Wrapped token={token} route={route} />)

    expect(mockedFetch).toBeCalled()
    const args = mockedFetch.mock.calls[0]
    expect(args[0]).toEqual(`${BASE_URL}/whatever`)
    expect(args[1].headers.get('Authorization')).toEqual(`Bearer ${token}`)
  })

  it('doesnt fetch without a token', () => {
    const mockedFetch = mockFetchSuccess({})
    global.fetch = mockedFetch

    const Wrapped = withData(Component, null)
    mount(<Wrapped route="whatever" />)

    expect(mockedFetch).not.toBeCalled()
  })

  it('fetches data when token changes', () => {
    const mockedFetch = mockFetchSuccess({})
    global.fetch = mockedFetch

    const token = 'x'

    const Wrapped = withData(Component, null)
    const mounted = mount(<Wrapped route="whatever" />)

    expect(mockedFetch).not.toBeCalled()

    mounted.setProps({ token })
    expect(mockedFetch).toBeCalled()
  })

  it('parses returned data properly', () => {
    const data = { feelsLikeImWearing: 'nothin at all' }
    const mockedFetch = mockFetchSuccess(data)
    global.fetch = mockedFetch

    const token = 'x'
    const route = 'whatever'

    const Wrapped = withData(Component, null)
    const rendered = mount(<Wrapped token={token} route={route} />)

    return rendered.instance().loadData().then((returned) => {
      expect(returned).toEqual(data)
    })
  })

  it('sets loading properly', () => {
    let resolveMe
    const mockedFetch = jest.fn().mockImplementation(() => (
      new Promise((resolve) => {
        resolveMe = resolve
      })
    ))
    global.fetch = mockedFetch

    const token = 'x'
    const route = 'whatever'

    const Wrapped = withData(Component, null)
    const rendered = mount(<Wrapped token={token} route={route} />)

    expect(rendered.instance().state.loading).toBe(true)
    resolveMe(mockResponse(200, 'OK', {}))
  })

  it('sets error properly', () => {
    const mockedFetch = mockFetchFailure({})
    global.fetch = mockedFetch

    const token = 'x'
    const route = 'whatever'

    const Wrapped = withData(Component, null)
    const rendered = mount(<Wrapped token={token} route={route} />)

    return rendered.instance().loadData().then((error) => {
      expect(error.status).toEqual(500)
    })
  })

  it('puts data in the cache', () => {
    const data = { feelsLikeImWearing: 'nothin at all' }
    const mockedFetch = mockFetchSuccess(data)
    global.fetch = mockedFetch

    const token = 'x'
    const route = 'whatever'

    const Wrapped = withData(Component, cache)
    const rendered = mount(<Wrapped token={token} route={route} />)

    return rendered.instance().loadData().then(() => {
      expect(mockedFetch).toBeCalled()
      expect(cache.get(`${BASE_URL}/${route}`)).toEqual(data)
    })
  })

  it('doesnt fetch when already in the cache', () => {
    const data = { feelsLikeImWearing: 'nothin at all' }
    const mockedFetch = mockFetchFailure({})
    global.fetch = mockedFetch

    const token = 'x'
    const route = 'differentRoute'

    cache.put(`${BASE_URL}/${route}`, data)

    const Wrapped = withData(Component, cache)
    const rendered = mount(<Wrapped token={token} route={route} />)
    expect(mockedFetch).not.toBeCalled()

    return rendered.instance().loadData().then((returned) => {
      expect(returned).toEqual(data)
    })
  })

  it('updates data correctly', () => {
    const data = { feelsLikeImWearing: 'nothin at all' }

    const route = 'anotherDifferentRoute'

    const Wrapped = withData(Component, cache)
    const rendered = mount(<Wrapped route={route} />)

    rendered.instance().updateData(data)
    rendered.update()

    expect(rendered.instance().state.data).toEqual(data)
    expect(cache.get(`${BASE_URL}/${route}`)).toEqual(data)
  })

  it('updates data with custom update function correctly', () => {
    const data = { feelsLikeImWearing: 'nothin at all' }

    const route = 'anotherDifferentRoute'

    const Wrapped = withData(Component, null)
    const rendered = mount(<Wrapped route={route} updateDataTransform={() => data} />)

    rendered.instance().updateData({})
    rendered.update()

    expect(rendered.instance().state.data).toEqual(data)
  })
})
