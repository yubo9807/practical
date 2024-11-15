import { h, useLayoutEffect, useRef } from "pl-react"
import CodePen, { CodePenExpose } from "@/components/Codepen"

export default () => {

  const codePenRef = useRef<CodePenExpose>();

  useLayoutEffect(() => {
    const data = {
      html: `<div>hello</div>`,
      css: ``,
      js: `console.log('hello world')`,
    }
    codePenRef.current.postMessage(data);

    setTimeout(() => {
      codePenRef.current.postMessage({
        html: `<div>hellollll</div>`
      })
    }, 1000)
  })

  return <div style='width: 600px; height: 500px;'>
    <CodePen ref={codePenRef} />
  </div>
}