/**
 * @description 注册自定义 elem
 * @author wangfupeng
 */

import './native-shim'

import katex from 'katex'

class WangEditorFormulaCard extends HTMLElement {
  private span: HTMLElement

  // 监听的 attr
  static get observedAttributes() {
    return ['data-value']
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    const document = shadow.ownerDocument

    // 将样式通过 link 标签引入
    const styleLink = document.createElement('link')

    styleLink.rel = 'stylesheet'
    styleLink.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css'
    styleLink.integrity = 'sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV'
    styleLink.crossOrigin = 'anonymous'
    shadow.appendChild(styleLink)

    const span = document.createElement('span')

    span.style.display = 'inline-block'
    shadow.appendChild(span)
    this.span = span
  }

  // connectedCallback() {
  //     // 当 custom element首次被插入文档DOM时，被调用
  //     console.log('connected')
  // }
  // disconnectedCallback() {
  //     // 当 custom element从文档DOM中删除时，被调用
  //     console.log('disconnected')
  // }
  // adoptedCallback() {
  //     // 当 custom element被移动到新的文档时，被调用
  //     console.log('adopted')
  // }
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name === 'data-value') {
      if (oldValue === newValue) { return }
      this.render(newValue || '')
    }
  }

  private render(value: string) {
    katex.render(value, this.span, {
      throwOnError: false,
    })
  }
}

if (!window.customElements.get('w-e-formula-card')) {
  window.customElements.define('w-e-formula-card', WangEditorFormulaCard)
}
