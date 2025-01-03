import { h } from "pl-react";
import { PageProps } from "pl-react/router";
import SourceCodeDemo from "@/components/SourceCodeDemo";
import { getCanvasSourceCode } from "@/utils/source";

export default function(props: PageProps) {
  return <SourceCodeDemo {...props} getSource={getCanvasSourceCode} />
}