import uploadImages from '../src/module/upload-images'
import createEditor from '../../../tests/utils/create-editor'
import * as core from '@wangeditor-next/core'

function mockFile(filename: string) {
  const file = new File(['123'], filename)
  return file
}

describe('Upload image menu upload files util', () => {
  test('uploadImages should do nothing if give null value to fileList argument', async () => {
    const editor = createEditor()
    const res = await uploadImages(editor, null)
    expect(res).toBeUndefined()
  })

  test('uploadImages should invoke customUpload if give customUpload to config', async () => {
    const fn = vi.fn()
    const editor = createEditor({
      config: {
        MENU_CONF: {
          uploadImage: {
            customUpload: fn,
          },
        },
      },
    })

    await uploadImages(editor, [mockFile('test.jpg')] as unknown as FileList)

    expect(fn).toBeCalled()
  })

  test('uploadImages should insert image with base64 string if file size less than base64LimitSize config', async () => {
    const fn = vi.fn()
    const editor = createEditor({
      config: {
        MENU_CONF: {
          uploadImage: {
            customUpload: fn,
            base64LimitSize: 10,
          },
        },
      },
    })

    const mockReadAsDataURL = vi.spyOn(FileReader.prototype, 'readAsDataURL')

    await uploadImages(editor, [mockFile('test.jpg')] as unknown as FileList)

    expect(mockReadAsDataURL).toBeCalled()
  })

  test('uploadImages should invoke core createUploader if not give customUpload to config', async () => {
    const fn = vi.fn().mockImplementation(
      () =>
        // 这里需要返回一个 duck 类型的 uppy 对象，防止后面代码执行报错
        ({
          addFile: vi.fn(),
          upload: vi.fn(),
        }) as any
    )
    const editor = createEditor()

    vi.spyOn(core, 'createUploader').mockImplementation(fn)

    await uploadImages(editor, [mockFile('test.jpg')] as unknown as FileList)

    expect(fn).toBeCalled()
  })
})
