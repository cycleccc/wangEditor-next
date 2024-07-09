import { Editor, Node, Span } from 'slate'
import { WithTableOptions } from './options'
import { isOfType } from './is-of-type'

/**
 * Determines whether two paths belong to the same types by checking
 * if they share a common ancestor node of type table
 */
export function hasCommon(
  editor: Editor,
  [path, another]: Span,
  ...types: Array<keyof WithTableOptions['blocks']>
) {
  const [node, commonPath] = Node.common(editor, path, another)

  if (isOfType(editor, ...types)(node, commonPath)) {
    return true
  }

  // Warning: returns the common ancestor but will return `undefined` if the
  // `commonPath` is equal to the specified types path
  return !!Editor.above(editor, {
    match: isOfType(editor, ...types),
    at: commonPath,
  })
}
