# 文本插入

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| *text | 默认文本 | `string` | - | - |
| onInsert | 插入文本回调 | `(record) => void` | - | - |
| onReset | 撤回回调 | `(reset) => void` | - | - |

## Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| insert | 插入文本 | `content, start, end` | - |
| insertFirst | 向前插入内容 | `content, reg` | - |
| insertLast | 向后插入内容 | `content, reg` | - |
| reset | 重置到指定位置 | `index` | - |
