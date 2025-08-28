import { h, useImperativeHandle, useRef } from "pl-react";
import BasicDialog, { DialogExpose, DialogProps } from "../Dialog";
import "./index.scss";

interface LayerDialogProps extends DialogProps {
  title?:      string
  slotHeader?: any
  slotFotter?: any
}
export default function(props: LayerDialogProps) {
  const { slotHeader, title, children, slotFotter, className, ref, ...rest } = props;

  const dialogRef = useRef<DialogExpose>();
  function close() {
    dialogRef.current.close();
  }
  useImperativeHandle(ref, () => dialogRef.current, []);

  return <BasicDialog ref={dialogRef} {...rest} className={['br-dialog-layer', ...[className].flat()]}>
    {
      slotHeader
      ? <header className='dialog-header'>{slotHeader}</header>
      : <header className='dialog-header'>
        <h2 className='title'>{title}</h2>
        <span className='close' onclick={close}>x</span>
      </header>
    }
    <main className='dialog-main'>{...children}</main>
    <footer className='dialog-footer'>{slotFotter}</footer>
  </BasicDialog>
}
