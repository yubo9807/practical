import { h, useComponent, useImperativeHandle, useLayoutEffect, useRef, useState } from "pl-react";
import { PropsType, StyleObject } from "pl-react/types"
import './index.scss';
import { RefItem } from "pl-react/hooks";
import { isClient } from "pl-react/utils";


type MessageExpose = {
  close:   () => void
  destroy: () => void
}
interface Props extends PropsType {
  visible:    boolean
  type:       'success' | 'error' | 'warning' | 'info'
  message:    string
  duration?:  number | null  // 持续时间，默认 4s
  className?: string | string[]
  style?:     string | StyleObject
  onDestroy?: () => void
  ref?:       RefItem<MessageExpose>
}
function Message(props: Props) {
  const [visible, setVisible] = useState(false);
  const elRef = useRef<HTMLDivElement>();
  const [timer, setTimer] = useState<NodeJS.Timeout>(null);
  useLayoutEffect(() => {
    if (props.visible) {
      setTimeout(() => {
        setVisible(true);
        autoClose();
      }, 200)
    } else {
      close();
    }
  }, [props.visible])

  /**
   * 关闭
   */
  function close() {
    setVisible(false);
    setTimeout(destroy, 400);
  }

  /**
   * 直接销毁
   */
  function destroy() {
    props.onDestroy?.();
    elRef.current.remove();
  }

  useImperativeHandle(props.ref, () => {
    return {
      close,
      destroy,
    }
  }, [])

  /**
   * 自动关闭
   * @returns 
   */
  function autoClose() {
    if (props.duration === null) return;
    const id = setTimeout(close, props.duration || 4000);
    setTimer(id);
  }

  /**
   * 取消自动关闭
   */
  function cancelAutoClose() {
    clearTimeout(timer);
  }

  return <div
    ref={elRef}
    className={['br-message', props.type, visible && 'visible', ...[props.className].flat()]}
    style={props.style}
    onmouseenter={cancelAutoClose}
    onmouseout={autoClose}
  >
    {props.message}
    <span className='icon-close' onclick={close}>×</span>
  </div>
}

class M {
  constructor() {
    if (!isClient()) return;
    const el = document.createElement('div');
    el.className = 'br-message-wrap';
    document.body.appendChild(el);
    this._root = el;
  }
  _root: HTMLDivElement;
  _collect = new Set<MessageExpose>();

  #common(type: Props['type'], message: string, duration?: number) {
    if (!isClient()) return;
    const root = this._root;
    const GAP = 30;
    let index = 0;
    let top = 0;
    for (const item of root.children) {
      index ++;
      top += item.clientHeight + GAP;
    }
    const expose: MessageExpose = useComponent(Message, {
      visible: true,
      type,
      message,
      duration,
      style: `top: ${top}px`,
      onDestroy: () => {
        // @ts-ignore
        const el = expose._nodes[0] as HTMLDivElement;
        const index = Number(el.dataset.index);
        const num = el.offsetHeight + GAP;
        for (let i = index; i < root.children.length; i ++) {
          const item = root.children[i] as HTMLDivElement;
          item.style.top = `${Math.max(0, parseInt(item.style.top) - num)}px`;
          item.dataset.index = Math.max(0, index - 1) + '';
        }
        this._collect.delete(expose);
      },
    }, root);
    // @ts-ignore
    expose._nodes[0].dataset['index'] = index;
    this._collect.add(expose);
  }

  success(message: string, duration?: number) {
    this.#common('success', message, duration);
  }
  error(message: string, duration?: number) {
    this.#common('error', message, duration);
  }
  info(message: string, duration?: number) {
    this.#common('info', message, duration);
  }
  warning(message: string, duration?: number) {
    this.#common('warning', message, duration);
  }
  closeAll() {
    this._collect.forEach(item => {
      item.close();
    })
  }
  destroy() {
    if (!isClient()) return;
    this._root.innerHTML = '';
  }
}

export default new M();