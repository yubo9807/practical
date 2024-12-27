import { Onion } from '.'

export default () => {
  const ctx = {
    a: 123,
    el: document.getElementById('container'),
  }
  const onion = new Onion(ctx);

  onion.use((ctx, next) => {
    ctx.el.innerText += ctx.a;
    ctx.a = 456;
    next();
    ctx.el.innerText += 'end';
  })

  onion.use((ctx, next) => {
    ctx.el.innerText += ctx.a;
  })

  onion.callback();
}
