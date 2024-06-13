/**
 * @description video element
 * @author wangfupeng
 */

//【注意】需要把自定义的 Element 引入到最外层的 custom-types.d.ts

type EmptyText = {
  text: ''
}

export type videoStyle = {
  width?: string
  height?: string
}

export type VideoElement = {
  type: 'video'
  src: string
  poster?: string
  width?: string
  height?: string
  style?: videoStyle
  children: EmptyText[]
}
