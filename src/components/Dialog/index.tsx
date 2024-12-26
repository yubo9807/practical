import { h, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "pl-react"
import { PropsType, StyleObject } from "pl-react/types";
import { RefItem } from "pl-react/hooks";
import './index.scss';

export interface DialogExpose {
  close: () => void
}
export interface DialogProps extends PropsType {
  open:          boolean
  onClose?:      (open: false) => void
  className?:    string | string[]
  style?:        string | StyleObject
  isModalClose?: boolean  // 点击蒙层关闭，默认为 true
  onModal?:      (e: MouseEvent) => void
  ref?:          RefItem<DialogExpose>
}

export default function(props: DialogProps) {

  const [model, setModel] = useState(props.open);
  useEffect(() => {
    setModel(props.open);
  }, [props.open])

  const dialogRef = useRef<HTMLDialogElement>();
  useLayoutEffect(() => {
    if (model) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [model])

  function close() {
    setModel(false);
    props.onClose && props.onClose(false);
  }
  useImperativeHandle(props.ref, () => ({
    open: () => setModel(true),
    close,
  }), []);

  /**
   * 点击蒙层关闭
   * @param e 
   */
  function mouseDown(e: MouseEvent) {
    if (e.target === dialogRef.current) {
      props.onModal && props.onModal(e);
      !(props.isModalClose === false) && close();
    }
  }

  return <dialog ref={dialogRef}
    className={['br-dialog', ...[props.className].flat()]}
    style={props.style}
    onmousedown={mouseDown}
    onclose={close}
  >
    <div className='br-dialog-wrap'>
      {...props.children}
    </div>
  </dialog>
}
