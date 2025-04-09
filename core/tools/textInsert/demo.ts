import { TextInsert } from "."

export default () => {
  const pre = document.createElement('pre');
  document.getElementById('container').appendChild(pre);

  const ti = new TextInsert({
    text: `class Car {\n  constructor(name: string) {\n  }\n}`,
    onInsert(item) {
      pre.textContent = item.target;
    },
    onReset(item) {
      pre.textContent = item.target;
    }
  })

  ti.insertLast(`\n  name = 'hello';\n`, /constructor\(.+\)\s?\{\n.*\}\n/);
  ti.insert(`\n  fn () {
    console.log(this.name);
  }\n`, -1)
  ti.insertFirst(`\n  age = 18;`, /\n  name = /);
  ti.insertFirst(`\n  age = 20;`, /\n  name = /);
  ti.reset(-1);  // 向前回退，撤回
}