import { Onion } from '.'

export default () => {
  const ctx = {
    a: 123,
  }
  const onion = new Onion(ctx);

  onion.use((ctx, next) => {
    console.log('中间件1：', ctx.a);
    ctx.a = 456;
    next();
    console.log('中间件1：end');
    return ctx;
  });

  onion.use((ctx, next) => {
    console.log('中间件2：', ctx.a);
    next();
    console.log('中间件2：end');
  });

  onion.callback().then(res => {
    console.log('result: ', res);
  });
}
