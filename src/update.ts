import env from "~/config/env";

// 提示用户更新
if (env.NODE_ENV === 'production') {
  const KEY = '__CACHE_VERSION__';
  const reg = new RegExp(`<script .+ src="(.+?)"></script>`);

  const timer = setInterval(() => {
    const oldVersion = sessionStorage.getItem(KEY);
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
