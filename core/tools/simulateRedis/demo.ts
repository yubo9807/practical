import { SimulateRedis } from "."

export default async () => {
  const redis = new SimulateRedis();
  const r1 = await redis.deposit(1, () => {
    console.log('缓存数据');
    return 123;
  }, 100);  // 100ms后过期
  console.log('r1', r1);

  setTimeout(async () => {
    const r2 = await redis.deposit(1, () => {
      console.log('已缓存过，不会执行');
      return 456;
    });
    console.log('r2', r2); // 123
  }, 50);

  setTimeout(async () => {
    const r3 = await redis.deposit(1, () => {
      console.log('重新缓存数据');
      return 789;
    }, 100);
    console.log('r3', r3); // 123
  }, 200);
}