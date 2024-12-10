import { asyncto } from "@/source/utils/async";
import { stringifyQuery } from "@/source/utils/url";
import env from "~/config/env"

type ResData = {
  code:     number
  message:  string
  data?:    any
  runTime?: string
}

interface Options {
  url:      string
  baseURL?: string
  params?:  Record<string, string>
}
export async function fetchRquest(option: Options) {
  return new Promise<ResData>((resolve, reject) => {
    const { baseURL, url, params, ...args } = option;
    const query = params ? '?' + stringifyQuery(params): '';
    const newUrl = baseURL ?? env.API_BASE_URL + url + query;
    fetch(newUrl, args).then(async res => {
      const json: ResData = await res.json();
      if (json.code === 200) {
        resolve(json);
      } else {
        reject(json);
      }
    }).catch(err => {
      reject({
        code: 500,
        message: err.message,
      });
    })
  })
}

export function request(option: Options) {
  return asyncto(fetchRquest(option));
}