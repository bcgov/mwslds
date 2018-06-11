
import {
  payloadTransform,
  reduceObjectTransform,
  reduceObjectArrayTransform,
  selectTransform,
  tableTransform,
  minesCountTransform,
  minesUpdateTransform,
} from './Transforms'

describe('Transforms', () => {

  it('gets the payload', () => {
    const transformed = 'nice'
    const toTransform = { x: transformed }

    const transform = payloadTransform('x')
    expect(transform(null)).toBeNull()
    expect(transform(toTransform)).toEqual(transformed)
  })

  it('reduces an object', () => {
    const transformed = { yyz: 'rush' }
    const toTransform = { x: 1, yyz: 'rush' }

    const transform = reduceObjectTransform
    expect(transform(null)).toBeNull()
    expect(transform(toTransform, ['yyz'])).toEqual(transformed)
  })

  it('reduces an array of objects', () => {
    const transformed = [{ foo: 'bar' }, { foo: 'fighters' }]
    const toTransform = [{ foo: 'bar', a: 1 }, { foo: 'fighters', a: 1 }]

    const transform = reduceObjectArrayTransform
    expect(transform(null)).toBeNull()
    expect(transform(toTransform, ['foo'])).toEqual(transformed)
  })

  it('transforms data for a table', () => {
    const transformed = [{ dave: 'grohl' }, { dave: 'mustaine' }]
    const toTransform = { daves: [{ dave: 'grohl', a: 1 }, { dave: 'mustaine', a: 1 }] }

    const transform = tableTransform('daves', ['dave'])
    expect(transform(null)).toBeNull()
    expect(transform(toTransform)).toEqual(transformed)
  })

  it('transforms data for a select', () => {
    const transformed = [{ value: 1, label: 'grohl' }, { value: 2, label: 'mustaine' }]
    const toTransform = { daves: [{ dave: 'grohl', id: 1 }, { dave: 'mustaine', id: 2 }] }

    const transform = selectTransform('daves', 'id', 'dave')
    expect(transform(null)).toBeNull()
    expect(transform(toTransform)).toEqual(transformed)
  })

  it('counts mines', () => {
    const transformed = 2
    const toTransform = { mines: [{}, {}] }

    const transform = minesCountTransform
    expect(transform(null)).toBeNull()
    expect(transform(toTransform)).toEqual(transformed)
  })

  it('updates data', () => {
    const updated = { dave: 'spade', id: 2 }
    const transformed = { mines: [{ dave: 'grohl', id: 1 }, updated] }
    const toTransform = { mines: [{ dave: 'grohl', id: 1 }, { dave: 'mustaine', id: 2 }] }

    const transform = minesUpdateTransform
    expect(transform(toTransform, updated)).toEqual(transformed)
  })
})
