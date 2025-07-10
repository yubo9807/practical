# 任务队列控制

异步任务队列控制，在队列中有空闲时执行下一个任务。

## TaskScheduling

### Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| parallelCount* | 队列中最多可同时执行几个任务 | `number` | - | - |

### Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| add | 添加任务 | `task` | - |

## TaskSchedulings

### Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| parallelCountList* | 按数组中规定的个数挨个同时执行任务 | `number[]` | - | - |
| isAwait | 是否等待每个规定的数字任务 | `boolean` | `false` | - |

