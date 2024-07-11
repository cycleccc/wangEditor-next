import { Editor, Element, Node, NodeMatch } from 'slate'
import { WithType } from './types'
import { WithTableOptions, DEFAULT_WITH_TABLE_OPTIONS } from './options'

export function isElement<T extends Element>(node: Node): node is WithType<T> {
  return !Editor.isEditor(node) && Element.isElement(node) && 'type' in node
}

/** @returns a `NodeMatch` function which is used to match the elements of a specific `type`. */
export function isOfType<T extends WithType<Element>>(
  editor: Editor,
  ...types: Array<keyof WithTableOptions['blocks']>
): NodeMatch<T> {
  const options = DEFAULT_WITH_TABLE_OPTIONS,
    elementTypes = types.map(type => options?.blocks?.[type])

  return (node: Node): boolean => isElement(node) && elementTypes.includes(node.type as any)
}
