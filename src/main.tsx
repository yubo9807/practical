import { createApp, h } from 'pl-react'
import App from './layout/app'
import '@/styles/index.scss'
import { initRouter } from 'pl-react/router';
import env from '~/config/env';

// @ts-ignore 防止 babel 解析时找不到 process
window['process'] = { env: {} };

initRouter({ base: env.BASE_URL, mode: 'hash' });
const app = createApp();

app.render(<App />, document.getElementById('root'));
