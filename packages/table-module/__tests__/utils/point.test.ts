import { Point } from '../../src/utils/point'

describe('Point', () => {
  test('should create a point with given x and y', () => {
    const point = new Point(1, 2)

    expect(point.x).toBe(1)
    expect(point.y).toBe(2)
  })

  test('should create a point using valueOf', () => {
    const point = Point.valueOf(3, 4)

    expect(point.x).toBe(3)
    expect(point.y).toBe(4)
  })

  test('should return true for equal points', () => {
    const point1 = new Point(5, 6)
    const point2 = new Point(5, 6)

    expect(Point.equals(point1, point2)).toBe(true)
  })

  test('should return false for different points', () => {
    const point1 = new Point(7, 8)
    const point2 = new Point(9, 10)

    expect(Point.equals(point1, point2)).toBe(false)
  })
})
