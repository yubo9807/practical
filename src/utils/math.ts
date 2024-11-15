/**
 * 获取圆上的点
 * @param centerX 中心点 x
 * @param centerY 中心点 y
 * @param radius  半径
 * @param number  个数
 * @returns 
 */
export function getCirclePoints(centerX: number, centerY: number, radius: number, number: number) {
  const points: [number, number][] = [];
  const angleIncrement = (2 * Math.PI) / number;

  for (let i = 0; i < number; i++) {
    const angle = i * angleIncrement;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push([x, y]);
  }

  return points;
}

/**
 * 是否为圆内的点
 * @param x 
 * @param y 
 * @param centerX 
 * @param centerY 
 * @param radius 
 * @returns 
 */
export function isPointInCircle(x: number, y: number, centerX: number, centerY: number, radius: number) {
  const distance = Math.sqrt(Math.pow((x - centerX), 2) + Math.pow((y - centerY), 2));
  return distance <= radius;
}

/**
 * 是否在闭合图形内
 * @param x 
 * @param y 
 * @param polygon 
 * @returns 
 */
export function isPointInPolygon(x: number, y: number, polygon: { x: number, y: number }[]) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x, yi = polygon[i].y;
    const xj = polygon[j].x, yj = polygon[j].y;
    const intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
 * 获取点所在的象限
 * @param x 
 * @param y 
 * @param centerX 
 * @param centerY 
 * @returns 
 */
export function getPointQuadrant(x: number, y: number, centerX: number, centerY: number) {
  if (x >= centerX && y >= centerY) return 1;
  if (x <= centerX && y >= centerY) return 2;
  if (x <= centerX && y <= centerY) return 3;
  if (x >= centerX && y <= centerY) return 4;
}

/**
 * 得到多边形的中心点
 * @param polygon 
 * @returns 
 */
export function calculateCentroid(polygon: { x: number, y: number }[]) {
  let sumX = 0;
  let sumY = 0;
  const numVertices = polygon.length;

  for (let i = 0; i < numVertices; i++) {
      sumX += polygon[i].x;
      sumY += polygon[i].y;
  }

  const centerX = sumX / numVertices;
  const centerY = sumY / numVertices;

  return { x: centerX, y: centerY };
}
