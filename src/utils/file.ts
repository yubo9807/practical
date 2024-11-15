/**
 * File 转 base64
 * @param {*} file 
 * @returns 
 */
export function fileToBase64(file: File): Promise<string> {
  const render = new FileReader();
  return new Promise((resovle, reject) => {
    render.readAsDataURL(file);
    render.addEventListener('load', e => {
      resovle(e.target.result as string);
    })
  })
}

/**
 * base64 转 File
 * @param {*} base64 
 * @param {*} fileName 
 * @param {*} fileType 
 * @returns 
 */
export function base64toFile(base64: string, fileName = 'filename', fileType = 'image/jpg'): File {
  var arr = base64.split(','),
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: fileType });
}


type ImageCompressOption = {
  ratio?: number
  sizeLimit?: {      // 大小限制，取最长边
    width:  number
    height: number
  },
}

/**
 * 图片压缩
 * @param base64 
 * @param option 
 * @returns 
 */
export async function imageCompress(base64: string, option: ImageCompressOption = {}): Promise<string> {
  const format = base64.match(/image\/.+;/)[0].slice(6, -1).toLocaleLowerCase();
  option = Object.assign({
    ratio: .8,    // 压缩比例
    sizeLimit: {  // 大小限制
      width:  800,
      height: 800,
    },
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

      return resovle(minBase64);

    })
  })
}
