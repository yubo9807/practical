import { h } from "pl-react"
import { PropsType, Tree } from "pl-react/types"
import { customForEach } from "pl-react/utils";

interface Props extends Omit<Partial<HTMLSelectElement>, 'children'>, PropsType {
  active: string
  onChange: (value: string) => void
}
export function Select(props: Props) {
  const { active, onChange, children, ...args } = props;
  customForEach(props.children, (tree: Tree) => {
    tree.attrs.selected = active === tree.attrs.value;
  })

  function handleChange(e) {
    onChange && onChange(e.target.value);
  }

  // @ts-ignore
  return <select onchange={handleChange} {...args}>{...children}</select>
}


interface OptionProps extends Omit<Partial<HTMLOptionElement>, 'children'>, PropsType {
  value: string
}
export function Option(props: OptionProps) {
  const { value, selected, children, ...args } = props;
  // @ts-ignore
  return <option value={value} selected={selected} {...args}>{...children}</option>
}
