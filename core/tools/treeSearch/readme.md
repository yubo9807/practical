# 树形数据搜索

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| data* | 树形数据 | `any[]` | - | - |
| queryKey* | 搜索字段 | `string` | - | - |
| children | 子集键 | `string` | children | - |
| type | 搜索类型 | `includes \| startsWith \| endsWith` | includes | - |


## Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| isExist | 是否包含该项 | `obj, val` | 特殊情况请继承重写 |
| isTree | 数据检验 | - | - |
