import { isPointInCircle } from "~/core/utils/math"

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
    canvas.style.width = `${canvas.width / _dpr}px`;
    canvas.style.height = `${canvas.height / _dpr}px`
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
      console.warn(`连线 [${x}, ${y}] 重复，当前模式：${this.option.type}`);
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
}