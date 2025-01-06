import{h as e,F as H,c as f,e as x,u as D,b as L,a as W,n as E,l as I,f as R,m as B,L as F,i as j}from"./pl-react-f16e3da5.js";import{p as $}from"./@babel-cd739a4a.js";import{C as q,b as A,c as O,t as _}from"./source-039eda11.js";import{p as P}from"./marked-e4132bc8.js";import{s as z}from"./index-bed6cbd5.js";const C=t=>{class a extends A{constructor(){super({keywords:["import","export","default","from","const","let","var","function","this","arguments","return","eval","class","constructor","new","extends","super","async","await","yield","if","else","switch","case","try","catch","finally","throw","for","in","of","while","do","break","continue","debugger","delete","typeof","void","instanceof","true","false","null","undefined","NaN","Infinity"]})}output(r){this._textList=[{content:r.replace(/</g,"&lt;").replace(/>/g,"&gt;")}];const o=this._option;return this._commonDealWith(/`[^`]*`/g,"string")._commonDealWith(o.multiRowComment,"block-comment")._commonDealWith(o.singleLineComment,"line-comment")._commonDealWith(o.string,"string")._commonDealWith(o.number,"number")._commonDealWith(o.constant,"constant")._keyword(o.keywords)._commonDealWith(o.methods,"methods")._commonDealWith(o.object,"object")._merge()}}const c=new a;function l(n){O(n)}return e(q,{value:t.value,toHtml:n=>c.output(n),isEdit:!1,slotBtns:e(H,null,e("span",{style:"cursor: pointer;",onclick:()=>l(t.value)},"复制"))})};function J(t){const[a,c]=f(t.open);x(()=>{c(t.open)},[t.open]);const l=D();L(()=>{a?l.current.showModal():l.current.close()},[a]);function n(){c(!1),t.onClose&&t.onClose(!1)}W(t.ref,()=>({open:()=>c(!0),close:n}),[]);function r(o){o.target===l.current&&(t.onModal&&t.onModal(o),t.isModalClose!==!1&&n())}return e("dialog",{ref:l,className:["br-dialog",...[t.className].flat()],style:t.style,onmousedown:r,onclose:n},e("div",{className:"br-dialog-wrap"},...t.children))}function U(t){const{slotHeader:a,title:c,children:l,slotFotter:n,className:r,ref:o,...g}=t,d=D();function y(){d.current.close()}return W(o,()=>d.current,[]),e(J,{ref:d,...g,className:["br-dialog-layer",...[r].flat()]},a?e("header",{className:"dialog-header"},a):e("header",{className:"dialog-header"},e("h2",{className:"title"},c),e("span",{className:"close",onclick:y},"x")),e("main",{className:"dialog-main"},...l),e("footer",{className:"dialog-footer"},n))}const V=t=>{const[a,c]=f("");x(async()=>{const r=await P(t.text);c(r)},[t.text]);const l=D(),n=I();return L(async()=>{E(()=>{[...l.current.querySelectorAll("pre code")].forEach(o=>{const g=n.render(e(C,{value:o.textContent}));o.parentElement.replaceWith(g[0])})})},[a]),e("div",{ref:l,className:["markdown",...[t.className].flat()],innerHTML:a})},G="page-tools-5625ed",K="navigation-07d6b8",Q="content-f8ec98",N={"page-tools":"page-tools-5625ed",pageTools:G,navigation:K,content:Q},oe=t=>{const[a]=R(z),[c,l]=f([]),[n,r]=f({code:"",demo:"",readme:""});function o(s){const h=$(s,{sourceType:"module",plugins:["typescript"]}).program.body.find(i=>i.type==="ExportDefaultDeclaration");if(!h)return s;const p=h.loc.start.line-1,w=h.loc.end.line-1;let v="";const b=s.split(`
`);for(let i=0;i<b.length;i++)[p,w].includes(i)||(v+=b[i].replace(/\s\s/,"")+`
`);return v}const g=B(t.getSource,[]);async function d(s){const u=await g;!c.length&&l(u.map(m=>({name:m.name,title:m.title})));const h=u.find(m=>m.name===s)||u[0],{exec:p,code:w,demo:v,readme:b}=h,i={code:w,demo:o(v),readme:b};a.codeLanguage==="js"&&(i.code=_(w),i.demo=_(i.demo)),r(i),E(()=>{const m=document.getElementById("container");m.innerHTML="",m.setAttribute("style",""),p&&p()})}const y=j();x(()=>y.monitor(async s=>{if(!s.path.startsWith(t.path))return;const u=s.path.replace(t.path+"/","");d(u)}),[]);const[M,T]=f(!0);x(()=>{if(M){T(!1);return}const s=y.current.path.replace(t.path+"/","");d(s)},[a.codeLanguage]);const[S,k]=f(!1);return e("div",{className:N.pageTools},e("aside",null,e("ul",{className:N.navigation},...c.map(s=>e("li",null,e(F,{to:`${t.path}/${s.name}`},s.title||s.name))))),e("section",{className:N.content},e("h2",null,"Preview"),e("div",{id:"container"}),e(U,{open:S,onClose:k,title:"源码实现",style:"width: 1000px"},e(C,{value:n.code})),e("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},e("h2",null,"Use"),e("a",{onclick:()=>k(!0)},"realize")),e(C,{value:n.demo}),e("h2",null),e(V,{text:n.readme})))};export{oe as S};