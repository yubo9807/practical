import { h, useComponent, useLayoutEffect, useRef, useState } from "pl-react"
import { nextTick } from "pl-react/utils";
import CodePreview from "../CodePreview";
import { parse } from 'marked';
import './index.scss';

interface Props {
  text:       string
  className?: string | string[]
}
export default (props: Props) => {

  const [html, setHtml] = useState('');
  const wrapRef = useRef<HTMLElement>();
  useLayoutEffect(async () => {
    const html = await parse(props.text);
    setHtml(html);
    nextTick(() => {
      const nodes = wrapRef.current.querySelectorAll('pre code');
      [...nodes].forEach((el: HTMLElement) => {
        const exporse = useComponent(CodePreview, {
          value: el.textContent,
        });
        const node = exporse['_nodes'][0];
        wrapRef.current.replaceChild(node, el.parentElement);
      })
    })
  }, [props.text])

  return <div
    ref={wrapRef}
    className={['markdown', ...[props.className].flat()]}
    innerHTML={html}
  ></div>
}