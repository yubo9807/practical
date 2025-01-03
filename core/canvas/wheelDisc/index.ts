import { calculateCentroid, getCirclePoints, isPointInPolygon } from "../../utils/math"

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
      const texts = control.data[i].name.split('\n');
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

}