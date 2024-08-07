import '@testing-library/jest-dom'
import nodeCrypto from 'crypto'

// @ts-ignore
global.crypto = {
  getRandomValues: function (buffer: any) {
    return nodeCrypto.randomFillSync(buffer)
  },
}

// Jest environment not contains DataTransfer object, so mock a DataTransfer class
// @ts-ignore
global.DataTransfer = class DataTransfer {
  clearData() { }
  getData(type: string) {
    if (type === 'text/plain') return ''
    return []
  }
  setData() { }
  get files() {
    return [new File(['124'], 'test.jpg')]
  }
}


global.ResizeObserver = class ResizeObserver {
  constructor(callback) {
    // @ts-ignore
    this.callback = callback;
  }
  observe() {
    // 可以根据需要添加具体实现
  }
  unobserve() {
    // 可以根据需要添加具体实现
  }
  disconnect() {
    // 可以根据需要添加具体实现
  }
}