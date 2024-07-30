import { IDomEditor } from '../../../packages/editor/src'
import UploadImageMenu from '../src/module/menu/UploadImageMenu'
import createEditor from '../../../tests/utils/create-editor'
import uploadImages from '../src/module/upload-images'

let editor: IDomEditor
let menu: UploadImageMenu

jest.mock('../src/module/upload-images', () => jest.fn())

describe('Upload image menu', () => {
  beforeEach(() => {
    editor = createEditor()
    menu = new UploadImageMenu()
  })

  test('UploadImageMenu instance title is "上传图片" for zhCn locale config', () => {
    expect(menu.title).toBe('上传图片')
  })

  test('UploadImageMenu invoke getValue return ""', () => {
    expect(menu.getValue(editor)).toBe('')
  })

  test('UploadImageMenu invoke isActive always return false', () => {
    expect(menu.isActive(editor)).toBe(false)
  })

  test('UploadImageMenu invoke isDisabled return true', () => {
    expect(menu.isDisabled(editor)).toBe(true)
  })

  test('UploadImageMenu invoke exec should exec customBrowseAndUpload if config has customBrowseAndUpload option', () => {
    const jestFn = jest.fn()
    const editor = createEditor({
      config: {
        MENU_CONF: {
          uploadImage: {
            customBrowseAndUpload: jestFn,
          },
        },
      },
    })
    menu.exec(editor, 'test.jpg')
    expect(jestFn).toBeCalled()
  })

  test('UploadImageMenu invoke exec should insert hidden input element to body', () => {
    const editor = createEditor({
      config: {
        MENU_CONF: {
          uploadImage: {
            allowedFileTypes: ['jpg', 'png'],
          },
        },
      },
    })

    // 防卫断言
    expect(document.querySelector('input')).toBeNull()

    menu.exec(editor, 'test.jpg')

    const inputFile = document.querySelector('input[type="file"]') as HTMLInputElement

    expect(inputFile instanceof HTMLInputElement).toBeTruthy()
    // 模拟文件选择并触发 change 事件
    const files = [new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' })]
    const fileInputEvent = new Event('change', { bubbles: true })

    // 将 files 设置到 input 的 files 属性中
    Object.defineProperty(inputFile, 'files', { value: files })

    // 触发 change 事件
    inputFile.dispatchEvent(fileInputEvent)

    // 检查 uploadImages 是否被调用
    expect(uploadImages).toHaveBeenCalled()
  })
})
