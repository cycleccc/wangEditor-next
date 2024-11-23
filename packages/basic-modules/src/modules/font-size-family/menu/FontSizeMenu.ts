/**
 * @description font-size menu
 * @author wangfupeng
 */

import { IDomEditor, IOption, t } from '@wangeditor-next/core'

import { FONT_SIZE_SVG } from '../../../constants/icon-svg'
import BaseMenu from './BaseMenu'

class FontSizeMenu extends BaseMenu {
  readonly title = t('fontSize.title')

  readonly iconSvg = FONT_SIZE_SVG

  readonly mark = 'fontSize'

  getOptions(editor: IDomEditor): IOption[] {
    const options: IOption[] = []

    // 获取配置，参考 './config.ts'
    const { fontSizeList = [] } = editor.getMenuConfig(this.mark)

    // 生成 options
    options.push({
      text: t('fontSize.default'),
      value: '', // this.getValue(editor) 未找到结果时，会返回 '' ，正好对应到这里
    })
    fontSizeList.forEach((size: string | { name: string; value: string }) => {
      if (typeof size === 'string') {
        options.push({
          text: size,
          value: size,
        })
      } else if (typeof size === 'object') {
        const { name, value } = size

        options.push({
          text: name,
          value,
        })
      }
    })

    // 设置 selected
    const curValue = this.getValue(editor)
    let flag = false

    options.forEach(opt => {
      if (opt.value === curValue) {
        flag = true
        opt.selected = true
      } else {
        opt.selected = undefined
      }
    })
    // @ts-ignore
    if (!flag && typeof curValue === 'string') {
      options.push({
        text: curValue,
        value: curValue,
        selected: true,
      })
    }

    return options
  }
}

export default FontSizeMenu
