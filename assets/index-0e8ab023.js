import{u as c,h as e}from"./pl-react-68daa512.js";import{B as d}from"./basic-690640d8.js";const p="guide-bd6ec2",m="bottom-69c242",u="downloads-3d8099",y="preview-6cd02e",w="media-acae81",o={guide:p,bottom:m,downloads:u,preview:y,media:w},x=()=>{const a="http://static.hpyyb.cn",t=[{name:"静态资源服务器",description:"更好的兼容了前端框架打包项目，可调试生产包问题。",color:"#b96759",preview:"/video/static.mp4",downloads:[{system:"Mac",url:"/binary/mac/static"},{system:"Windows",url:"/binary/win/static.exe"},{system:"Linux",url:"/binary/linux/static"}]},{name:"反向代理",description:"启动一个反向代理服务器，并支持 https 配置。",color:"#59b1df",preview:"/video/proxy.mp4",downloads:[{system:"Mac",url:"/binary/mac/proxy"},{system:"Windows",url:"/binary/win/proxy.exe"},{system:"Linux",url:"/binary/linux/proxy"}]},{name:"获取 IP 地址",description:"获取 IPv4 及公网 IP 地址。",color:"#d0965f",preview:"/image/ip.jpg",downloads:[{system:"Mac",url:"/binary/mac/ip"},{system:"Windows",url:"/binary/win/ip.exe"},{system:"Linux",url:"/binary/linux/ip"}]},{name:"打卡时间提醒",description:"什么？不会摸鱼，我来提醒你！（仅支持 Mac）",color:"#bf72d6",preview:"/image/notify.jpg",downloads:[{system:"Mac",url:"/binary/mac/notify"}]}],[i,n]=c({open:!1,url:""});function l(s){n({open:!0,url:s})}return e("div",null,e("ul",{className:[o.guide]},...t.map(s=>e("li",{style:`--color: ${s.color}`},e("h2",{className:"text-ellipsis"},s.name),e("p",null,s.description),e("div",{className:o.bottom},e("ul",{className:o.downloads},...s.downloads.map(r=>e("a",{href:a+r.url,download:""},r.system))),e("a",{className:o.preview,onclick:()=>l(s.preview)},"预览"))))),e(d,{open:i.open,onClose:()=>n({open:!1,url:""})},i.url.endsWith(".jpg")?e("img",{className:o.media,src:a+i.url}):e("video",{className:o.media,src:a+i.url,autoplay:!0})))};export{x as default};