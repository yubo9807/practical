import { getCurrnetInstance, h, useEffect, useLayoutEffect, useRef, useState } from "pl-react"
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
  useEffect(async () => {
    const html = await parse(props.text);
    setHtml(html);
  }, [props.text])

  const wrapRef = useRef<HTMLElement>();
  const app = getCurrnetInstance();
  useLayoutEffect(async () => {
    nextTick(() => {
      const nodes = wrapRef.current.querySelectorAll('pre code');
      [...nodes].forEach((el: HTMLElement) => {
        const nodes = app.render(<CodePreview value={el.textContent} />);
        el.parentElement.replaceWith(nodes[0]);
      })
    })
  }, [html])

  return <div
    ref={wrapRef}
    className={['markdown', ...[props.className].flat()]}
    innerHTML={html}
  ></div>
}