/**
 * @description float-image element
 * @author cycleccc
 */

// 【注意】需要把自定义的 Element 引入到最外层的 custom-types.d.ts
type EmptyText = {
  text: ''
}

export type ImageStyle = {
  width?: string
  height?: string
  float?: string
}

// wangEditor 内部的 image elem
export type ImageElement = {
  type: 'image'
  src: string
  alt?: string
  href?: string
  width?: string
  height?: string
  style?: ImageStyle
  children: EmptyText[]
}
