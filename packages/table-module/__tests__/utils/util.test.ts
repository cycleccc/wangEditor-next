import { genRandomStr } from '../../src/utils/util'

describe('genRandomStr', () => {
  it('should generate a random string with default prefix', () => {
    const result = genRandomStr()

    expect(result).toMatch(/^r-/)
  })

  it('should generate a random string with specified prefix', () => {
    const prefix = 'test'
    const result = genRandomStr(prefix)

    expect(result).toMatch(/^test-/)
  })

  it('should generate unique strings', () => {
    const result1 = genRandomStr()
    const result2 = genRandomStr()

    expect(result1).not.toBe(result2)
  })
})
