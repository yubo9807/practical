import { h, useImperativeHandle, useRef } from "pl-react"
import { RefItem } from "pl-react/hooks";
import env from "~/config/env";


type Data = {
  html?: string
  css?:  string
  js?:   string
}
export type CodePenExpose = {
  postMessage: (data: Data) => void
}
type Props = {
  ref: RefItem<CodePenExpose>
}
export default (props: Props) => {

  const IFRAME_URL = location.origin + env.BASE_URL + '/preview-js.html';
  const iframeRef = useRef<HTMLIFrameElement>();

  useImperativeHandle<CodePenExpose>(props.ref, () => {
    let isLoaded = false;
    function send(data: Data) {
      const codePen = window['codePen'];
      codePen && codePen.postMessage(data, IFRAME_URL);
    }

    return {
      postMessage(data) {
        if (isLoaded) {
          send(data);
        } else {
          iframeRef.current.addEventListener('load', () => {
            isLoaded = true;
            send(data);
          });
        }
      }
    }
  })

  return <iframe ref={iframeRef} name="codePen" style='width: 100%; height: 100%' src={IFRAME_URL}></iframe>
}