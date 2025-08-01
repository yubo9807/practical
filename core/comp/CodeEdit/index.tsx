import { h, useEffect, useLayoutEffect, useMemo, useState } from "pl-react";
import { customForEach } from "pl-react/utils";
import { walkArray } from "~/core/utils/generator";
import { deepClone } from "~/core/utils/object";
import CodeEdit, { CodeEditExpose, CodeEditProps } from "./basic";
import { RefItem } from "pl-react/hooks";
import "./index.scss";

interface Line {
  start:     number
  end:       number
  children?: Line[]
  unfold?:   boolean
}
interface Data extends Line {
  source:   string
  target:   string
  children: Data[]
  unfold:   boolean
}
export interface CodeEditFoldProps extends CodeEditProps {
  lines:          Line[]
  defaultUnfold?: boolean
  onFlodDbClick?: (item: Data) => void
  ref?:           RefItem<CodeEditExpose & {
    getData():    Data[]
  }>
}
/**
 * 代码折叠组件
 * @param props 
 * @returns 
 */
export default function(props: CodeEditFoldProps) {
  const { lines, value, defaultUnfold, ...args } = props;
  const LINE_FEED = '\n';
  const arr = value.replace(/\r/g, '').split(LINE_FEED);

  // 整理数据
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    if ([data.length, lines.length].every(v => v === 0)) return;

    function tidyUp(lines: Line[], collect: Data[] = []) {
      customForEach(lines, val => {
        const start = val.start - 1;
        const children: Data[] = [];
        collect.push({
          start,
          end: val.end - 1,
          source: arr.slice(start, val.end).join(LINE_FEED),
          target: arr[start] + ' ...',
          children: tidyUp(val.children || [], children),
          unfold: val.unfold ?? !!defaultUnfold,
        });
      })
      return collect;
    }
    setData(tidyUp(lines));
  }, [value, lines])


  // 新的结果
  const { content, rows } = useMemo(() => {
    const rows: { key: number, fold: 0 | 1 | 2 }[] = [];  // 行数据
    let count = 0;

    // 递归拼接结果
    function recursion(data: Data[], text: string) {
      let result = '';
      if (!data.length) return text;
      const iter = walkArray(data);
      let item = iter.next().value as Data;
      customForEach(arr, (val, i) => {
        if (!item) {
          result += val + LINE_FEED;
          rows.push({ key: count, fold: 0 });
          count++;
          return;
        }

        // 在折叠范围内，不添加任何内容
        if (i > item.start && i < item.end + 1) return;

        // 不在折叠范围内
        if (i < item.start) {
          result += val + LINE_FEED;
          rows.push({ key: i, fold: 0 });
        } else if (i > item.end) {
          result += val + LINE_FEED;
          item = iter.next().value as Data;
          rows.push({ key: i, fold: 0 });
        } else {
          // 添加折叠后的内容
          if (item.unfold) {
            result += recursion(item.children, item.source + LINE_FEED);  // 递归处理子项被展开的情况折叠的情况
            customForEach(new Array(item.end - item.start + 1), (_, j) => {
              rows.push({ key: count + j, fold: j === 0 ? 2 : 0 });
            })
          } else {
            result += item.target + LINE_FEED;  // 内容被折叠，不需要考虑子项，直接添加
            rows.push({ key: item.start, fold: 1 });
          }
          count = item.end;
        }
        count ++;
      })
      return result;
    }

    const content = recursion(data, value).slice(0, -1);
    return {
      content,
      rows,
    }
  }, [data, props.value]);


  useLayoutEffect(() => {
    if (!props.ref) return;
    props.ref.current.getData = () => data;
  })


  function handleFold(i: number) {
    const index = data.findIndex(item => item.start === i);
    const data2 = deepClone(data);
    data2[index].unfold = !data[index].unfold;
    setData(data2);
  }

  function isFolded(i: number) {
    const { key: index, fold } = rows[i] || { key: i, fold: 0 };
    const classNameConfog = {
      0: '',
      1: 'unfold',
      2: 'fold',
    }
    return <div>
      <i ondblclick={fold ? () => {
        const query = data.find(item => item.start === index);
        if (!query) return;
        props.onFlodDbClick(query);
      } : null}>{index + 1}</i>
      <span className={classNameConfog[fold]} onclick={fold ? () => handleFold(index) : null}></span>
    </div>
  }

  return <CodeEdit
    value={data.length ? content : value}
    {...args}
    slotRowItem={isFolded}
    className={['br-code-edit-fold', ...[props.className].flat()]}
  />;
}