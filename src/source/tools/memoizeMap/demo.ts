import { MemoizeMap } from '.'

export default () => {
  const m = new MemoizeMap();
  m.set('a', 1);
  m.set({}, 2);
}