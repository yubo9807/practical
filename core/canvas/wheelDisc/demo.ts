import { ChartWheelDisc } from '.';

export default () => {
  const container = document.getElementById('container');
  new ChartWheelDisc({
    el: container,
    height: 300,
    controls: [
      {
        outerSize: 140,
        interSize: 40,
        color: 'white',
        background: '#475dbd',
        lineColor: '#D1D1D3',
        lineWidth: 3,
        data: [
          { name: '效果', value: 4, offset: [6, 8] },
          { name: '外部查询', value: 2, },
          { name: '布局', value: 3, },
          { name: '操作', value: 4, offset: [6, -8] },
        ]
      },
      {
        outerSize: 280,
        interSize: 144,
        color: 'white',
        background: '#65656C',
        lineColor: '#D1D1D3',
        lineWidth: 3,
        activeBackground: '#32325D',
        data: [
          {
            name: '隐藏', icon: '', handle() {
              console.log('隐藏')
            }
          },
          { name: '锁定', icon: '', handle() { } },
          { name: '固定', icon: '', },
          { name: '聚焦', icon: '', },
          { name: '恶意IP画像', icon: '', },
          { name: '路径搜索', icon: '', },
          { name: '横向布局', icon: '', },
          { name: '纵向布局', icon: '', },
          { name: '网格布局', icon: '', },
          { name: '扩展', icon: '', },
          { name: '收藏', icon: '', },
          { name: '标记', icon: '', },
          { name: '标签', icon: '', },
        ]
      },
    ]
  })
}
