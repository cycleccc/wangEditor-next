export class Point {
  public x: number

  public y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  public static valueOf(x: number, y: number): Point {
    return new this(x, y)
  }

  public static equals(point: Point, another: Point): boolean {
    return point.x === another.x && point.y === another.y
  }
}
