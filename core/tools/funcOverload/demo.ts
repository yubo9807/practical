import { FuncOverload } from "."

export default () => {
  const f = new FuncOverload();

  f.addImpl('Number', 'Number', (a, b) => {
    return a + b
  })
  const sum = f.overload(1, 2);
  console.log(sum);

  f.addImpl('String', 'String', (a, b) => {
    return 'str: ' + a + b
  })
  const str = f.overload('a', 'b');
  console.log(str);
}