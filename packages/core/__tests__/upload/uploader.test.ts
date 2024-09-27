/**
 * @description uploader test
 * @author wangfupeng
 */

import createUploader from '../../src/upload/createUploader'
import { IUploadConfig } from '../../src/upload/interface'
import nock from 'nock'

const server = 'https://fake-endpoint.wangeditor-v5.com'

describe('uploader', () => {
  test('if should return Uppy object if invoke createUploader function', () => {
    const uppy = createUploader({
      server: '/upload',
      fieldName: 'file1',
      metaWithUrl: true,
      meta: {
        token: 'xxx',
      },
      onSuccess: (file, res) => {},
      onFailed: (file, res) => {},
      onError: (file, err, res) => {},
    })
    expect(uppy).not.toBeNull()
  })

  test('it should throw can not get address error if not pass server option', () => {
    try {
      createUploader({
        fieldName: 'file1',
        metaWithUrl: false,
        onSuccess: (file, res) => {},
        onFailed: (file, res) => {},
        onError: (file, err, res) => {},
      } as IUploadConfig)
    } catch (err: unknown) {
      expect((err as Error).message).toBe('Cannot get upload server address\n没有配置上传地址')
    }
  })

  test('it should throw can not get fileName error if not pass fileName option', () => {
    try {
      createUploader({
        server: '/upload',
        metaWithUrl: false,
        onSuccess: (file, res) => {},
        onFailed: (file, res) => {},
        onError: (file, err, res) => {},
      } as IUploadConfig)
    } catch (err: unknown) {
      expect((err as Error).message).toBe('Cannot get fieldName\n没有配置 fieldName')
    }
  })

  test('it should invoke success callback if file be uploaded successfully', () => {
    nock(server)
      .defaultReplyHeaders({
        'access-control-allow-method': 'POST',
        'access-control-allow-origin': '*',
      })
      .options('/')
      .reply(200, {})
      .post('/')
      .reply(200, {})

    const fn = vi.fn()
    const uppy = createUploader({
      server,
      fieldName: 'file1',
      metaWithUrl: false,
      onSuccess: fn,
      onFailed: (file, res) => {},
      onError: (file, err, res) => {},
    })

    // reference https://github.com/transloadit/uppy/blob/main/packages/%40uppy/xhr-upload/src/index.test.js
    uppy.addFile({
      source: 'vi',
      name: 'foo.jpg',
      type: 'image/jpeg',
      data: new Blob([Buffer.alloc(8192)]),
    })

    return uppy.upload().then(() => {
      expect(fn).toBeCalled()
    })
  })

  test('it should invoke error callback if file be uploaded error', () => {
    nock(server)
      .defaultReplyHeaders({
        'access-control-allow-method': 'POST',
        'access-control-allow-origin': '*',
      })
      .options('/')
      .reply(200, {})
      .post('/')
      .reply(200, {})

    const fn = vi.fn()
    console.error = fn

    let uppy = createUploader({
      server,
      fieldName: 'file1',
      metaWithUrl: false,
      onSuccess: () => {
        throw new Error('test onSuccess error')
      },
      onFailed: (file, res) => {},
      onError: (file, err, res) => {},
    })

    // reference https://github.com/transloadit/uppy/blob/main/packages/%40uppy/xhr-upload/src/index.test.js
    uppy.addFile({
      source: 'vi',
      name: 'foo.jpg',
      type: 'image/jpeg',
      data: new Blob([Buffer.alloc(8192)]),
    })

    return uppy.upload().catch(err => {
      expect(fn).toBeCalled()
    })
  })

  test('it should invoke onProgress callback if file be uploaded successfully', () => {
    nock(server)
      .defaultReplyHeaders({
        'access-control-allow-method': 'POST',
        'access-control-allow-origin': '*',
      })
      .options('/')
      .reply(200, {})
      .post('/')
      .reply(200, {})

    const fn = vi.fn()
    const uppy = createUploader({
      server,
      fieldName: 'file1',
      metaWithUrl: false,
      onSuccess: () => {},
      onProgress: fn,
      onFailed: (file, res) => {},
      onError: (file, err, res) => {},
    })

    // reference https://github.com/transloadit/uppy/blob/main/packages/%40uppy/xhr-upload/src/index.test.js
    uppy.addFile({
      source: 'vi',
      name: 'foo.jpg',
      type: 'image/jpeg',
      data: new Blob([Buffer.alloc(8192)]),
    })

    return uppy.upload().then(() => {
      expect(fn).toBeCalled()
    })
  })

  test('it should invoke error callback if file be uploaded failed', () => {
    nock(server)
      .defaultReplyHeaders({
        'access-control-allow-method': 'POST',
        'access-control-allow-origin': '*',
      })
      .options('/')
      .reply(200, {})
      .post('/')
      .reply(400, {})

    const fn = vi.fn()
    const uppy = createUploader({
      server,
      fieldName: 'file1',
      metaWithUrl: false,
      onSuccess: () => {},
      onFailed: (file, res) => {},
      onError: fn,
    })

    // reference https://github.com/transloadit/uppy/blob/main/packages/%40uppy/xhr-upload/src/index.test.js
    uppy.addFile({
      source: 'vi',
      name: 'foo.jpg',
      type: 'image/jpeg',
      data: new Blob([Buffer.alloc(8192)]),
    })

    return uppy.upload().catch(() => {
      expect(fn).toBeCalled()
    })
  })

  test('it should invoke console.error method if file be uploaded failed and not pass onError option', () => {
    nock(server)
      .defaultReplyHeaders({
        'access-control-allow-method': 'POST',
        'access-control-allow-origin': '*',
      })
      .options('/')
      .reply(200, {})
      .post('/')
      .reply(400, {})

    const fn = vi.fn()
    console.error = fn
    const uppy = createUploader({
      server,
      fieldName: 'file1',
      metaWithUrl: false,
      onSuccess: () => {},
      onFailed: (file, res) => {},
    } as any)

    // reference https://github.com/transloadit/uppy/blob/main/packages/%40uppy/xhr-upload/src/index.test.js
    uppy.addFile({
      source: 'vi',
      name: 'foo.jpg',
      type: 'image/jpeg',
      data: new Blob([Buffer.alloc(8192)]),
    })

    return uppy.upload().catch(() => {
      expect(fn).toBeCalled()
    })
  })

  test('it should invoke console.error method if file be uploaded failed and pass onError option throw error', () => {
    nock(server)
      .defaultReplyHeaders({
        'access-control-allow-method': 'POST',
        'access-control-allow-origin': '*',
      })
      .options('/')
      .reply(200, {})
      .post('/')
      .reply(400, {})

    const fn = vi.fn()
    console.error = fn
    const uppy = createUploader({
      server,
      fieldName: 'file1',
      metaWithUrl: false,
      onSuccess: () => {},
      onFailed: (file, res) => {},
      onError: () => {
        throw new Error('test onError error')
      },
    } as any)

    // reference https://github.com/transloadit/uppy/blob/main/packages/%40uppy/xhr-upload/src/index.test.js
    uppy.addFile({
      source: 'vi',
      name: 'foo.jpg',
      type: 'image/jpeg',
      data: new Blob([Buffer.alloc(8192)]),
    })

    return uppy.upload().catch(err => {
      expect(fn).toBeCalled()
    })
  })

  test('it should invoke error callback if file size over max size', () => {
    const fn = vi.fn()
    const consoleFn = vi.fn()
    console.error = consoleFn
    let uppy = createUploader({
      server,
      fieldName: 'file1',
      metaWithUrl: false,
      onSuccess: () => {},
      onFailed: (file, res) => {},
      onError: fn,
      maxFileSize: 5,
    })

    try {
      uppy.addFile({
        source: 'vi',
        name: 'foo.jpg',
        type: 'image/jpeg',
        data: new Blob([Buffer.alloc(8192)]),
      })
    } catch (err) {
      expect(fn).toBeCalled()
    }

    uppy = createUploader({
      server,
      fieldName: 'file1',
      metaWithUrl: false,
      onSuccess: () => {},
      onFailed: (file, res) => {},
      onError: () => {
        throw new Error('test onError error')
      },
      maxFileSize: 5,
    })

    try {
      uppy.addFile({
        source: 'vi',
        name: 'foo.jpg',
        type: 'image/jpeg',
        data: new Blob([Buffer.alloc(8192)]),
      })
    } catch (err) {
      expect(consoleFn).toBeCalled()
    }
  })
})
