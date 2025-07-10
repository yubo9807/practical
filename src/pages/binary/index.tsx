import { h, useCallback, useRef, useState } from "pl-react"
import Dialog from "~/core/comp/Dialog/basic";
import style from './index.module.scss'
import { nextTick } from "pl-react/utils";
import Container from "@/components/Container";

export default () => {
  const PREFIX = 'http://static.hpyyb.cn';
  const list = [
    {
      name: '静态资源服务器',
      description: '更好的兼容了前端框架打包项目，可调试生产包问题。',
      color: '#b96759',
      preview: '/video/static.mp4',
      downloads: [
        { system: 'Mac', url: '/binary/mac/static', },
        { system: 'Windows', url: '/binary/win/static.exe', },
        { system: 'Linux', url: '/binary/linux/static', },
      ],
    },
    {
      name: '反向代理',
      description: '启动一个反向代理服务器，并支持 https 配置。',
      color: '#59b1df',
      preview: '/video/proxy.mp4',
      downloads: [
        { system: 'Mac', url: '/binary/mac/proxy', },
        { system: 'Windows', url: '/binary/win/proxy.exe', },
        { system: 'Linux', url: '/binary/linux/proxy', },
      ],
    },
    {
      name: '获取 IP 地址',
      description: '获取 IPv4 及公网 IP 地址。',
      color: '#d0965f',
      preview: '/image/ip.jpg',
      downloads: [
        { system: 'Mac', url: '/binary/mac/ip', },
        { system: 'Windows', url: '/binary/win/ip.exe', },
        { system: 'Linux', url: '/binary/linux/ip', },
      ],
    },
    {
      name: '打卡时间提醒',
      description: '什么？不会摸鱼，我来提醒你！（仅支持 Mac）',
      color: '#bf72d6',
      preview: '/image/notify.jpg',
      downloads: [
        { system: 'Mac', url: '/binary/mac/notify', },
      ],
    },
    {
      name: 'GitHub WebHook Service',
      description: '自动部署服务，自定义执行脚本',
      color: '#bf72d6',
      preview: '/video/deploy.mp4',
      downloads: [
        { system: 'Linux', url: '/binary/linux/deploy', },
      ],
    },
  ]

  const [open, setOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const videoRef = useRef<HTMLVideoElement>();
  function handlePreview(url: string) {
    setOpen(true);
    setCurrentUrl(url);
    if (url.endsWith('.jpg')) return;
    nextTick(() => {
      const videoEl = videoRef.current;
      if (videoEl.paused) {
        // videoEl.currentTime = 0;
        videoEl.play();
      }
    })
  }
  function onClose() {
    setOpen(false);
    if (currentUrl.endsWith('.jpg')) return;
    videoRef.current.pause();
  }

  return <Container>
    <ul className={[style.guide]}>
      {...list.map(item => <li style={`--color: ${item.color}`}>
        <h2 className='text-ellipsis'>{item.name}</h2>
        <p>{item.description}</p>
        <div className={style.bottom}>
          <ul className={style.downloads}>
            下载：&nbsp;
            {...item.downloads.map(val => <a href={PREFIX + val.url} download="">{val.system}</a>)}
          </ul>
          <a className={style.preview} onclick={() => handlePreview(item.preview)}>预览</a>
        </div>
      </li>)}
    </ul>

    <Dialog visible={open} onClose={onClose}>
      {currentUrl && (currentUrl.endsWith('.jpg')
        ? <img className={style.media} src={PREFIX + currentUrl} />
        : <video ref={videoRef} className={style.media} src={PREFIX + currentUrl} controls autoplay onended={() => setOpen(false)}></video>)
      }
    </Dialog>
  </Container>
}