import { WebsocketProvider } from 'y-websocket'
import { withYHistory, withYjs, YjsEditor } from '@wangeditor-next/yjs'
import React, { useEffect, useState } from 'react'
import { Descendant } from 'slate'
import * as Y from 'yjs'

import '@wangeditor-next/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor-next/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor-next/editor'
import { Boot } from '@wangeditor-next/editor'

const yDoc = new Y.Doc()
const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my-roomname', yDoc)

wsProvider.on('status', event => {
  console.log(event.status)
})

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }],
  },
]

export const SimplePage = () => {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [html, setHtml] = useState('hello')

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
  }
  const sharedType = yDoc.get('content', Y.XmlText)
  // @ts-ignore
  Boot.registerPlugin(withYjs(sharedType))
  // Boot.registerPlugin(withYHistory())

  useEffect(() => {
    if (editor) {
      YjsEditor.connect(editor)
    }
    return () => {
      if (editor && Object.prototype.hasOwnProperty.call(editor, 'diisconnect')) {
        YjsEditor.disconnect(editor)
      }
    }
  }, [editor])

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      setTimeout(() => {
        editor.destroy() // 组件销毁时，及时销毁编辑器
      }, 300)
      setEditor(null)
    }
  }, [editor])

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          defaultContent={initialValue}
          onCreated={setEditor}
          onChange={editor => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden' }}
        />
      </div>
      <div style={{ marginTop: '15px' }}>{html}</div>
    </>
  )
}

export default SimplePage
