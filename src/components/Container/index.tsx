import { h } from "pl-react"

interface Props {
  children?: any[]
  leayer?: boolean
  className?: string | string[]
}
export default (props: Props) => {

  const isLeayer = props.leayer ?? true;
  return <div className={[isLeayer && 'leayer', ...[props.className].flat()]}>
    {...props.children}
  </div>
}
