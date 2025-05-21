# 自定义代码高亮

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| keywords | 关键字 | `string[]` | - | - |
| multiRowComment | 多行注释 | `regexp` | - | - |
| singleLineComment | 单行注释 | `regexp` | - | - |
| string | 字符串 | `regexp` | - | - |
| regexp | 正则 | `regexp` | - | - |
| constant | 常量 | `regexp` | - | - |
| number | 单行注释 | `regexp` | - | - |
| methods | 方法调用 | `regexp` | - | - |
| object | 对象取值 | `regexp` | - | - |

## 说明

只是一个简单的代码高亮函数，没有对标签做高亮。
如有特殊情况请重写 output 方法

```ts
class CodeConversion2 extends CodeConversion {
  constructor() {
    super(option);  // 自定义规则
  }
  output(text: string): string {
    this._textList = [{ content: text.replace(/</g, '&lt;').replace(/>/g, '&gt;') }];
    const option = this._option;

    // 调整调用顺序
    return this
      ._commonDealWith(option.string, 'string')
      ._commonDealWith(option.multiRowComment, 'block-comment')
      ._commonDealWith(option.singleLineComment, 'line-comment')
      ._commonDealWith(option.number, 'number')
      ._keyword(option.keywords)
      ._commonDealWith(option.methods, 'methods')
      ._commonDealWith(option.object, 'object')
      ._merge();
  }
}

const conversion = new CodeConversion2();
conversion.output(`code`)
```
