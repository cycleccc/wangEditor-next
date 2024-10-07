import '@testing-library/jest-dom'

import nodeCrypto from 'crypto'

import { DataTransfer } from './DataTransfer'
import { ResizeObserver } from './ResizeObserver'

// @ts-ignore
global.crypto = {
  getRandomValues(buffer: any) {
    return nodeCrypto.randomFillSync(buffer)
  },
}
jest.mock('nanoid', () => ({
  nanoid: () => { Math.random() },
}))

jest.spyOn(global.console, 'warn').mockImplementation(() => jest.fn())
jest.spyOn(global.console, 'error').mockImplementation(() => jest.fn())

// Jest environment not contains DataTransfer object, so mock a DataTransfer class
// @ts-ignore
global.DataTransfer = DataTransfer

global.ResizeObserver = ResizeObserver
