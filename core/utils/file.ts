import { execWorkerCode } from "./browser";

/**
 * 文件转url
 * @param file 
 * @returns 
 */
export function fileToUrl(file: File | Blob) {
  return URL.createObjectURL(file);
}

/**
 * 下载文件
 * @param url 文件地址
 * @param fileName 
 */
export function downloadFile(url: string, fileName: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  a.remove();
}

/**
 * 文件分片
 * @param file 
 * @param chunkSize 
 * @returns 
 */
export function fileFragment(file: File, chunkSize = 1024*1024*5) {
  type Item = { start: number, end: number, index: number, blob: Blob };
  return new Promise<Item[]>(async resovle => {
    const total = Math.ceil(file.size / chunkSize);  // 总共分片数

    const code = `
function createChunk(file, index, chunkSize) {
  return new Promise(resovle => {
    const start = index * chunkSize;
    const end = start + chunkSize;
    const fileReader = new FileReader();
    const blob = file.slice(start, end);
    fileReader.onload = (e) => {
      resovle({ start, end, index, blob });
    }
    fileReader.readAsArrayBuffer(blob);
  })
}

onmessage = async (e) => {
  const { file, chunkSize, start, end } = e.data;
  const paoms = [];
  for (let i = start; i < end; i++) {
    const chunk = createChunk(file, i, chunkSize);
    paoms.push(chunk);
  }
  const chunks = await Promise.all(paoms);
  postMessage(chunks);
}
`;

    const worker = execWorkerCode(code);
    worker.postMessage({ file, chunkSize, start: 0, end: total });
    worker.onmessage = (e) => {
      worker.terminate();
      resovle(e.data);
    }
  })
}
