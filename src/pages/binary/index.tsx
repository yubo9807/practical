import { h, useState } from "pl-react"
import Dialog from "~/core/comp/Dialog/basic";
import style from './index.module.scss'

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
  ]

  const [preview, setPreview] = useState({
    open: false,
    url: '',
  });

  function handlePreview(url: string) {
    setPreview({
      open: true,
      url,
    })
  }

  return <div>
    <ul className={[style.guide]}>
      {...list.map(item => <li style={`--color: ${item.color}`}>
        <h2 className='text-ellipsis'>{item.name}</h2>
        <p>{item.description}</p>
        <div className={style.bottom}>
          <ul className={style.downloads}>
            {...item.downloads.map(val => <a href={PREFIX + val.url} download="">{val.system}</a>)}
          </ul>
          <a className={style.preview} onclick={() => handlePreview(item.preview)}>预览</a>
        </div>
      </li>)}
    </ul>

    <Dialog open={preview.open} onClose={() => setPreview({ open: false, url: '' })}>
      {preview.url.endsWith('.jpg')
        ? <img className={style.media} src={PREFIX + preview.url} />
        : <video className={style.media} src={PREFIX + preview.url} autoplay></video>
      }
    </Dialog>
  </div>
}