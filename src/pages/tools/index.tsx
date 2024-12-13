import { getToolsSourceCode } from "@/utils/source";
import { h } from "pl-react"

export default () => {

  getToolsSourceCode().then(res => {
    console.log(res)
  })

  return <div>tools</div>
}