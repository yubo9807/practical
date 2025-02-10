import { Onion } from '.'

export default () => {
  const ctx = {
    a: 123,
    el: document.getElementById('container'),
  }
  const onion = new Onion(ctx);

  onion.use((ctx, next) => {
    console.log(ctx.a);
    ctx.a = 456;
    next();
    console.log('end');
  })

  onion.use((ctx, next) => {
    console.log(ctx.a);
  })

  onion.callback();
}
