import { isEven } from "../../utils/math"


type Option = {
  el:            HTMLElement                // 挂载节点
  percentage:    number                     // 百分比 0 ～ 100
  radian?:       number                     // 波浪弧度放大倍数  default: 1
  color?:        string                     // 波浪颜色
  size?:         number | [number, number]  // 容器大小
  noTransition?: boolean                    // 刷新时不过渡  default: false
  speed?:        number                     // 动画速度  default: 1
}


export class ChartWait {
  _canvas: HTMLCanvasElement
  _ctx:    CanvasRenderingContext2D
  option:  Option
  _dpr = window.devicePixelRatio || 1;

  #range  = 0;  // 贝塞尔曲线的弧度
  #height = 0;  // 波浪到画布顶部的高度
  #width  = 0;  // 贝塞尔曲线的宽度

  constructor(option: Option) {
    this.option = Object.assign({
      percentage:   0,
      radian:       1,
      color:        '#0080ff',
      noTransition: false,
      speed:        1,
    }, option);
    this.option.size ??= option.el.clientWidth;
    this.option.size = Array.isArray(this.option.size) ? this.option.size : [this.option.size, this.option.size];
    this._canvas = document.createElement('canvas');
    const width = this.option.size[0];
    const height = this.option.size[1];
    this._canvas.style.width = width + 'px';
    this._canvas.style.height = height + 'px';
    this._canvas.width = width * this._dpr;
    this._canvas.height = height * this._dpr;
    // this._canvas.style.borderRadius = '50%';
    option.el.appendChild(this._canvas);
    this._ctx = this._canvas.getContext('2d');
    this._ctx.scale(this._dpr, this._dpr);
    this.#width = this._canvas.width / 2;
    this.animation();
  }

  /**
   * 绘制一条波浪线
   * @param startX 起始横坐标 
   * @returns 
   */
  _drawWave(startX: number) {
    const ctx    = this._ctx,
          width  = this.#width,
          height = this.#height / this._dpr,
          range  = this.#range;

    /**
     * 创建一条弧度向上的二次贝塞尔曲线
     * @param i 第 i 个
     * @returns 结束点 x 坐标
     */
    function createWaveTop(i: number) {
      const endX = width * (i + 1) + startX;
      i === 0 ? ctx.moveTo(width * i + startX, height) : ctx.lineTo(width * i + startX, height);
      ctx.quadraticCurveTo(width * (i + 1) - width / 2 + startX, height + range, endX, height);
      return endX;
    }

    /**
     * 创建一条弧度向下的二次贝塞尔曲线
     * @param i 第 i 个
     * @returns 结束点 x 坐标
     */
    function createWaveBottom(i: number) {
      const endX = width * (i + 1) + startX;
      i === 0 ? ctx.moveTo(width * i + startX, height) : ctx.lineTo(width * i + startX, height)
      ctx.quadraticCurveTo(width * (i + 1) - width / 2 + startX, height * 2 - (height + range), endX, height);
      return endX;
    }

    let i = 0;
    return function createWave(n) {
      while (i <= n) {
        const endX = isEven(i) ? createWaveTop(i) : createWaveBottom(i);
        if (i === n) return endX;
        i++;
      }
    }
  }

  /**
   * 绘制为图
   */
  _graph(startX = 0, color = '#00f') {
    this._ctx.beginPath();
    const createWave = this._drawWave(startX);
    const num = this._canvas.width / this.#width * 2;
    const endX = createWave(num);
    this._ctx.lineTo(endX, this.#height);
    this._ctx.lineTo(endX, this._canvas.height);
    this._ctx.lineTo(startX, this._canvas.height);
    this._ctx.closePath();
    this._ctx.fillStyle = color;
    this._ctx.fill();
  }

  _animationId = null;

  /**
   * 执行动画
   */
  animation() {
    let k = -this._canvas.width;
    let i = -this._canvas.width;
    let j = -this._canvas.width;
    let backupPercentage = 0;  // 备份百分比

    const self = this;
    execute();
    function execute() {
      if (backupPercentage > self.option.percentage) backupPercentage --;
      if (backupPercentage < self.option.percentage) backupPercentage ++;
      
      self.#height = self._canvas.height - self._canvas.height * (backupPercentage / 100);
      const range = backupPercentage < 60 ? backupPercentage / 2 : (100 - backupPercentage) / 2 + 10;
      self.#range = range * self.option.radian * self._dpr;
      if (k > 0) k = -self._canvas.width;
      if (i > 0) i = -self._canvas.width;
      if (j > 0) j = -self._canvas.width;
      self._ctx.clearRect(0, 0, self._canvas.width, self._canvas.height);
      const color = self.option.color;
      self._graph(k, color + '33');
      self._graph(i, color + '55');
      self._graph(j, color);
      k += 4 * self.option.speed;
      i += 3 * self.option.speed;
      j += 2 * self.option.speed;
      self._animationId = requestAnimationFrame(execute);
    }
  }

  /**
   * 刷新（容器宽度改变时）
   * @returns 
   */
  refresh() {
    this.option.size ??= this.option.el.clientWidth;
    this.option.size = Array.isArray(this.option.size) ? this.option.size : [this.option.size, this.option.size];
    this._canvas.width = this.option.size[0];
    this._canvas.height = this.option.size[1];
    this.#width = this._canvas.width / 2;

    if (this.option.noTransition) return;
    let backupPercentage = 0;
    let requestId = null;
    const self = this;
    (function() {
      cancelAnimationFrame(self._animationId);    // 停止动画
      backupPercentage = self.option.percentage;  // 备份初始位置
      self.option.percentage = 0;
      increase();
      self.animation();
    }())

    /**
     * 回到初始位置
     */
    function increase() {
      if (self.option.percentage >= backupPercentage) {
        cancelAnimationFrame(requestId);
        return;
      }
      self.option.percentage ++;
      requestId = requestAnimationFrame(increase);
    }
  }

}
