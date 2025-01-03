import { computeControlPoint, filterExceed } from '../../utils/math'
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
