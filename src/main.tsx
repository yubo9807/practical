import { createApp, h } from 'pl-react'
import App from './layout/app'
import './styles/index.scss'
import { initRouter } from 'pl-react/lib/router';
import env from '~/config/env';

initRouter({ base: env.BASE_URL });
const app = createApp();

app.render(<App />, document.getElementById('root'));
