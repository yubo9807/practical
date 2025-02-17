# 模拟 Redis 数据缓存

## SimulateRedis

### Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| maxSize | 最大储存大小 | `number` | `1024 * 1024 * 2` | - |

### Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| deposit | 存/取 数据 | `key, value, overTime, cover` | - |
| clearCache | 清除已过期数据 | - | - |
| deleteOverValue | 删除过期的数据 | - | - |
| deleteFristValue | 删除最早缓存的数据 | - | - |

## CacheBasic

### Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| set | 设置缓存数据 | `key, value, overTime` | - |
| get | 获取数据（过期后不会返回） | `key` | - |
| isExpire | 检测数据是否过期 | `key` | - |
| delete | 删除数据 | `key` | - |
| clear | 清空所有数据 | - | - |
| gainAll | 获取所有缓存数据 | - | - |
| length | 获取缓存数据长度 | - | - |
| *static* size | 获取缓存数据大小 | - | - |

```ts
import { CacheBasic, SimulateRedis } from "."

const cache = new CacheBasic();
cache.set('a', 123, 100);
setTimeout(() => {
  console.log(cache.get('a'));  //--> undefined
}, 200)
```
