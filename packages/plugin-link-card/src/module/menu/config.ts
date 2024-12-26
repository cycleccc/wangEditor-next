/**
 * @description menu config
 * @author wangfupeng
 */

export function genConvertToLinkCardConfig() {
  return {
    /**
     * 异步获取 link-card 信息（可能需要在服务端获取）
     * @param linkText link text
     * @param linkUrl link url
     * @returns link-card info
     */
    async getLinkCardInfo(
      linkText: string,
      _linkUrl: string,
    ): Promise<{ title: string; iconImgSrc: string }> {
      // 该函数，用户自定义配置
      // 1. 使用 iframe 加载 linkUrl 来获取 title 和 iconImgSrc
      // 2. 但有些网页禁止跨域 iframe 加载（即 X-Frame-Options），此时需要在服务端获取

      return new Promise(resolve => {
        setTimeout(() => {
          const info = { title: linkText, iconImgSrc: '' }

          resolve(info)
        }, 100)
      })
    },
  }
}
