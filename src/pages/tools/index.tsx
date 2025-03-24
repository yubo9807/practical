import { h } from "pl-react";
import { PageProps } from "pl-react/router";
import SourceCodeDemo from "@/components/SourceCodeDemo";
import { commonHandle, CORE_PREFIX_URL } from "@/utils/source";

function getToolsSourceCode() {
  // @ts-ignore
  const codeObj: Record<string, string> = import.meta.glob('~/core/tools/*/index.ts', { as: 'raw', eager: true });
  // @ts-ignore
  const demoObj: Record<string, string> = import.meta.glob('~/core/tools/*/demo.ts', { as: 'raw', eager: true });
  // @ts-ignore
  const execObj: Record<string, { default: Function }> = import.meta.glob('~/core/tools/*/demo.ts', { eager: true });
  // @ts-ignore
  const readmeObj: Record<string, string> = import.meta.glob('~/core/tools/*/readme.md', { as: 'raw', eager: true });

  return commonHandle({
    codeObj,
    demoObj,
    execObj,
    readmeObj,
    path: `${CORE_PREFIX_URL}/tools/`
  });
}

export default function(props: PageProps) {
  return <SourceCodeDemo {...props} getSource={getToolsSourceCode} />
}