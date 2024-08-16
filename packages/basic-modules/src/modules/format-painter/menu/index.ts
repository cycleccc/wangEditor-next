/**
 * @description menu entry
 * @author CodePencil
 */

import FormatPainter from './FormatPainter'

export const formatPainterConf = {
  key: 'formatPainter',
  factory() {
    return new FormatPainter()
  },
}
