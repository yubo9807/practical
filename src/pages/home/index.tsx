import { h } from "pl-react"
import Container from "@/components/Container"
import style from './style.module.scss'
import readme from '~/readme.md?raw';
import Markdown from "@/components/Markdown";

export default () => {
  const mathed = readme.match(/#.+\n/);
  const title = mathed ? mathed[0].slice(2) : 'Title';

  return <Container leayer={false}>
    <div className={style.header}>
      <div className={style.box}>
        <h1 className={style.title}>{ title }</h1>
      </div>
    </div>
    <div className='leayer'>
      <Markdown text={readme.replace(mathed[0], '')} />
    </div>
  </Container>
}