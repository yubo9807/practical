import{h as t,p as h,a as N,d as S,u as y}from"./pl-react-491477f1.js";import{i as k}from"./index-cbd910c8.js";import{p as $,t as b,_ as w}from"./@babel-228ab864.js";function x(o,l){const r={Number(e){return t("span",{className:"number"},e)},String(e){return t("span",{className:"string"},e)},Boolean(e){return t("span",{className:"boolean"},e+"")},Symbol(e){return t("span",{className:"symbol"},e.toString())},Bigint(e){return t("span",{className:"bigint"},e+"n")},Undefined(e){return t("span",{className:"undefined"},e+"")},Null(e){return t("span",{className:"null"},e+"")},RegExp(e){return t("span",{className:"regexp"},e.toString())},Date(e){return t("span",{className:"date"},e.toString())},Object(e){let n="";for(const a in e)n+=`${a}: ${e[a]}, `;return t("span",{className:"object"},`{ ${n.slice(0,-2)} }`)},Array(e){return t("span",{className:"array"},`[${e.join(", ")}]`)},Function(e){return t("span",{className:"function"},e.toString())},Promise(e){return t("span",{className:"promise"},e.toString())},Set(e){let n="";for(const a of e)n+=`${a},`;return t("span",{className:"set"},`Set {${n.slice(0,-1)}}'`)},Map(e){let n="";for(const[a,c]of e)n+=`${this.value(a)}: ${this.value(c)}, `;return t("span",{className:"map"},`Map {${n.slice(0,-2)}}`)},WeakSet(e){return t("span",{className:"weakset"},e.toString())},WeakMap(e){return t("span",{className:"weakmap"},e.toString())},WeakRef(e){return t("span",{className:"weakref"},e.toString())},Error(e){return t("span",{className:"error"},e.stack)}};function i(...e){if(e.length===0)return;const n=[];for(const a of e){let c=k(a);r[c]||(c="Object");const f=r[c](a);n.push(f)}return n}switch(l.type){case"log":return[...o,i(...l.plaload)];case"clear":return[];default:return o}}const R=o=>{const[l,r]=h(x,[]);function i(...s){r({type:"log",plaload:s})}function e(){r({type:"clear"})}N(()=>{const s=console.log;return console.log=(...u)=>{i(...u),s(...u)},()=>{console.log=s}},[]),S(o.ref,()=>({log:i,clear:e}));const[n,a]=y("");N(()=>{o.value&&a(o.value||"")},[o.value]),N(()=>{const s=n.trim();n!==s&&a(s)},[n]);function c(s){a(s.target.value)}const[p,f]=y([]),[m,d]=y(p.length);function v(s){if(["ArrowUp","ArrowDown"].includes(s.key)){let u=0;s.key==="ArrowUp"?u=Math.max(0,m-1):u=Math.min(p.length,m+1),d(u),a(p[m]||"");return}if(!s.shiftKey&&s.key==="Enter"){const u=s.target.value.replace(/\n|(\n')$/,"");if(!u)return;f([...p,u]),a("");try{const g=new Function("return "+u)();i(g)}catch(g){i(g)}}}return t("div",{className:"console"},t("ul",null,...l.map(s=>t("li",null,t("span",{className:"result"},"<")," ",...s))),t("div",{className:"last-line"},t("span",{className:"input"},">")," ",t("textarea",{value:n,oninput:c,rows:1,placeholder:"console...",onkeydown:v})),t("div",{className:"btns"},t("span",{onclick:e},"clear")))};function D(o){const l=$(o,{sourceType:"module",plugins:["typescript"]});return b(l,{TSTypeAliasDeclaration(r){r.remove()},TSInterfaceDeclaration(r){r.remove()},TSTypeAnnotation(r){r.remove()},TSTypeParameterDeclaration(r){r.remove()}}),w(l).code}const T="/core";function j(o){return o.replace(T,"")}function M(o){var c,p;const{codeObj:l,demoObj:r,execObj:i,readmeObj:e,path:n}=o,a=[];for(const f in l){const m=j(f).split("/")[2],d=e[`${n}${m}/readme.md`]||"";a.push({name:m,title:(c=d.match(/# (.*)/))==null?void 0:c[1],code:l[f],exec:(p=i[`${n}${m}/demo.ts`])==null?void 0:p.default,demo:r[`${n}${m}/demo.ts`]||"",readme:d.replace(/# (.*)/,"")})}return a}export{T as C,R as a,M as c,j as f,D as t};
