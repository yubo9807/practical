const { writeFileSync, mkdirSync, readdirSync, copyFileSync } = require('fs');

function createConfig(option) {
  const json = {
    name: option.name,
    version: option.version,
    description: option.description,
    homepage: option.homepage,
    keywords: option.keywords || [],
    self_modules: option.self_modules || {},
    dependencies: option.dependencies || {},
  }
  return JSON.stringify(json, null, 2);
}
writeFileSync('lib/utils/gdp.json', createConfig({
  name: 'utils',
  version: '1.0.0',
  description: '常用工具函数',
  homepage: 'http://app.hpyyb.cn/practical#/utils',
  keywords: ['utils', 'common', 'functions'],
}));
writeFileSync('lib/utils/readme.md', `
# 常用工具函数

前往： <a href="http://app.hpyyb.cn/practical/#/utils" target="_blank">预览地址</a>
`);


writeFileSync('lib/tools/gdp.json', createConfig({
  name: 'tools-class',
  version: '1.0.0',
  description: 'JS 工具类',
  homepage: 'http://app.hpyyb.cn/practical#/tools',
  keywords: ['class', 'common'],
  self_modules: {
    'utils': '',
  }
}));
writeFileSync('lib/tools/readme.md', `
# 常用工具类

前往： <a href="http://app.hpyyb.cn/practical/#/tools" target="_blank">预览地址</a>
`);

writeFileSync('lib/canvas/gdp.json', createConfig({
  name: 'canvas',
  version: '1.0.0',
  description: '',
  homepage: 'http://app.hpyyb.cn/practical#/canvas',
  keywords: [],
  self_modules: {
    'utils': '',
  }
}));
writeFileSync('lib/canvas/readme.md', `
# 自行实现的一些 canvas 案例

前往： <a href="http://app.hpyyb.cn/practical/#/canvas" target="_blank">预览地址</a>
`);


writeFileSync('lib/comp/gdp.json', createConfig({
  name: 'comp',
  version: '1.0.0',
  description: '组件',
  keywords: ['component', 'common', 'functions'],
  self_modules: {
    'utils': '1.0.0',
  }
}));

mkdirSync('lib/styles');
readdirSync('core/styles').forEach(file => {
  copyFileSync(`core/styles/${file}`, `lib/styles/${file}`);
});
writeFileSync('lib/styles/gdp.json', createConfig({
  name: 'style-reset',
  version: '1.0.0',
  description: '公共样式',
  keywords: ['style', 'common', 'scss'],
}));
writeFileSync('lib/styles/readme.md', `
# 样式初始化

包含标签重置样式、scss 函数（适配、主题）

\`\`\`
import '~/_modules/style-reset/index.scss';
\`\`\`
`);