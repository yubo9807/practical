
/**
 * 延时
 * @param time 
 * @returns 
 */
export function delay(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  })
}
