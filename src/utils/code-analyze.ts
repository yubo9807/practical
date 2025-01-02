import { parse } from '@babel/parser'
import type { Statement } from '@babel/types';
import { default as traverse } from '@babel/traverse';
import { default as generate } from '@babel/generator';
import { resolvePath } from '~/core/utils/url';
import { backupBody } from './source';


/**
 * 获取内部引用的代码名称
 * @param node 
 * @returns 
 */
function getIntraNames(node: Statement) {
  if (!node.leadingComments) return [];
  const matched = node.leadingComments[0].value.match(/@intra (.+)\n/);
  return matched ? matched[1].split(',') : [];
}

/**
 * 获取代码中的函数代码块
 * @param filename 
 * @param queryFuncs 
 * @param collect 
 * @returns 
 */
export function getDrinkCode(filename: string, queryFuncs: string[], collect: Record<string, string[]> = {}) {
  const ast = parse(backupBody[filename], {
    sourceType: 'module',
    plugins: ['typescript']
  });

  // 要查找的代码
  const codes: string[] = [];
  const names: string[] = [];  // 被使用的代码 name
  const keys: string[] = [];   // 已经被收集的代码 key
  for (const i in ast.program.body) {
    const node = ast.program.body[i];
    delete node.trailingComments;
    const code: string = generate(node).code;
    for (const func of queryFuncs) {
      if (!code.includes(func)) continue;
      names.push(...getIntraNames(node));
      codes.push(code);
      keys.push(i);
    }
  }

  /**
   * 查找的代码中引用了本文件中其他部分的代码
   * @param names 
   * @param codes 
   * @returns 
   */
  function getIntraCode(names: string[], codes: string[] = []) {
    for (const i in ast.program.body) {
      if (keys.includes(i)) continue;
      const node = ast.program.body[i];
      const code = generate(node).code;
      let has = false;
      for (const name of names) {
        if (code.includes(name)) {
          has = true;
          codes.push(code);
        }
      }

      if (has) {
        const names = getIntraNames(node);
        getIntraCode(names, codes);
      }
    }
    return codes;
  }

  codes.unshift(...getIntraCode(names));
  collect[filename] = codes;

  const querys: { filename: string, queryFuncs: string[] }[] = [];
  traverse(ast, {
    ImportDeclaration(item) {
      const queryFuncs = [];
      for (const node of item.node.specifiers) {
        for (const code of codes) {
          const { name } = node.imported;
          if (!code.includes(' '+name)) continue;
          queryFuncs.push(name);
        }
      }

      if (!queryFuncs.length) return;
      querys.push({
        filename: resolvePath(filename, item.node.source.value + '.ts'),
        queryFuncs,
      });
    }
  })

  for (const query of querys) {
    getDrinkCode(query.filename, query.queryFuncs, collect);
  }

  return collect;
}

// const a = getDrinkCode('/tools/falls/code.ts', ['Fulls'])
// console.log(a);

/**
 * 获取文件源代码
 * @param filename 
 * @returns 
 */
export function getOriginCode(filename: string) {
  const ast = parse(backupBody[filename], {
    sourceType: 'module',
    plugins: ['typescript']
  });

  const imports: { filename: string, queryFuncs: string[] }[] = [];
  traverse(ast, {
    ImportDeclaration(item) {
      const { source, specifiers } = item.node;
      imports.push({
        filename: resolvePath(filename, source.value + '.ts'),
        queryFuncs: specifiers.map(item => item.imported.name)
      })
    },
  })

  const { code } = generate(ast);
  const result = {
    [filename]: [code]
  }

  for (const item of imports) {
    const obj = getDrinkCode(item.filename, item.queryFuncs);
    Object.assign(result, obj);
  }

  return result;
}
// const ts = getOriginCode('/tools/falls/demo.ts');
// const js = tsCodeToJs(ts)
// console.log(js);
