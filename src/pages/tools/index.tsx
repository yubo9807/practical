import { getSourceCode } from "@/utils/source";
import { h } from "pl-react"

export default () => {

  getSourceCode().then(res => {
    console.log(res)
  })

  return <div>tools</div>
}