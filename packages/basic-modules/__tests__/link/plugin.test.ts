/**
 * @description link plugin test
 * @author wangfupeng
 */

import { Editor } from 'slate'
import withLink from '../../src/modules/link/plugin'
import createEditor from '../../../../tests/utils/create-editor'

// 模拟 DataTransfer
class MyDataTransfer {
  private values: object = {}
  setData(type: string, value: string) {
    this.values[type] = value
  }
  getData(type: string): string {
    return this.values[type]
  }
}

describe('link plugin', () => {
  const editor = withLink(createEditor())
  const startLocation = Editor.start(editor, [])

  it('link is inline elem', () => {
    const elem = { type: 'link', children: [] }
    expect(editor.isInline(elem)).toBeTruthy()
  })

  it('link insert data', done => {
    const url = 'https://www.wangeditor.com/'

    const data = new MyDataTransfer()
    data.setData('text/plain', url)

    editor.select(startLocation)
    // @ts-ignore
    editor.insertData(data)

    setTimeout(() => {
      const links = editor.getElemsByTypePrefix('link')
      expect(links.length).toBe(1)
      const linkElem = links[0] as any
      expect(linkElem.url).toBe(url)
      done()
    })
  })
  // it('should insert an image correctly when dragging and dropping an image', done => {
  //   const imgHtml = '<img src="https://www.wangeditor.com/img.jpg" />'

  //   const data = new MyDataTransfer()
  //   data.setData('text/html', imgHtml)

  //   editor.select(startLocation)
  //   // @ts-ignore
  //   editor.insertData(data)

  //   setTimeout(() => {
  //     const images = editor.getElemsByTypePrefix('image')
  //     expect(images.length).toBe(1)
  //     const imgElem = images[0] as any
  //     expect(imgElem.src).toBe('https://www.wangeditor.com/img.jpg')
  //     done()
  //   })
  // })

  it('should insert non-link data correctly', done => {
    const text = 'This is a test text.'

    const data = new MyDataTransfer()
    data.setData('text/plain', text)

    editor.select(startLocation)
    // @ts-ignore
    editor.insertData(data)

    setTimeout(() => {
      const content = Editor.string(editor, [])
      expect(content).toContain(text)
      done()
    })
  })
})
