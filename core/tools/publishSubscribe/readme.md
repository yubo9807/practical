# 发布订阅

## Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| on | 注册事件 | `( name: string, fn: (...args: any[]) => void )` | |
| once | 注册一次性事件 | `( name: string, fn: (...args: any[]) => void )` | |
| emit | 发送事件 | `( name: string, ...args: any[]) => void)` | |
| off | 关闭事件 | `( name: string, fn: (...args: any[]) => void )` | |
| offAll | 关闭所有事件 | | |
| reset | 重置已注册的事件 | `( name: string, fn: (...args: any[]) => void, once: boolen )` | |
