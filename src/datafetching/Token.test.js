import { TokenSingleton } from './Token'

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

describe('TokenSingleton', () => {
  it('uses existing token', () => {
    const token = 'x'
    const mockedFetch = mockFetchSuccess({ token })
    global.fetch = mockedFetch

    TokenSingleton.token = token

    return TokenSingleton.getToken().then((returned) => {
      expect(mockedFetch).not.toBeCalled()
      expect(returned).toBe(token)
    })
  })

  it('resolves pending promises when loading a token', () => {
    const token = 'x'
    const mockedFetch = mockFetchSuccess({ token })
    global.fetch = mockedFetch

    TokenSingleton.token = null

    const loaded = TokenSingleton.getToken().then((returned) => {
      expect(mockedFetch).toBeCalled()
      expect(returned).toBe(token)
    })

    TokenSingleton.auth = 'z'
    return Promise.all([
      loaded,
      TokenSingleton.loadToken(),
    ])
  })

  it('rejects pending promises when loading fails', () => {
    const mockedFetch = mockFetchFailure({})
    global.fetch = mockedFetch

    TokenSingleton.token = null
    TokenSingleton.auth = 'z'

    const loaded = TokenSingleton.getToken().catch((returned) => {
      expect(mockedFetch).toBeCalled()
      expect(returned.status).toBe(500)
    })

    return Promise.all([
      loaded,
      TokenSingleton.loadToken(),
    ])
  })

  it('rejects pending promises when no auth provided', () => {
    const mockedFetch = mockFetchFailure({})
    global.fetch = mockedFetch

    TokenSingleton.token = null
    TokenSingleton.auth = null

    const loaded = TokenSingleton.getToken().catch((returned) => {
      expect(returned.message).toBe('No Auth Provided')
    })

    return Promise.all([
      loaded,
      TokenSingleton.loadToken().catch(() => null),
    ])
  })
})
