import{k as E,l as R,h as e,a as g,b as h,e as F,n as H,m as $,u as L,o as j,g as q,L as A}from"./pl-react-e0b35d5f.js";import{p as O}from"./@babel-e08cdc44.js";import{C as k,t as T}from"./source-ac2f3188.js";import{B as P}from"./basic-5f502036.js";import{p as V}from"./marked-188a4671.js";import{d as W,a as J}from"./index-5f9437ab.js";function U(s){const{slotHeader:n,title:o,children:l,slotFotter:r,className:i,ref:d,...p}=s,u=E();function y(){u.current.close()}return R(d,()=>u.current,[]),e(P,{ref:u,...p,className:["br-dialog-layer",...[i].flat()]},n?e("header",{className:"dialog-header"},n):e("header",{className:"dialog-header"},e("h2",{className:"title"},o),e("span",{className:"close",onclick:y},"x")),e("main",{className:"dialog-main"},...l),e("footer",{className:"dialog-footer"},r))}const _=s=>{const[n,o]=g("");h(async()=>{const i=await V(s.text);o(i)},[s.text]);const l=E(),r=$();return F(async()=>{H(()=>{[...l.current.querySelectorAll("pre code")].forEach(d=>{const p=r.render(e(k,{value:d.textContent}));d.parentElement.replaceWith(p[0])})})},[n]),e("div",{ref:l,className:["markdown",...[s.className].flat()],innerHTML:n})},z="page-tools-5625ed",G="navigation-07d6b8",K="content-f8ec98",b={"page-tools":"page-tools-5625ed",pageTools:z,navigation:G,content:K},se=s=>{const n=L(W),[o,l]=g([]),[r,i]=g({code:"",demo:"",readme:""});function d(t){const f=O(t,{sourceType:"module",plugins:["typescript"]}).program.body.find(a=>a.type==="ExportDefaultDeclaration");if(!f)return t;const x=f.loc.start.line-1,N=f.loc.end.line-1;let v="";const S=t.split(`
`);for(let a=0;a<S.length;a++)[x,N].includes(a)||(v+=S[a].replace(/\s\s/,"")+`
`);return v}const p=j(s.getSource,[]);async function u(t){const m=await p;!o.length&&l(m.map(c=>({name:c.name,title:c.title})));const f=m.find(c=>c.name===t)||m[0],{exec:x,code:N,demo:v,readme:S}=f,a={code:N,demo:d(v),readme:S};n.state.codeLanguage==="js"&&(a.code=T(N),a.demo=T(a.demo)),i(a),H(()=>{const c=document.getElementById("container");c.innerHTML="",c.setAttribute("style",""),x&&x()})}const y=q();h(()=>y.monitor(async t=>{if(!t.path.startsWith(s.path))return;const m=t.path.replace(s.path+"/","");u(m)}),[]);const[I,M]=g(!0);h(()=>{if(I){M(!1);return}const t=y.current.path.replace(s.path+"/","");u(t)},[n.state.codeLanguage]);const[B,w]=g(!1),C=()=>e("ul",{className:b.navigation},...o.map(t=>e("li",null,e(A,{className:"text-ellipsis",to:`${s.path}/${t.name}`},t.title||t.name)))),D=L(J);return h(()=>{o.length&&D.dispatch({type:"menuSet",payload:C()})},[o]),h(()=>()=>{D.dispatch({type:"menuClear"})},[]),e("div",{className:b.pageTools},e("aside",null,C()),e("section",{className:b.content},e("h2",null,"Preview"),e("div",{id:"container"}),e(U,{open:B,onClose:w,title:"源码实现",style:"width: 1000px"},e(k,{value:r.code})),e("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},e("h2",null,"Use"),e("a",{onclick:()=>w(!0)},"源码实现")),e(k,{value:r.demo}),e("h2",null),e(_,{text:r.readme})))};export{se as S};
