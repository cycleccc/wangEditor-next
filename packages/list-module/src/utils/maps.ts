/**
 * @description maps
 * @author wangfupeng
 */

import { IDomEditor } from '@wangeditor-next/core'
import { Element as SlateElement } from 'slate'

export const ELEM_TO_EDITOR = new WeakMap<SlateElement, IDomEditor>()
