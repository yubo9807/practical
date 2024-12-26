import { parse } from "@babel/parser";
import { default as traverse } from '@babel/traverse';
import { default as generate } from '@babel/generator';

/**
 * ts转js
 * @param code 
 * @returns 
 */
export function tsToJs(code: string) {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['typescript']
  })

  traverse(ast, {
    // enter(item) {
    //   if (item.isTSTypeAliasDeclaration()) {
    //     item.remove();
    //   }
    // },
    TSTypeAliasDeclaration(item) {
      item.remove();
    },
    TSInterfaceDeclaration(item) {
      item.remove();
    },
    TSTypeAnnotation(item) {
      item.remove();
    },
    TSTypeParameterDeclaration(path) {
      path.remove();
    },
  });

  return generate(ast).code;
}