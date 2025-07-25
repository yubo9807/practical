# 布隆过滤器

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| m | 比特位大小 | `number` | 1024*\*2\*8 | - |
| k | hash 次数 | `number` | 16 | - |

## Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| add | 添加内容 | `string` | - |
| has | 查看有无添加过该内容 | `string` | - |
| delete | 删除内容 | `string` | - |
| clear | 清空布隆过滤器 | - | - |
| *static* size | 获取当前布隆过滤器的大小 | - | - |

## 说明

为解决数据量太大，导致内存占用过大的问题。

1. 布隆过滤器是一种空间效率高的概率数据结构，用于判断一个元素是否在一个集合中；
2. 可以用来判断一个元素是否在一个集合中，但不能保证100%准确，但是可以保证百分之99.99的准确率。
