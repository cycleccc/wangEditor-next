export class DataTransfer {
  getData(type: string) {
    if (type === 'text/plain') { return '' }
    return []
  }

  get files() {
    return [new File(['124'], 'test.jpg')]
  }
}
