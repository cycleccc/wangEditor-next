/**
 * @description editor video menu
 * @author
 */

import {
  DomEditor,
  genModalButtonElems,
  genModalInputElems,
  IDomEditor,
  IModalMenu,
  t,
} from '@wangeditor-next/core'
import { Node as SlateNode, Transforms } from 'slate'

import { PENCIL_SVG } from '../../constants/svg'
import $, { Dom7Array, DOMElement } from '../../utils/dom'
import { genRandomStr } from '../../utils/util'
import { VideoElement } from '../custom-types'

/**
 * 生成唯一的 DOM ID
 */
function genDomID(): string {
  return genRandomStr('w-e-edit-video')
}

class Editvideo implements IModalMenu {
  readonly title = t('videoModule.edit')

  readonly iconSvg = PENCIL_SVG

  readonly tag = 'button'

  readonly showModal = true // 点击 button 时显示 modal

  readonly modalWidth = 300

  private $content: Dom7Array | null = null

  private readonly srcInputId = genDomID()

  private readonly posterInputId = genDomID()

  private readonly buttonId = genDomID()

  private getSelectedVideoNode(editor: IDomEditor): SlateNode | null {
    return DomEditor.getSelectedNodeByType(editor, 'video')
  }

  getValue(_editor: IDomEditor): string | boolean {
    // 编辑视频，用不到 getValue
    return ''
  }

  isActive(_editor: IDomEditor): boolean {
    // 无需 active
    return false
  }

  exec(_editor: IDomEditor, _value: string | boolean) {
    // 点击菜单时，弹出 modal 之前，不需要执行其他代码
    // 此处空着即可
  }

  isDisabled(editor: IDomEditor): boolean {
    if (editor.selection == null) { return true }

    const videoNode = this.getSelectedVideoNode(editor)

    if (videoNode == null) {
      // 选区未处于 video node ，则禁用
      return true
    }
    return false
  }

  getModalPositionNode(editor: IDomEditor): SlateNode | null {
    return this.getSelectedVideoNode(editor)
  }

  getModalContentElem(editor: IDomEditor): DOMElement {
    const { srcInputId, posterInputId, buttonId } = this

    // 获取 input button elem
    const [srcContainerElem, inputSrcElem] = genModalInputElems(
      t('videoModule.videoSrc'),
      srcInputId,
      t('videoModule.videoSrcPlaceHolder'),
    )
    const [posterContainerElem, inputPosterElem] = genModalInputElems(
      t('videoModule.videoPoster'),
      posterInputId,
      t('videoModule.videoPosterPlaceHolder'),
    )
    const $inputSrc = $(inputSrcElem)
    const $inputPoster = $(inputPosterElem)
    const [buttonContainerElem] = genModalButtonElems(buttonId, t('videoModule.ok'))

    if (this.$content == null) {
      // 第一次渲染
      const $content = $('<div></div>')

      // 绑定事件（第一次渲染时绑定，不要重复绑定）
      $content.on('click', `#${buttonId}`, async e => {
        e.preventDefault()

        const src = $content.find(`#${srcInputId}`).val().trim()
        const poster = $content.find(`#${posterInputId}`).val().trim()
        // video 标签必须要加 key，只修改 src 不会触发重新渲染
        const videoId = genRandomStr('video-')

        const props: Partial<VideoElement> = {
          src,
          poster,
          key: videoId,
        }

        editor.restoreSelection()
        // 修改尺寸
        Transforms.setNodes(editor, props, {
          match: n => DomEditor.checkNodeType(n, 'video'),
        })
        editor.hidePanelOrModal() // 隐藏 modal
      })

      // 记录属性，重要
      this.$content = $content
    }

    const $content = this.$content

    $content.empty() // 先清空内容

    // append inputs and button
    $content.append(srcContainerElem)
    $content.append(posterContainerElem)
    $content.append(buttonContainerElem)

    const videoNode = this.getSelectedVideoNode(editor) as VideoElement

    if (videoNode == null) { return $content[0] }

    // 初始化 input 值
    const { src = '', poster = '' } = videoNode

    $inputSrc.val(src)
    $inputPoster.val(poster)

    // focus 一个 input（异步，此时 DOM 尚未渲染）
    setTimeout(() => {
      $inputSrc.focus()
    })

    return $content[0]
  }
}

export default Editvideo
