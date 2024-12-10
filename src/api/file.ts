import { AnyObj } from "pl-react/utils";
import { fetchRquest, request } from "./request";

/**
 * 获取文件目录
 */
export function api_getFileCatalog(params: AnyObj) {
  return request({
    url: '/basic/api/file/catalog',
    params,
  })
}

/**
 * 获取文件目录
 */
export function api_getFileContent(filename: string) {
  return request({
    url: '/basic/api/file/read',
    params: {
      filename,
    }
  })
}
