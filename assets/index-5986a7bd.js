import{p as S}from"./@babel-cd739a4a.js";import{b as T,u,m as y,a as h,g as U,h as s,L as w,e as D}from"./pl-react-68daa512.js";import{C as F,t as R,s as q,b as B}from"./source-e75793bf.js";import{s as j}from"./index-1d8c8882.js";import"./debug-ddf39923.js";import"./ms-f6814399.js";import"./globals-aa9f7777.js";import"./@jridgewell-228fcee0.js";import"./jsesc-4cfd8464.js";import"./picocolors-cddfbdbe.js";import"./js-tokens-bc2e8ff2.js";const I="page-utils-f86c23",J="navigation-62969b",M="content-bea58d",P="outline-690e4e",V="total-307071",a={"page-utils":"page-utils-f86c23",pageUtils:I,navigation:J,content:M,outline:P,total:V},Y=b=>{const[m]=T(j),[p,N]=u([]),[l,C]=u(""),E=y(B,[]);async function d(t){const{keys:e,body:o}=await E;!p.length&&N(e);const i=e.find(r=>r===t);let n=o[i||e[0]];m.codeLanguage==="js"&&(n=R(n)),C(n)}const f=D();h(()=>f.monitor(async t=>{if(!t.path.startsWith(b.path))return;const e=t.path+".ts";d(e)}),[]);const[k,v]=u(!0);h(()=>{if(k){v(!1);return}const t=f.current.path+".ts";d(t)},[m.codeLanguage]);const c=y(()=>{const t=S(l,{sourceType:"module",plugins:["typescript"]}),e=[];for(const o of t.program.body)if(o.type==="ExportNamedDeclaration"&&["FunctionDeclaration","ClassDeclaration"].includes(o.declaration.type)){const{loc:i,declaration:n}=o,{start:r,end:L}=i;e.push({start:r.line,end:L.line,name:n.id.name})}return e},[l]),g=U();function x(t){const e=g.current.getEl().getElementsByClassName("row-num")[0].childNodes;for(const o of e)if(o.getElementsByTagName("label")[0].textContent===t+""){q(o);break}}return s("div",{className:a.pageUtils},s("aside",{className:a.navigation},s("ul",null,...p.map(t=>{const e=t.split("/")[2].replace(".ts","");return s("li",null,s(w,{to:t.split(".")[0]},e))}))),s("section",{className:a.content},s(F,{ref:g,value:l,lines:c})),s("aside",{className:a.outline},s("ul",null,...c.map(t=>s("li",{onclick:()=>x(t.start)},t.name))),s("div",{className:a.total},"total: ",c.length)))};export{Y as default};
