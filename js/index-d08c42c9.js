import{p as F}from"./@babel-228ab864.js";import{c as E,d as H,h as e,j as L,u as y,b as $,a as v,n as B,l as O,L as P}from"./pl-react-491477f1.js";import{D as V}from"./basic-596bbc4d.js";import{f as M,M as q,h as A,j as J,k as U}from"./index-cbd910c8.js";import{a as W,t as j}from"./source-1ce25409.js";function _(o){const{slotHeader:c,title:n,children:D,slotFotter:i,className:x,ref:S,...u}=o,l=E();function m(){l.current.close()}return H(S,()=>l.current,[]),e(V,{ref:l,...u,className:["br-dialog-layer",...[x].flat()]},c?e("header",{className:"dialog-header"},c):e("header",{className:"dialog-header"},e("h2",{className:"title"},n),e("span",{className:"close",onclick:m},"x")),e("main",{className:"dialog-main"},...D),e("footer",{className:"dialog-footer"},i))}const z="source-code-demo-14a44d",G="navigation-07d6b8",K="content-f8ec98",Q="preview-0e0754",N={"source-code-demo":"source-code-demo-14a44d",sourceCodeDemo:z,navigation:G,content:K,preview:Q},se=o=>{const c=L(J),[n,D]=y([]),[i,x]=y({code:"",demo:"",readme:""});function S(t){const d=F(t,{sourceType:"module",plugins:["typescript"]}).program.body.find(s=>s.type==="ExportDefaultDeclaration");if(!d)return t;const p=d.loc.start.line-1,f=d.loc.end.line-1;let g="";const h=t.split(`
`);for(let s=0;s<h.length;s++)[p,f].includes(s)||(g+=h[s].replace(/\s\s/,"")+`
`);return g}const u=E(),l=$(o.getSource,[]);async function m(t){const r=await l;!n.length&&D(r.map(a=>({name:a.name,title:a.title})));const d=r.find(a=>a.name===t)||r[0],{exec:p,code:f,demo:g,readme:h}=d,s={code:f,demo:S(g),readme:h};c.state.codeLanguage==="js"&&(s.code=j(f),s.demo=j(s.demo)),x(s),B(()=>{u.current.clear();const a=document.getElementById("container");a.innerHTML="",a.setAttribute("style",""),p&&p()})}const b=O();v(()=>b.monitor(async t=>{if(!t.path.startsWith(o.path))return;const r=t.path.replace(o.path+"/","");m(r)}),[]);const[I,R]=y(!0);v(()=>{if(I){R(!1);return}const t=b.current.path.replace(o.path+"/","");m(t)},[c.state.codeLanguage]);const[T,w]=y(!1),C=()=>e("ul",{className:N.navigation},...n.map(t=>e("li",null,e(P,{className:"text-ellipsis",to:`${o.path}/${t.name}`},t.title||t.name)))),k=L(U);return v(()=>{n.length&&k.dispatch({type:"menuSet",payload:C()})},[n]),v(()=>()=>{k.dispatch({type:"menuClear"})},[]),e(A,{className:N.sourceCodeDemo},e("aside",null,C()),e("section",{className:N.content},e("h2",null,"Preview"),e("div",{className:N.preview},e("div",{id:"container"}),e(W,{ref:u})),e(_,{open:T,onClose:w,title:"源码实现",style:"width: 1000px"},e(M,{value:i.code})),e("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},e("h2",null,"Use"),e("a",{onclick:()=>w(!0)},"源码实现")),e(M,{value:i.demo}),e("h2",null),e(q,{text:i.readme})))};export{se as S};
