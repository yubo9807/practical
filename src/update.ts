import env from "~/config/env";

// 提示用户更新
if (env.NODE_ENV === 'production') {

  const KEY = '__CACHE_VERSION__';
  const oldVersion = sessionStorage.getItem(KEY);
  const reg = new RegExp(`<script .+ src="(.+?)"></script>`);

  const timer = setInterval(() => {
    fetch(env.BASE_URL + '/', {
      headers: {
        'Cache-Control': 'no-cache',
      }
    }).then(async res => {
      const html = await res.text();
      const matched = html.match(reg);
      if (!matched) return;
      const newVersion = matched[1];
      if (!oldVersion) {
        sessionStorage.setItem(KEY, newVersion);
        return;
      }
      if (oldVersion !== newVersion) {
        alert('发现有版本更新，点击刷新页面！');
        sessionStorage.setItem(KEY, newVersion);
        clearInterval(timer);
        location.reload();
      }
    })
  }, 5000);
}

/* 
鼠  牛  虎  兔

猪          龙

狗          蛇

鸡  猴  羊  马
*/
