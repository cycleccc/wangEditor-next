/**
 * @description vdom utils fn
 * @author wangfupeng
 */

import { VNode } from 'snabbdom'

/**
 * 给 vnode 添加 className
 * @param vnode vnode
 * @param className css class
 */
export function addVnodeClassName(vnode: VNode, className: string) {
  if (vnode.data == null) { vnode.data = {} }
  const data = vnode.data

  if (data.props == null) { data.props = {} }

  Object.assign(data.props, { className })
}
