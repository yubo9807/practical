var Y=Object.defineProperty;var q=(c,t,n)=>t in c?Y(c,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):c[t]=n;var u=(c,t,n)=>(q(c,typeof t!="symbol"?t+"":t,n),n),B=(c,t,n)=>{if(!t.has(c))throw TypeError("Cannot "+n)};var E=(c,t,n)=>(B(c,t,"read from private field"),n?n.call(c):t.get(c)),A=(c,t,n)=>{if(t.has(c))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(c):t.set(c,n)},j=(c,t,n,e)=>(B(c,t,"write to private field"),e?e.call(c,n):t.set(c,n),n);import{i as M,c as F,f as $,a as J,g as H,b as N,d as U}from"./math-c1d85691.js";import{p as G}from"./index-cbd910c8.js";import{h as K}from"./pl-react-491477f1.js";import{S as Q}from"./index-d08c42c9.js";import{c as V,C as Z}from"./source-1ce25409.js";import"./marked-4b92e03d.js";import"./@babel-228ab864.js";import"./debug-ddf39923.js";import"./ms-f6814399.js";import"./globals-aa9f7777.js";import"./@jridgewell-b3e211dc.js";import"./jsesc-4cfd8464.js";import"./picocolors-cddfbdbe.js";import"./js-tokens-bc2e8ff2.js";import"./basic-596bbc4d.js";const tt=`import { isPointInCircle } from "~/core/utils/math"

type Option = {
  el:           HTMLElement
  leftLen:      number
  rightLen:     number
  type?:        'single-single' | 'single-multi' | 'multi-single' | 'multi-multi'
  gap?:         number
  size?:        number
  fillStyle?:   string
  strokeStyle?: string
  lineWidth?:   number
  width?:       number
  height?:      number
}
export class JoinLine {
  constructor(option: Option) {
    Object.assign(this.option, option);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    this.ctx = ctx;
    this.refresh();
    option.el.appendChild(canvas);
  }
  option: Option = {
    el:          null,
    leftLen:     3,
    rightLen:    2,
    type:        'single-single',
    gap:         40,
    size:        8,
    fillStyle:   '#0080ff',
    lineWidth:   1,
  }
  ctx: CanvasRenderingContext2D
  _dpr = window.devicePixelRatio || 1;
  _prevMouseDownFunc = null;
  _connectingLines: [number, number][] = [];  // 连接点索引记录

  refresh() {
    const { ctx, option, _dpr } = this;
    const canvas = ctx.canvas;
    canvas.width = (option.width || option.el.offsetWidth) * _dpr;
    canvas.height = (option.height || option.el.offsetHeight) * _dpr;
    this._connectingLines.length = 0;
    ctx.scale(_dpr, _dpr);
    this.draw();
    canvas.style.width = \`\${canvas.width / _dpr}px\`;
    canvas.style.height = \`\${canvas.height / _dpr}px\`
  }

  draw() {
    const { _connectingLines, ctx, option, _dpr } = this;
    // _connectingLines.length = 0;
    ctx.fillStyle = option.fillStyle;
    ctx.strokeStyle = option.fillStyle;
    ctx.lineWidth = option.lineWidth;

    const collectLeftRedius: {x: number, y: number}[] = [];
    const collectRightRedius: {x: number, y: number}[] = [];
    const alreadyLins: {x1: number, y1: number, x2: number, y2: number}[] = [];  // 连接点

    const canvas = ctx.canvas;
    const width = canvas.width / _dpr;
    const [leftType, rightType] = option.type.split('-');

    /**
     * 绘制点数据
     */
    function drawPoint() {
      collectLeftRedius.length = 0;
      collectRightRedius.length = 0;

      ctx.beginPath();
      for (let i = 0; i < option.leftLen; i++) {
        const x = 14, y = i * option.gap + 14;
        collectLeftRedius.push({ x, y });
        ctx.arc(x, y, option.size, 0, 4 * Math.PI);
      }
      ctx.fill();
  
      ctx.beginPath();
      for (let i = 0; i < option.rightLen; i++) {
        const x = width - 14, y = i * option.gap + 14;
        collectRightRedius.push({ x, y });
        ctx.arc(x, y, option.size, 0, 4 * Math.PI);
      }
      ctx.fill();
    }
    /**
     * 连接线
     * @param x1 
     * @param y1 
     * @param x2 
     * @param y2 
     */
    function joinLine(x1: number, y1: number, x2: number, y2: number) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // 初始化渲染
    drawPoint();
    _connectingLines.forEach(val => {
      const [leftIndex, rightIndex] = val;
      const leftPoint = collectLeftRedius[leftIndex];
      const rightPoint = collectRightRedius[rightIndex];
      const x1 = leftPoint.x, y1 = leftPoint.y, x2 = rightPoint.x, y2 = rightPoint.y;
      alreadyLins.push({ x1, y1, x2, y2 });
      joinLine(x1, y1, x2, y2);
    })

    function resetDraw() {
      drawPoint();
      alreadyLins.forEach(val => {
        joinLine(val.x1, val.y1, val.x2, val.y2);
      })
    }

    // 清除前一次注册的事件，保证事件单一
    canvas.removeEventListener('mousedown', this._prevMouseDownFunc);

    // 拖拽点进行连接
    canvas.addEventListener('mousedown', mousedown);
    this._prevMouseDownFunc = mousedown;

    function mousedown(e: MouseEvent) {
      let startIndex = null, startX: number = null, startY: number = null;
      for (let i = 0; i < collectLeftRedius.length; i++) {
        const { x, y } = collectLeftRedius[i];
        if (isPointInCircle(e.offsetX, e.offsetY, x, y, option.size)) {
          startIndex = i;
          startX = x;
          startY = y;
          break;
        }
      }
      if (startIndex === null) return;  // 没有点中

      document.addEventListener('mousemove', mousemove);
      function mousemove(e: MouseEvent) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        resetDraw();
        joinLine(startX, startY, e.offsetX, e.offsetY);
      }

      document.addEventListener('mouseup', mouseup);
      function mouseup(e: MouseEvent) {
        document.removeEventListener('mousemove', mousemove);

        let lastIndex: number = null, endX: number = null, endY: number = null;
        for (let i = 0; i < collectRightRedius.length; i++) {
          const { x, y } = collectRightRedius[i];
          if (isPointInCircle(e.offsetX, e.offsetY, x, y, option.size)) {
            endX = x;
            endY = y;
            lastIndex = i;
            break;
          }
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (lastIndex === null) {
          resetDraw();
          return;
        }

        // 线段已经存在
        for (let i = 0; i < alreadyLins.length;) {
          const { x1, y1, x2, y2 } = alreadyLins[i];
          // if ((x1 === startX && y1 === startY) || (x2 === endX && y2 === endY)) {
          const leftBool = leftType === 'single' && x1 === startX && y1 === startY;
          const rightBool = rightType === 'single' && x2 === endX && y2 === endY;
          if (leftBool || rightBool) {
            alreadyLins.splice(i, 1);  // 删除已连接过的线
            _connectingLines.splice(i, 1);
            continue;
          }
          i++;
        }

        // 添加连线数据
        alreadyLins.push({ x1: startX, y1: startY, x2: endX, y2: endY });
        _connectingLines.push([startIndex, lastIndex])
        resetDraw();

        document.removeEventListener('mouseup', mouseup);
      }
    }

  }

  _repeat = {
    leftIndexs:  [] as number[],
    rightIndexs: [] as number[],
  };
  joinLine(x: number, y: number) {
    const [leftType, rightType] = this.option.type.split('-');
    const { leftIndexs, rightIndexs } = this._repeat;
    const leftBool = leftType === 'single' && leftIndexs.includes(x);
    const rightBool = rightType === 'single' && rightIndexs.includes(y);
    if (leftBool || rightBool) {
      console.warn(\`连线 [\${x}, \${y}] 重复，当前模式：\${this.option.type}\`);
      return;
    }
    leftIndexs.push(x);
    rightIndexs.push(y);
    this._connectingLines.push([x, y]);
    this.draw();
  }

  /**
   * 获取连线关系（索引记录）
   * @returns 
   */
  getRelations() {
    return this._connectingLines;
  }
}`,nt=`import { computeControlPoint, filterExceed } from '../../utils/math'
import { priorityObject } from '../../utils/object'

type Serie = {
  data:    number[]
  smooth?: boolean
  line?:   {
    width?:  number
    stroke?: string
    fill?:   string
  },
  point?: {
    size?:        number
    stroke?:      string
    strokeWidth?: number
    fill?:        string
  }
}
export type ChartTimerBarOption = {
  el:         HTMLElement
  width?:     number
  height?:    number
  slider?: {
    width?:   number
    start?:   number
    end?:     number
    stroke?:  string
    color?:   string
  }
  xAxis: {
    show?:    boolean
    data:     string[]
    height?:  number
    font?: {
      size?:      string
      color?:     string
      textAlign?: 'left' | 'center' | 'right'
    }
    line?: {
      width?:  number
      stroke?: string
    },
    scale?: {
      stroke: string
    }
  }
  series:     Serie[]
  isPoint?:   boolean
  playSpeed?: number
  onPlayEnd?:           (isPlay: boolean) => void
  onSliderIndexChange?: (start: number, end: number) => void
}

export class ChartTimerBar {

  option: ChartTimerBarOption
  constructor(option: ChartTimerBarOption) {
    const defaultOption: ChartTimerBarOption = {
      el:     null,
      slider: {
        start:   .2,
        end:     .6,
        width:   2,
        stroke: '#5879d1',
        color:  '#5879d155',
      },
      playSpeed: 4,
      isPoint:   true,
      xAxis: {
        show: true,
        data: [],
        font: {
          size:      '12px',
          color:     '#666',
          textAlign: 'center',
        },
        line: {
          width:  1,
          stroke: '#5879d1',
        },
        scale: {
          stroke: '#5879d1',
        }
      },
      series: [{
        smooth: false,
        data:   [],
        line: {
          width:  1,
          stroke: '#5879d1',
          fill:   '#5879d155',
        },
        point: {
          size:        3,
          stroke:      '#5879d1',
          strokeWidth: 1,
          fill:        '#5879d155',
        }
      }]
    }
    this.option = priorityObject(option, defaultOption);

    this._init();
    option.el.appendChild(this.ctx.canvas);
    this.draw();
  }

  ctx: CanvasRenderingContext2D;

  _cfg = {
    slider: {
      left:  0,
      right: 0,
    },
    contentH: 0,
    gap: 0,
  }

  /**
   * 初始化
   */
  _init() {
    const canvas = document.createElement('canvas');
    this.ctx = canvas.getContext('2d');
    this._change();
    const sliderStyle = this.option.slider;
    this._cfg.slider = {
      left: sliderStyle.start * canvas.width,
      right: sliderStyle.end * canvas.width,
    };

    canvas.addEventListener('mousemove', e => {
      const x = e.offsetX, y = e.offsetY;
      if (this._inSlider(x, y)) {
        canvas.style.cursor = 'ew-resize';
      } else if (this._inRectangle(x, y)) {
        canvas.style.cursor = 'move';
      } else {
        canvas.style.cursor = 'default';
      }
    })

    canvas.addEventListener('mousedown', e => {
      const x = e.offsetX, y = e.offsetY;
      const self = this;
      const slider = self._cfg.slider;
      const poor = x - slider.left;
      const sloderW = Math.floor(slider.right - slider.left);

      /**
       * 移动滑块 
       * @param type 
       */
      function moveSlider(type: 'left' | 'right' | 'block') {
        const move = (e: MouseEvent) => {
          self.pause();

          if (type === 'block') {
            slider.left = Math.floor(e.offsetX - poor);
            slider.right = slider.left + sloderW;
          } else {
            slider[type] = e.offsetX;
          }

          if (slider.left >= slider.right) {
            slider.left = slider.right - 4;
          }
          if (slider.right <= slider.left) {
            slider.right = slider.left + 4;
          }

          // 两侧不能超出
          if (slider.left < 0) {
            slider.left = 0;
            slider.right = slider.left + sloderW;
          }
          if (slider.right > canvas.width) {
            slider.right = canvas.width;
            slider.left = slider.right - sloderW;
          }

          self.draw();
        }
        canvas.addEventListener('mousemove', move);
        const mouseup = (e: MouseEvent) => {
          canvas.removeEventListener('mousemove', move);
          document.removeEventListener('mouseup', mouseup);
        }
        document.addEventListener('mouseup', mouseup);
      }

      // 改变滑块大小/移动滑块  
      if (this._inSlider(x, y, 'left')) {
        moveSlider('left');
      } else if (this._inSlider(x, y, 'right')) {
        moveSlider('right');
      } else if (this._inRectangle(x, y)) {
        moveSlider('block');
      }
    })
  }

  /**
   * 容器发生变化，重置大小/数据
   */
  _change() {
    const w = this.option.width || this.option.el.offsetWidth;
    const h = this.option.height || this.option.el.offsetHeight;
    this.ctx.canvas.width = w;
    this.ctx.canvas.height = h;
    this._cfg.contentH = h - (this.option.xAxis.height || 24);
  }

  /**
   * 刷新
   */
  refresh() {
    this._change();
    this.draw();
  }

  /**
   * 绘制
   */
  draw() {
    const { width, height } = this.ctx.canvas;
    this.ctx.clearRect(0, 0, width, height);

    this.option.series.forEach(item => {
      this._drawData(item);
    })
    this._drawSlider();
    this._drawXAxisScaleLine();
    this._drawXAxisData();
  }

  /**
   * 绘制主体数据
   * @param data 
   */
  _drawData(serie: Serie) {
    const ctx = this.ctx;
    const { width } = ctx.canvas;
    const height = this._cfg.contentH;
    const data = serie.data;

    const max = Math.max(...data);
    const gap = width / (data.length - 1);
    this._cfg.gap = gap;

    // 线段
    // const lineStyle = Object.assign({
    //   width:  1,
    //   stroke: '#5879d1',
    //   fill:   '#5879d155',
    // }, serie.line);
    const lineStyle = serie.line;
    ctx.beginPath();
    ctx.lineWidth = lineStyle.width;
    ctx.strokeStyle = lineStyle.stroke;

    type Point = [number, number];
    const isSmooth = serie.smooth;
    const prev: Point = [0, Math.ceil(height - data[0] / max * height)];
    ctx.moveTo(prev[0], prev[1]);
    const collect: Point[] = [prev];
    for (let i = 1; i < data.length; i++) {
      const next: Point = [gap * i, Math.ceil(height - data[i] / max * height)];
      isSmooth ? collect.push(next) : ctx.lineTo(...next); 
    }
    if (isSmooth) {
      const points = computeControlPoint(collect, height / 300);
      for (let i = 1; i < collect.length; i++) {
        ctx.bezierCurveTo(...points[i - 1], ...collect[i]);
      }
    }
    ctx.stroke();
    ctx.strokeStyle = 'transparent';
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.fillStyle = lineStyle.fill;
    ctx.fill();

    // 绘制点
    const pointStyle = Object.assign({
      size:        3,
      stroke:     '#5879d1',
      strokeWidth: 1,
    }, serie.point);
    if (this.option.isPoint) {
      ctx.fillStyle = pointStyle.fill;
      ctx.strokeStyle = pointStyle.stroke;
      ctx.lineWidth = pointStyle.strokeWidth;
      for (let i = 0; i < data.length; i++) {
        ctx.beginPath();
        ctx.arc(gap * i, height - data[i] / max * height, pointStyle.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      }
    }
  }

  /**
   * 绘制刻度线
   */
  _drawXAxisScaleLine() {
    const ctx = this.ctx;
    const { width } = ctx.canvas;
    const height = this._cfg.contentH;
    const lineStyle = Object.assign({
      width:  .5,
      stroke: '#000',
    }, this.option.xAxis.scale);
    ctx.beginPath();
    ctx.strokeStyle = lineStyle.stroke;
    ctx.lineWidth = lineStyle.width;
    ctx.moveTo(0, height);
    ctx.lineTo(width, height);
    ctx.stroke();

    const data = this.option.xAxis.data;
    const gap = this._cfg.gap;
    const scaleStyle = Object.assign({
      stroke: '#000',
    })
    ctx.strokeStyle = scaleStyle.stroke;
    for (let i = 0; i < data.length; i++) {
      ctx.beginPath();
      ctx.moveTo(gap * i, height);
      ctx.lineTo(gap * i, height + 5);
      ctx.stroke();
    }
  }

  /**
   * 绘制时间轴
   */
  _drawXAxisData() {
    const ctx = this.ctx;
    const xAxis = this.option.xAxis;
    const fontStyle = xAxis.font;
    const data = filterExceed(xAxis.data, ctx.canvas.width, {
      fontSize: parseInt(fontStyle.size),
      last:     true,
    });
    const gap = this._cfg.gap;
    const contentHieght = this._cfg.contentH;
    if (xAxis.show) {
      ctx.beginPath();
      ctx.textAlign = fontStyle.textAlign;
      ctx.font = fontStyle.size + ' Arial';
      ctx.fillStyle = fontStyle.color;
      for (let i = 0; i < data.length; i++) {
        ctx.fillText(data[i], gap * i, contentHieght + 20);
      }
      ctx.stroke();
    }
  }

  /**
   * 绘制滑块
   */
  _drawSlider() {
    const ctx = this.ctx;
    const { left, right } = this._cfg.slider;
    const contentHieght = this._cfg.contentH;
    const sliderStyle = this.option.slider;
    
    // 滑块
    ctx.beginPath();
    ctx.fillStyle = sliderStyle.color;
    ctx.rect(left, 0, right - left, contentHieght);
    ctx.fill();

    // 滑块两侧拖拽条
    ctx.beginPath();
    ctx.lineWidth = sliderStyle.width;
    ctx.strokeStyle = sliderStyle.stroke;
    ctx.moveTo(left, 0);
    ctx.lineTo(left, contentHieght);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(right, 0);
    ctx.lineTo(right, contentHieght);
    ctx.stroke();

    this._getSliderData();
  }

  destroy() {
    this.ctx.canvas.remove();
  }

  _backupSilderIndex = new Array(2);

  /**
   * 获取滑块区间内的数据
   */
  _getSliderData() {
    const { left, right } = this._cfg.slider;
    const gap = this.ctx.canvas.width / (this.option.xAxis.data.length - 1);
    const start = Math.ceil(left / gap)
    const end = Math.floor(right / gap);
    if (this._backupSilderIndex[0] !== start || this._backupSilderIndex[1] !== end) {
      this._backupSilderIndex = [start, end];
      const onSliderIndexChange = this.option.onSliderIndexChange;
      onSliderIndexChange && onSliderIndexChange(start, end);
    }
  }

  /**
   * 是否在内容区域内
   * @param y 
   * @returns 
   */
  _inContent(y: number) {
    return y >= 0 && y <= this._cfg.contentH;
  }

  /**
   * 是否在滑块两侧的边上
   * @param x 
   * @param y 
   * @returns 
   */
  _inSlider(x: number, y: number, type: 'left' | 'right' | 'both' = 'both') {
    const { left: start, right: end } = this._cfg.slider;
    const section = this.option.slider.width;
    const inContent = this._inContent(y);
    const inLeftLine = x >= start - section && x <= start + section;
    if (type === 'left') {
      return inLeftLine && inContent;
    }
    const inRightLine = x >= end - section && x <= end + section;
    if (type === 'right') {
      return inRightLine && inContent;
    }
    const inLine = inLeftLine || inRightLine;
    return inLine && inContent;
  }

  /**
   * 是否在矩形内
   * @param x 
   * @param y 
   * @returns 
   */
  _inRectangle(x: number, y: number) {
    const { left: start, right: end } = this._cfg.slider;
    return x >= start && x <= end && this._inContent(y);
  }

  /**
   * 是否在点上
   * @param x 
   * @param y 
   */
  _inPoint(x: number, y: number) {
    if (!this.option.isPoint) return false;
    const gap = this._cfg.gap;
    const { series } = this.option;
    for (let i = 0; i < series.length; i++) {
      const data = series[i].data;
      for (let j = 0; j < data.length; j++) {
        console.log(gap * j, y);
      }
    }
  }


  _timer: NodeJS.Timeout;

  /**
   * 是否正在播放中
   * @returns 
   */
  get isPlay() {
    return !!this._timer;
  }

  /**
   * 播放
   */
  play(fixed = false) {
    if (this.isPlay) return;
    if (this._cfg.slider.right >= this.ctx.canvas.width) {
      this._cfg.slider.left = 0;
      this._cfg.slider.right = 2;
    }
    const playSpeed = this.option.playSpeed;
    this._timer = setInterval(() => {
      if (this._cfg.slider.right >= this.ctx.canvas.width) {
        clearInterval(this._timer);
        this._timer = null;
        const onPlayEnd = this.option.onPlayEnd;
        onPlayEnd && onPlayEnd(this.isPlay);
        return;
      }
      fixed && (this._cfg.slider.left += playSpeed);
      this._cfg.slider.right += playSpeed;
      this.draw();
    }, 16)
  }

  /**
   * 暂停
   */
  pause() {
    clearInterval(this._timer);
    this._timer = null;
  }

  /**
   * 播放/暂停
   */
  togglePlay(fixed = false) {
    this.isPlay ? this.pause() : this.play(fixed);
  }
}
`,et=`import { isEven } from "../../utils/math"


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
`,it=`import { calculateCentroid, getCirclePoints, isPointInPolygon } from "../../utils/math"

type DataItem = { [k: string]: any } & {
  name?:   string
  offset?: [number, number]
  value?:  number
  handle?: () => void
}
type Control = {
  color?:            string
  background?:       string
  lineColor?:        string
  lineWidth?:        number
  activeBackground?: string
  outerSize:         number
  interSize:         number
  data:              DataItem[]
}
type ChartWheelDiscOption = {
  el:       HTMLElement
  width?:   number
  height?:  number
  controls: Control[]
}
export class ChartWheelDisc {

  option: ChartWheelDiscOption
  ctx:    CanvasRenderingContext2D
  dpr = window.devicePixelRatio || 1;

  constructor(option: ChartWheelDiscOption) {
    this.option = option;
    const canvas = document.createElement('canvas');
    const width = option.width || option.el.clientWidth;
    const height = option.height || option.el.clientHeight;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = width * this.dpr;
    canvas.height = height * this.dpr;
    this.ctx = canvas.getContext('2d');
    this.ctx.scale(this.dpr, this.dpr);
    option.el.appendChild(canvas);
    this.draw();
    this.event();
  }

  /**
   * 绘制画布
   * @param layer 
   * @param activeIndex 
   */
  draw(layer?: number, activeIndex?: number) {
    const { width, height } = this.ctx.canvas;
    this.ctx.clearRect(0, 0, width, height);
    const controls = this.option.controls;
    for (let i = 0; i < controls.length; i++) {
      this._drawControl(controls[i], layer === i && activeIndex);
    }
  }

  /**
   * 刷新画布
   */
  refresh() {
    this.draw();
  }

  _collectPolygons: { x: number, y: number }[][][] = [];

  /**
   * 绘制扇形
   * @param control 
   * @param activeIndex 
   */
  _drawControl(control: Control, activeIndex?: number) {
    const { width, height } = this.ctx.canvas;
    const ctx = this.ctx;

    const size = control.outerSize;                         // 圆盘大小
    const radius = size / 2;                                // 半径
    const interval = (size - (control.interSize || 0)) / 2; // 间隔
    let halve = 0;                                          // 切分数量

    const deleteIndexs = [];  // 需要删除项
    control.data.forEach(val => {
      if (val.value > 1) {
        const len = val.value - 1;
        const arr = [];
        for (let i = 1; i <= len; i++) {
          arr.push(halve + i)
        }
        deleteIndexs.push(...arr);
      }
      halve += val.value || 1;
    });

    // 中心点
    const centerX = size / 2 + (width / this.dpr - size) / 2;
    const centerY = size / 2 + (height / this.dpr - size) / 2;

    // 平均分布点
    let outerPoints = getCirclePoints(centerX, centerY, radius, halve);
    let interPoints = getCirclePoints(centerX, centerY, radius - interval, halve);

    // 切割数量 > 显示数量
    if (halve > control.data.length) {
      for (const index of deleteIndexs) {
        delete outerPoints[index];
        delete interPoints[index];
      }
      outerPoints = outerPoints.filter(Boolean);
      interPoints = interPoints.filter(Boolean);
    }

    ctx.textAlign = 'center';
    ctx.lineWidth = control.lineWidth || 3;
    let count = 0;
    const collectPolygon: { x: number, y: number }[][] = [];
    const len = outerPoints.length;
    for (let i = 0; i < len; i++) {
      const nextIndex = i === len - 1 ? 0 : i + 1;
      const inter1 = interPoints[i];
      const inter2 = interPoints[nextIndex];
      const outer1 = outerPoints[i];
      const outer2 = outerPoints[nextIndex];
      const points = [
        { x: inter1[0], y: inter1[1] },
        { x: inter2[0], y: inter2[1] },
        { x: outer2[0], y: outer2[1] },
        { x: outer1[0], y: outer1[1] },
      ]
      collectPolygon.push(points);

      ctx.strokeStyle = control.lineColor;
      ctx.beginPath();
      const item = Math.PI * 2 / halve;
      ctx.moveTo(points[0].x, points[0].y);
      ctx.lineTo(points[3].x, points[3].y);
      const number = control.data[i].value || 1;
      ctx.arc(centerX, centerY, radius - interval, item * count, item * (count + number));
      ctx.lineTo(points[1].x, points[1].y);
      ctx.arc(centerX, centerY, radius, item * (count + number), item * count, true);
      count += number;
      ctx.stroke();
      if (activeIndex === i && control.activeBackground) {
        ctx.fillStyle = control.activeBackground;
      } else {
        ctx.fillStyle = control.background;
      }
      ctx.fill();

      ctx.fillStyle = control.color;
      const centroid = calculateCentroid(points);  // 切割图形的中心点
      const texts = control.data[i].name.split('\\n');
      const offset = control.data[i].offset || [0, 0];
      texts.forEach((text, index) => {
        ctx.fillText(text, centroid.x + offset[0], centroid.y + offset[1] + index * 14);
      })
    }
    this._collectPolygons.push(collectPolygon);
  }

  queryPosition(x: number, y: number) {
    const collectPolygons = this._collectPolygons;
    let layer = -1, index = -1;
    tag: for (let i = 0; i < collectPolygons.length; i++) {
      const collectPolygon = collectPolygons[i];
      for (let j = 0; j < collectPolygon.length; j++) {
        const polygon = collectPolygon[j];
        const bool = isPointInPolygon(x, y, polygon);
        if (bool) {
          layer = i;
          index = j;
          break tag;
        }
      }
    }
    return { layer, index };
  }

  event() {
    const canvas = this.ctx.canvas;
    const { controls } = this.option;

    canvas.addEventListener('mousemove', (e) => {
      const { layer, index } = this.queryPosition(e.offsetX, e.offsetY);
      if ([layer, index].includes(-1)) {
        this.draw();
        canvas.style.cursor = 'default';
      } else {
        this.draw(layer, index);
        canvas.style.cursor = 'pointer';
      }
    });

    canvas.addEventListener('click', (e) => {
      const { layer, index } = this.queryPosition(e.offsetX, e.offsetY);
      if ([layer, index].includes(-1)) return;
      const { handle } = controls[layer].data[index];
      handle && handle();
    })
  }

}`,ot=`import { JoinLine } from ".";

export default () => {
  const container = document.getElementById('container');
  const line = new JoinLine({
    el: container,
    leftLen: 3,
    rightLen: 2,
    width: 300,
    type: 'single-multi'
  })
  line.joinLine(0, 1);

  const btn = document.createElement('button');
  btn.innerText = '获取连线数据';
  btn.addEventListener('click', () => {
    const data = line.getRelations();
    console.log(data);
  })
  container.appendChild(btn);
}`,st=`import { ChartTimerBar } from ".";

export default () => {
  const container = document.getElementById('container');
  const timerBar = new ChartTimerBar({
    el: container,
    height: 200,
    xAxis: {
      data: ['2021', '2022', '2023', '2024', '2025', '2026'],
    },
    series: [
      {
        data: [120, 230, 220, 907, 150, 101],
      }
    ],
    onSliderIndexChange(start, end) {
      console.log(start, end)
    }
  })

  const btn = document.createElement('button');
  btn.innerText = 'play';
  btn.addEventListener('click', () => {
    timerBar._cfg.slider.left = 0;
    timerBar._cfg.slider.right = timerBar._cfg.gap;
    timerBar.play(true);
  })
  container.appendChild(btn);
}`,rt=`import { ChartWait } from ".";

export default () => {
  const container = document.getElementById('container');
  const wait = new ChartWait({
    el: container,
    percentage: 30,
    size: 300,
  })
  wait._canvas.style.borderRadius = '50%';

  setInterval(() => {
    const num = Math.random() * 100;
    wait.option.percentage = num;
    wait.option.color = num > 60 ? '#ffaa00' : '#0080ff';
  }, 2000)
}
`,at=`import { ChartWheelDisc } from '.';

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
`;class ct{constructor(t){u(this,"option",{el:null,leftLen:3,rightLen:2,type:"single-single",gap:40,size:8,fillStyle:"#0080ff",lineWidth:1});u(this,"ctx");u(this,"_dpr",window.devicePixelRatio||1);u(this,"_prevMouseDownFunc",null);u(this,"_connectingLines",[]);u(this,"_repeat",{leftIndexs:[],rightIndexs:[]});Object.assign(this.option,t);const n=document.createElement("canvas"),e=n.getContext("2d");this.ctx=e,this.refresh(),t.el.appendChild(n)}refresh(){const{ctx:t,option:n,_dpr:e}=this,o=t.canvas;o.width=(n.width||n.el.offsetWidth)*e,o.height=(n.height||n.el.offsetHeight)*e,this._connectingLines.length=0,t.scale(e,e),this.draw(),o.style.width=`${o.width/e}px`,o.style.height=`${o.height/e}px`}draw(){const{_connectingLines:t,ctx:n,option:e,_dpr:o}=this;n.fillStyle=e.fillStyle,n.strokeStyle=e.fillStyle,n.lineWidth=e.lineWidth;const i=[],r=[],s=[],a=n.canvas,l=a.width/o,[g,m]=e.type.split("-");function _(){i.length=0,r.length=0,n.beginPath();for(let f=0;f<e.leftLen;f++){const h=f*e.gap+14;i.push({x:14,y:h}),n.arc(14,h,e.size,0,4*Math.PI)}n.fill(),n.beginPath();for(let f=0;f<e.rightLen;f++){const y=l-14,h=f*e.gap+14;r.push({x:y,y:h}),n.arc(y,h,e.size,0,4*Math.PI)}n.fill()}function d(f,y,h,w){n.beginPath(),n.moveTo(f,y),n.lineTo(h,w),n.stroke()}_(),t.forEach(f=>{const[y,h]=f,w=i[y],k=r[h],S=w.x,v=w.y,P=k.x,x=k.y;s.push({x1:S,y1:v,x2:P,y2:x}),d(S,v,P,x)});function p(){_(),s.forEach(f=>{d(f.x1,f.y1,f.x2,f.y2)})}a.removeEventListener("mousedown",this._prevMouseDownFunc),a.addEventListener("mousedown",L),this._prevMouseDownFunc=L;function L(f){let y=null,h=null,w=null;for(let v=0;v<i.length;v++){const{x:P,y:x}=i[v];if(M(f.offsetX,f.offsetY,P,x,e.size)){y=v,h=P,w=x;break}}if(y===null)return;document.addEventListener("mousemove",k);function k(v){n.clearRect(0,0,a.width,a.height),p(),d(h,w,v.offsetX,v.offsetY)}document.addEventListener("mouseup",S);function S(v){document.removeEventListener("mousemove",k);let P=null,x=null,C=null;for(let b=0;b<r.length;b++){const{x:I,y:z}=r[b];if(M(v.offsetX,v.offsetY,I,z,e.size)){x=I,C=z,P=b;break}}if(n.clearRect(0,0,a.width,a.height),P===null){p();return}for(let b=0;b<s.length;){const{x1:I,y1:z,x2:R,y2:D}=s[b];if(g==="single"&&I===h&&z===w||m==="single"&&R===x&&D===C){s.splice(b,1),t.splice(b,1);continue}b++}s.push({x1:h,y1:w,x2:x,y2:C}),t.push([y,P]),p(),document.removeEventListener("mouseup",S)}}}joinLine(t,n){const[e,o]=this.option.type.split("-"),{leftIndexs:i,rightIndexs:r}=this._repeat,s=e==="single"&&i.includes(t),a=o==="single"&&r.includes(n);if(s||a){console.warn(`连线 [${t}, ${n}] 重复，当前模式：${this.option.type}`);return}i.push(t),r.push(n),this._connectingLines.push([t,n]),this.draw()}getRelations(){return this._connectingLines}}const lt=()=>{const c=document.getElementById("container"),t=new ct({el:c,leftLen:3,rightLen:2,width:300,type:"single-multi"});t.joinLine(0,1);const n=document.createElement("button");n.innerText="获取连线数据",n.addEventListener("click",()=>{const e=t.getRelations();console.log(e)}),c.appendChild(n)},ht=Object.freeze(Object.defineProperty({__proto__:null,default:lt},Symbol.toStringTag,{value:"Module"}));class dt{constructor(t){u(this,"option");u(this,"ctx");u(this,"_cfg",{slider:{left:0,right:0},contentH:0,gap:0});u(this,"_backupSilderIndex",new Array(2));u(this,"_timer");const n={el:null,slider:{start:.2,end:.6,width:2,stroke:"#5879d1",color:"#5879d155"},playSpeed:4,isPoint:!0,xAxis:{show:!0,data:[],font:{size:"12px",color:"#666",textAlign:"center"},line:{width:1,stroke:"#5879d1"},scale:{stroke:"#5879d1"}},series:[{smooth:!1,data:[],line:{width:1,stroke:"#5879d1",fill:"#5879d155"},point:{size:3,stroke:"#5879d1",strokeWidth:1,fill:"#5879d155"}}]};this.option=G(t,n),this._init(),t.el.appendChild(this.ctx.canvas),this.draw()}_init(){const t=document.createElement("canvas");this.ctx=t.getContext("2d"),this._change();const n=this.option.slider;this._cfg.slider={left:n.start*t.width,right:n.end*t.width},t.addEventListener("mousemove",e=>{const o=e.offsetX,i=e.offsetY;this._inSlider(o,i)?t.style.cursor="ew-resize":this._inRectangle(o,i)?t.style.cursor="move":t.style.cursor="default"}),t.addEventListener("mousedown",e=>{const o=e.offsetX,i=e.offsetY,r=this,s=r._cfg.slider,a=o-s.left,l=Math.floor(s.right-s.left);function g(m){const _=p=>{r.pause(),m==="block"?(s.left=Math.floor(p.offsetX-a),s.right=s.left+l):s[m]=p.offsetX,s.left>=s.right&&(s.left=s.right-4),s.right<=s.left&&(s.right=s.left+4),s.left<0&&(s.left=0,s.right=s.left+l),s.right>t.width&&(s.right=t.width,s.left=s.right-l),r.draw()};t.addEventListener("mousemove",_);const d=p=>{t.removeEventListener("mousemove",_),document.removeEventListener("mouseup",d)};document.addEventListener("mouseup",d)}this._inSlider(o,i,"left")?g("left"):this._inSlider(o,i,"right")?g("right"):this._inRectangle(o,i)&&g("block")})}_change(){const t=this.option.width||this.option.el.offsetWidth,n=this.option.height||this.option.el.offsetHeight;this.ctx.canvas.width=t,this.ctx.canvas.height=n,this._cfg.contentH=n-(this.option.xAxis.height||24)}refresh(){this._change(),this.draw()}draw(){const{width:t,height:n}=this.ctx.canvas;this.ctx.clearRect(0,0,t,n),this.option.series.forEach(e=>{this._drawData(e)}),this._drawSlider(),this._drawXAxisScaleLine(),this._drawXAxisData()}_drawData(t){const n=this.ctx,{width:e}=n.canvas,o=this._cfg.contentH,i=t.data,r=Math.max(...i),s=e/(i.length-1);this._cfg.gap=s;const a=t.line;n.beginPath(),n.lineWidth=a.width,n.strokeStyle=a.stroke;const l=t.smooth,g=[0,Math.ceil(o-i[0]/r*o)];n.moveTo(g[0],g[1]);const m=[g];for(let d=1;d<i.length;d++){const p=[s*d,Math.ceil(o-i[d]/r*o)];l?m.push(p):n.lineTo(...p)}if(l){const d=F(m,o/300);for(let p=1;p<m.length;p++)n.bezierCurveTo(...d[p-1],...m[p])}n.stroke(),n.strokeStyle="transparent",n.lineTo(e,o),n.lineTo(0,o),n.fillStyle=a.fill,n.fill();const _=Object.assign({size:3,stroke:"#5879d1",strokeWidth:1},t.point);if(this.option.isPoint){n.fillStyle=_.fill,n.strokeStyle=_.stroke,n.lineWidth=_.strokeWidth;for(let d=0;d<i.length;d++)n.beginPath(),n.arc(s*d,o-i[d]/r*o,_.size,0,2*Math.PI),n.fill(),n.stroke()}}_drawXAxisScaleLine(){const t=this.ctx,{width:n}=t.canvas,e=this._cfg.contentH,o=Object.assign({width:.5,stroke:"#000"},this.option.xAxis.scale);t.beginPath(),t.strokeStyle=o.stroke,t.lineWidth=o.width,t.moveTo(0,e),t.lineTo(n,e),t.stroke();const i=this.option.xAxis.data,r=this._cfg.gap,s=Object.assign({stroke:"#000"});t.strokeStyle=s.stroke;for(let a=0;a<i.length;a++)t.beginPath(),t.moveTo(r*a,e),t.lineTo(r*a,e+5),t.stroke()}_drawXAxisData(){const t=this.ctx,n=this.option.xAxis,e=n.font,o=$(n.data,t.canvas.width,{fontSize:parseInt(e.size),last:!0}),i=this._cfg.gap,r=this._cfg.contentH;if(n.show){t.beginPath(),t.textAlign=e.textAlign,t.font=e.size+" Arial",t.fillStyle=e.color;for(let s=0;s<o.length;s++)t.fillText(o[s],i*s,r+20);t.stroke()}}_drawSlider(){const t=this.ctx,{left:n,right:e}=this._cfg.slider,o=this._cfg.contentH,i=this.option.slider;t.beginPath(),t.fillStyle=i.color,t.rect(n,0,e-n,o),t.fill(),t.beginPath(),t.lineWidth=i.width,t.strokeStyle=i.stroke,t.moveTo(n,0),t.lineTo(n,o),t.stroke(),t.beginPath(),t.moveTo(e,0),t.lineTo(e,o),t.stroke(),this._getSliderData()}destroy(){this.ctx.canvas.remove()}_getSliderData(){const{left:t,right:n}=this._cfg.slider,e=this.ctx.canvas.width/(this.option.xAxis.data.length-1),o=Math.ceil(t/e),i=Math.floor(n/e);if(this._backupSilderIndex[0]!==o||this._backupSilderIndex[1]!==i){this._backupSilderIndex=[o,i];const r=this.option.onSliderIndexChange;r&&r(o,i)}}_inContent(t){return t>=0&&t<=this._cfg.contentH}_inSlider(t,n,e="both"){const{left:o,right:i}=this._cfg.slider,r=this.option.slider.width,s=this._inContent(n),a=t>=o-r&&t<=o+r;if(e==="left")return a&&s;const l=t>=i-r&&t<=i+r;return e==="right"?l&&s:(a||l)&&s}_inRectangle(t,n){const{left:e,right:o}=this._cfg.slider;return t>=e&&t<=o&&this._inContent(n)}_inPoint(t,n){if(!this.option.isPoint)return!1;const e=this._cfg.gap,{series:o}=this.option;for(let i=0;i<o.length;i++){const r=o[i].data;for(let s=0;s<r.length;s++)console.log(e*s,n)}}get isPlay(){return!!this._timer}play(t=!1){if(this.isPlay)return;this._cfg.slider.right>=this.ctx.canvas.width&&(this._cfg.slider.left=0,this._cfg.slider.right=2);const n=this.option.playSpeed;this._timer=setInterval(()=>{if(this._cfg.slider.right>=this.ctx.canvas.width){clearInterval(this._timer),this._timer=null;const e=this.option.onPlayEnd;e&&e(this.isPlay);return}t&&(this._cfg.slider.left+=n),this._cfg.slider.right+=n,this.draw()},16)}pause(){clearInterval(this._timer),this._timer=null}togglePlay(t=!1){this.isPlay?this.pause():this.play(t)}}const gt=()=>{const c=document.getElementById("container"),t=new dt({el:c,height:200,xAxis:{data:["2021","2022","2023","2024","2025","2026"]},series:[{data:[120,230,220,907,150,101]}],onSliderIndexChange(e,o){console.log(e,o)}}),n=document.createElement("button");n.innerText="play",n.addEventListener("click",()=>{t._cfg.slider.left=0,t._cfg.slider.right=t._cfg.gap,t.play(!0)}),c.appendChild(n)},ft=Object.freeze(Object.defineProperty({__proto__:null,default:gt},Symbol.toStringTag,{value:"Module"}));var X,W,T;class pt{constructor(t){u(this,"_canvas");u(this,"_ctx");u(this,"option");u(this,"_dpr",window.devicePixelRatio||1);A(this,X,0);A(this,W,0);A(this,T,0);u(this,"_animationId",null);var o;this.option=Object.assign({percentage:0,radian:1,color:"#0080ff",noTransition:!1,speed:1},t),(o=this.option).size??(o.size=t.el.clientWidth),this.option.size=Array.isArray(this.option.size)?this.option.size:[this.option.size,this.option.size],this._canvas=document.createElement("canvas");const n=this.option.size[0],e=this.option.size[1];this._canvas.style.width=n+"px",this._canvas.style.height=e+"px",this._canvas.width=n*this._dpr,this._canvas.height=e*this._dpr,t.el.appendChild(this._canvas),this._ctx=this._canvas.getContext("2d"),this._ctx.scale(this._dpr,this._dpr),j(this,T,this._canvas.width/2),this.animation()}_drawWave(t){const n=this._ctx,e=E(this,T),o=E(this,W)/this._dpr,i=E(this,X);function r(l){const g=e*(l+1)+t;return l===0?n.moveTo(e*l+t,o):n.lineTo(e*l+t,o),n.quadraticCurveTo(e*(l+1)-e/2+t,o+i,g,o),g}function s(l){const g=e*(l+1)+t;return l===0?n.moveTo(e*l+t,o):n.lineTo(e*l+t,o),n.quadraticCurveTo(e*(l+1)-e/2+t,o*2-(o+i),g,o),g}let a=0;return function(g){for(;a<=g;){const m=J(a)?r(a):s(a);if(a===g)return m;a++}}}_graph(t=0,n="#00f"){this._ctx.beginPath();const e=this._drawWave(t),o=this._canvas.width/E(this,T)*2,i=e(o);this._ctx.lineTo(i,E(this,W)),this._ctx.lineTo(i,this._canvas.height),this._ctx.lineTo(t,this._canvas.height),this._ctx.closePath(),this._ctx.fillStyle=n,this._ctx.fill()}animation(){let t=-this._canvas.width,n=-this._canvas.width,e=-this._canvas.width,o=0;const i=this;r();function r(){o>i.option.percentage&&o--,o<i.option.percentage&&o++,j(i,W,i._canvas.height-i._canvas.height*(o/100));const s=o<60?o/2:(100-o)/2+10;j(i,X,s*i.option.radian*i._dpr),t>0&&(t=-i._canvas.width),n>0&&(n=-i._canvas.width),e>0&&(e=-i._canvas.width),i._ctx.clearRect(0,0,i._canvas.width,i._canvas.height);const a=i.option.color;i._graph(t,a+"33"),i._graph(n,a+"55"),i._graph(e,a),t+=4*i.option.speed,n+=3*i.option.speed,e+=2*i.option.speed,i._animationId=requestAnimationFrame(r)}}refresh(){var i;if((i=this.option).size??(i.size=this.option.el.clientWidth),this.option.size=Array.isArray(this.option.size)?this.option.size:[this.option.size,this.option.size],this._canvas.width=this.option.size[0],this._canvas.height=this.option.size[1],j(this,T,this._canvas.width/2),this.option.noTransition)return;let t=0,n=null;const e=this;(function(){cancelAnimationFrame(e._animationId),t=e.option.percentage,e.option.percentage=0,o(),e.animation()})();function o(){if(e.option.percentage>=t){cancelAnimationFrame(n);return}e.option.percentage++,n=requestAnimationFrame(o)}}}X=new WeakMap,W=new WeakMap,T=new WeakMap;const ut=()=>{const c=document.getElementById("container"),t=new pt({el:c,percentage:30,size:300});t._canvas.style.borderRadius="50%",setInterval(()=>{const n=Math.random()*100;t.option.percentage=n,t.option.color=n>60?"#ffaa00":"#0080ff"},2e3)},xt=Object.freeze(Object.defineProperty({__proto__:null,default:ut},Symbol.toStringTag,{value:"Module"}));class mt{constructor(t){u(this,"option");u(this,"ctx");u(this,"dpr",window.devicePixelRatio||1);u(this,"_collectPolygons",[]);this.option=t;const n=document.createElement("canvas"),e=t.width||t.el.clientWidth,o=t.height||t.el.clientHeight;n.style.width=e+"px",n.style.height=o+"px",n.width=e*this.dpr,n.height=o*this.dpr,this.ctx=n.getContext("2d"),this.ctx.scale(this.dpr,this.dpr),t.el.appendChild(n),this.draw(),this.event()}draw(t,n){const{width:e,height:o}=this.ctx.canvas;this.ctx.clearRect(0,0,e,o);const i=this.option.controls;for(let r=0;r<i.length;r++)this._drawControl(i[r],t===r&&n)}refresh(){this.draw()}_drawControl(t,n){const{width:e,height:o}=this.ctx.canvas,i=this.ctx,r=t.outerSize,s=r/2,a=(r-(t.interSize||0))/2;let l=0;const g=[];t.data.forEach(h=>{if(h.value>1){const w=h.value-1,k=[];for(let S=1;S<=w;S++)k.push(l+S);g.push(...k)}l+=h.value||1});const m=r/2+(e/this.dpr-r)/2,_=r/2+(o/this.dpr-r)/2;let d=H(m,_,s,l),p=H(m,_,s-a,l);if(l>t.data.length){for(const h of g)delete d[h],delete p[h];d=d.filter(Boolean),p=p.filter(Boolean)}i.textAlign="center",i.lineWidth=t.lineWidth||3;let L=0;const f=[],y=d.length;for(let h=0;h<y;h++){const w=h===y-1?0:h+1,k=p[h],S=p[w],v=d[h],P=d[w],x=[{x:k[0],y:k[1]},{x:S[0],y:S[1]},{x:P[0],y:P[1]},{x:v[0],y:v[1]}];f.push(x),i.strokeStyle=t.lineColor,i.beginPath();const C=Math.PI*2/l;i.moveTo(x[0].x,x[0].y),i.lineTo(x[3].x,x[3].y);const b=t.data[h].value||1;i.arc(m,_,s-a,C*L,C*(L+b)),i.lineTo(x[1].x,x[1].y),i.arc(m,_,s,C*(L+b),C*L,!0),L+=b,i.stroke(),n===h&&t.activeBackground?i.fillStyle=t.activeBackground:i.fillStyle=t.background,i.fill(),i.fillStyle=t.color;const I=N(x),z=t.data[h].name.split(`
`),R=t.data[h].offset||[0,0];z.forEach((D,O)=>{i.fillText(D,I.x+R[0],I.y+R[1]+O*14)})}this._collectPolygons.push(f)}queryPosition(t,n){const e=this._collectPolygons;let o=-1,i=-1;t:for(let r=0;r<e.length;r++){const s=e[r];for(let a=0;a<s.length;a++){const l=s[a];if(U(t,n,l)){o=r,i=a;break t}}}return{layer:o,index:i}}event(){const t=this.ctx.canvas,{controls:n}=this.option;t.addEventListener("mousemove",e=>{const{layer:o,index:i}=this.queryPosition(e.offsetX,e.offsetY);[o,i].includes(-1)?(this.draw(),t.style.cursor="default"):(this.draw(o,i),t.style.cursor="pointer")}),t.addEventListener("click",e=>{const{layer:o,index:i}=this.queryPosition(e.offsetX,e.offsetY);if([o,i].includes(-1))return;const{handle:r}=n[o].data[i];r&&r()})}}const vt=()=>{const c=document.getElementById("container");new mt({el:c,height:300,controls:[{outerSize:140,interSize:40,color:"white",background:"#475dbd",lineColor:"#D1D1D3",lineWidth:3,data:[{name:"效果",value:4,offset:[6,8]},{name:"外部查询",value:2},{name:"布局",value:3},{name:"操作",value:4,offset:[6,-8]}]},{outerSize:280,interSize:144,color:"white",background:"#65656C",lineColor:"#D1D1D3",lineWidth:3,activeBackground:"#32325D",data:[{name:"隐藏",icon:"",handle(){console.log("隐藏")}},{name:"锁定",icon:"",handle(){}},{name:"固定",icon:""},{name:"聚焦",icon:""},{name:"恶意IP画像",icon:""},{name:"路径搜索",icon:""},{name:"横向布局",icon:""},{name:"纵向布局",icon:""},{name:"网格布局",icon:""},{name:"扩展",icon:""},{name:"收藏",icon:""},{name:"标记",icon:""},{name:"标签",icon:""}]}]})},_t=Object.freeze(Object.defineProperty({__proto__:null,default:vt},Symbol.toStringTag,{value:"Module"})),yt="# 数据连线\n\n## Option\n\n| 属性名 | 说明 | 类型 | 默认值 | 备注 |\n| --- | --- | --- | --- | --- |\n| el* | 绑定元素 | `HTMLElement` | - | - |\n| leftLen* | 左侧点个数 | `number` | - | - |\n| rightLen* | 右侧点个数 | `number` | - | - |\n| type | 连接类型 | `string` | single-single | 连接模式（一对一、一对多、多对一、多对多） |\n| width | 指定宽度 | `number` | el 的宽 | - |\n| height | 指定高度 | `number` | el 的高 | - |\n| gap | 每行点之间的间距 | `number` | 40 | - |\n| size | 点大小 | `number` | 8 | - |\n| fillStyle | 填充颜色 | `string` | #0080ff | - |\n| lineWidth | 连线宽度 | `number` | 2 | - |\n",wt=`# 时间轴过滤

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| el* | 绑定元素 | \`HTMLElement\` | - | - |
| xAxis* | 横坐标配置 | \`object\` | - | - |
| series* | 数据配置 | \`object\` | - | - |
| width | 指定宽度 | \`number\` | - | - |
| height | 指定高度 | \`number\` | - | - |
| slider | 滑块配置 | \`object\` | - | - |
| isPoint | 是否显示点 | \`boolean\` | true | - |
| playSpeed | 播放速度 | \`number\` | 4 | - |
| onSliderIndexChange | 滑块内索引变化 | \`(start: number, end: number) => void\` | - | - |

## Enevt

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| refresh | 一般在容器大小改变后调用 | - |
| play | 播放 | fiexd 是否固定滑块大小 |
| puase | 暂停播放 | |
`,bt=`# 波浪百分比

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| el* | 挂载元素 | \`HTMLElement\` | - | - |
| percentage* | 百分比 | \`number\` | 0 | 取值范围：0-100 |
| radian | 波浪弧度 | \`number\` | 1 | - |
| color | 颜色 | \`string\` | #0080ff | 仅支持 16 进制 |
| size | 容器的大小 | \`number \\| [number, number]\` | 父元素宽度 | 单位（px） |
| noTransition | 刷新时不过渡 | \`boolean\` | false | - |
| speed | 动画速度 | \`number\` | 1 | - |

## Enevt

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| refresh | 一般在容器大小改变后调用 | - |

\`\`\`ts
const wait = new ChartWait()
window.addEventListener('resize', () => {
  wait.refresh();
})
\`\`\`
`,St=`# 转盘菜单

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| el* | 挂载元素 | \`HTMLElement\` | - | - |
| width | 画布宽度 | \`number\` | 默认取父元素的宽度 | - |
| height | 画布高度 | \`number\` | 默认取父元素的高度 | - |
| controls | 圆盘配置 | \`Control[]\` | - | - |

## Enevt

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| refresh | 一般在容器大小改变后调用 | - |
`;function Pt(){return V({codeObj:Object.assign({"/core/canvas/joinLine/index.ts":tt,"/core/canvas/timebar/index.ts":nt,"/core/canvas/wave/index.ts":et,"/core/canvas/wheelDisc/index.ts":it}),demoObj:Object.assign({"/core/canvas/joinLine/demo.ts":ot,"/core/canvas/timebar/demo.ts":st,"/core/canvas/wave/demo.ts":rt,"/core/canvas/wheelDisc/demo.ts":at}),execObj:Object.assign({"/core/canvas/joinLine/demo.ts":ht,"/core/canvas/timebar/demo.ts":ft,"/core/canvas/wave/demo.ts":xt,"/core/canvas/wheelDisc/demo.ts":_t}),readmeObj:Object.assign({"/core/canvas/joinLine/readme.md":yt,"/core/canvas/timebar/readme.md":wt,"/core/canvas/wave/readme.md":bt,"/core/canvas/wheelDisc/readme.md":St}),path:`${Z}/canvas/`})}function Yt(c){return K(Q,{...c,getSource:Pt})}export{Yt as default,Pt as getCanvasSourceCode};
