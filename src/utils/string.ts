import Message from "~/core/comp/Message";
import { copyToBoard } from "~/core/utils/browser";

export function copy(value: string) {
  copyToBoard(value);
  Message.success('复制成功');
}