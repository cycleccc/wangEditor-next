/**
 * @description Processing blob url
 * @author CodePencil
 */

/** 提取 blob URL */
export function extractBlobUrlFromImg(html: string) {
  const regex = /<img[^>]*src=["'](blob:[^"']+)["'][^>]*>/i
  const match = html.match(regex)

  return match ? match[1] : null
}

/** 将 blob URL 转换为 base64 */
export async function convertBlobUrlToBase64(blobUrl: string) {
  try {
    const response = await fetch(blobUrl)

    if (!response.ok) {
      throw new Error('Failed to fetch blob URL')
    }

    const blob = await response.blob()

    return new Promise<string | null>((resolve, reject) => {
      const reader = new FileReader()

      reader.onloadend = () => {
        resolve(reader.result as string)
      }

      reader.onerror = () => {
        reject(new Error('Failed to read blob as data URL'))
      }

      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.error(error)
    return null
  }
}
