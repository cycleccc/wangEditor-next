/**
 * @description full screen menu test
 * @author wangfupeng
 */

import { t } from '@wangeditor-next/core'

import createEditor from '../../../../tests/utils/create-editor'
import { CANCEL_FULL_SCREEN_SVG, FULL_SCREEN_SVG } from '../../src/constants/icon-svg'
import FullScreen from '../../src/modules/full-screen/menu/FullScreen'

describe('full screen menu', () => {
  const editor = createEditor()
  const menu = new FullScreen()

  it('get value', () => {
    expect(menu.getValue(editor)).toBe('')
  })

  it('is disabled', () => {
    expect(menu.isDisabled(editor)).toBeFalsy()
  })

  it('full screen menu', done => {
    menu.exec(editor, '') // 设置全屏
    expect(menu.isActive(editor)).toBeTruthy()

    menu.exec(editor, '') // 取消全屏（有延迟）
    setTimeout(() => {
      expect(menu.isActive(editor)).toBeFalsy()
      done()
    }, 500)
  })

  it('get title', () => {
    expect(menu.getTitle(editor)).toBe(t('fullScreen.cancelTitle'))
    menu.exec(editor, '')
    expect(menu.getTitle(editor)).toBe(t('fullScreen.title'))
  })

  it('get icon', done => {
    let svg = menu.getIcon(editor)

    expect(svg).toBe(FULL_SCREEN_SVG)
    menu.exec(editor, '')
    setTimeout(() => {
      svg = menu.getIcon(editor)
      expect(svg).toBe(CANCEL_FULL_SCREEN_SVG)
      done()
    }, 500)
  })
})
