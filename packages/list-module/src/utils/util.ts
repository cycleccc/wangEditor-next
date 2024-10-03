import { Element as SlateElement, Text } from 'slate'

/**
 * 获取第一个 text-node 的颜色
 * @param elem elem
 */
export function getListItemColor(elem: SlateElement): string {
  const children = elem.children || []
  const length = children.length

  if (length === 0) { return '' }

  let firstTextNode

  for (let i = 0; i < length; i += 1) {
    if (firstTextNode) { break } // 已找到第一个 text-node ，则退出
    const child = children[i]

    if (Text.isText(child)) { firstTextNode = child }
  }

  if (firstTextNode == null) { return '' }
  return firstTextNode.color || ''
}
