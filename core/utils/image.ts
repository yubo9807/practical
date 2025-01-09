import { execWorkerCode } from "./browser"

type ImageCompressOption = {
  ratio?:     number
  sizeLimit?: {
    width?:   number
    height?:  number
  }
  rigid?:     boolean
}

/**
 * 图片压缩
 * @param base64 
 * @param option 
 * @returns 
 */
export async function imageCompress(base64: string, option: ImageCompressOption = {}) {
  const format = base64.match(/image\/.+;/)[0].slice(6, -1).toLocaleLowerCase();
  option = Object.assign({
    ratio: .8,  // 压缩比例
    sizeLimit: {  // 大小限制
      width: 800,
      height: 800,
    },
    rigid: true,  // 是否进行硬性压缩
  }, option);

  const image = new Image();
  image.src = base64;

  return new Promise((resovle, reject) => {
    image.addEventListener('load', async e => {
      const { naturalWidth, naturalHeight } = image;
      let maxW = 0, maxH = 0;
      let radio = 0;
      const { sizeLimit } = option;

      if (sizeLimit) {
        maxW = sizeLimit.width;
        maxH = sizeLimit.height;

        // 宽比高长
        if (naturalWidth > naturalHeight) {
          if (naturalWidth > maxW) {  // 宽超出
            radio = naturalWidth / maxW;
            maxH = naturalHeight / radio;
          } else {
            radio = naturalHeight / maxH;
            maxW = naturalWidth / radio;
          }
        }

        // 高比宽长
        if (naturalHeight > naturalWidth) {
          if (naturalHeight > maxH) {  // 高超出
            radio = naturalHeight / maxH;
            maxW = naturalWidth / radio;
          } else {
            radio = naturalWidth / maxW;
            maxH = naturalHeight / radio;
          }
        }

        // 高 && 宽都未超出
        if (naturalWidth < maxW && naturalHeight < maxH) {
          maxW = naturalWidth;
          maxH = naturalHeight;
        }

      } else {
        maxW = naturalWidth;
        maxH = naturalHeight;
      }

      // 创建 canvas
      const canvas = document.createElement('canvas');
      canvas.width = maxW;
      canvas.height = maxH;
      canvas.style.visibility = 'hidden';
      document.body.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, maxW, maxH);
      ctx.drawImage(image, 0, 0, maxW, maxH);

      // 压缩
      const newBase64 = canvas.toDataURL(`image/${format}`, option.ratio);

      // 返回最小的 base64
      const minBase64 = base64.length > newBase64.length ? newBase64 : base64;
      canvas.remove();
      console.log(base64.length, newBase64.length)

      // png 属于无损压缩，所以只能在尺寸上做手脚
      // if (option.rigid && ['png', 'gif'].includes(format)) {
      //   const newBase642 = await imageRigidCompress(minBase64, option.ratio);
      //   console.log(newBase64.length, newBase642.length)
      //   return resovle(newBase642);
      // }

      return resovle(minBase64);

    })
  })
}

/**
 * 硬性压缩图片（缩小尺寸）
 * @param {*} base64 
 * @param {*} ratio 压缩比例
 * @returns 
 */
async function imageRigidCompress(base64: string, ratio: number) {
  const format = base64.match(/image\/.+;/)[0].slice(6, -1).toLocaleLowerCase();
  const image = new Image();
  image.src = base64;

  return new Promise((resovle, reject) => {
    image.addEventListener('load', () => {
      const { naturalWidth, naturalHeight } = image;
      const canvas = document.createElement('canvas');
      const width = naturalWidth * ratio;
      const height = naturalHeight * ratio;
      canvas.width = width;
      canvas.height = height;
      canvas.style.visibility = 'hidden';
      document.body.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(image, 0, 0, width, height);
      const newBase64 = canvas.toDataURL(`image/${format}`);

      return resovle(newBase64);
    })
  })
}
