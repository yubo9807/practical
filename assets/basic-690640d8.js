import{u as f,a as i,g as u,k as d,j as m,h as t}from"./pl-react-68daa512.js";function g(e){const[s,o]=f(e.open);i(()=>{o(e.open)},[e.open]);const a=u();d(()=>{s?a.current.showModal():a.current.close()},[s]);function l(){o(!1),e.onClose&&e.onClose(!1)}m(e.ref,()=>({open:()=>o(!0),close:l}),[]);function c(n){n.target===a.current&&(e.onModal&&e.onModal(n),e.isModalClose!==!1&&l())}return t("dialog",{ref:a,className:["br-dialog",...[e.className].flat()],style:e.style,onmousedown:c,onclose:l},t("div",{className:"br-dialog-wrap"},...e.children))}export{g as B};
