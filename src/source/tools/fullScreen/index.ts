
export class FullScreen {
  enterFullScreenName: string
  exitFullScreenName:  string
  fullScreenName:      string

  constructor() {
    // 兼容性属性查询
    this.enterFullScreenName = FullScreen.getPropertyName([
      'requestFullscreen',
      'mozRequestFullScreen',
      'webkitRequestFullScreen',
      'msRequestFullScreen',
    ], document.documentElement);
    this.exitFullScreenName = FullScreen.getPropertyName([
      'exitFullscreen',
      'mozCancelFullScreen',
      'webkitExitFullScreen',
      'msExitFullScreen',
    ], document);
    this.fullScreenName = FullScreen.getPropertyName([
      'fullscreenElement',
      'mozFullScreenElement',
      'webkitFullScreenElement',
      'msFullScreenElement',
    ], document);
  }

  static getPropertyName(names: string[], target: object) {
    return names.find(name => name in target);
  }

  /**
   * 进入全屏
   * @param el 
   */
  enter(el = document.documentElement) {
    this.enterFullScreenName && el[this.enterFullScreenName]();
  }

  /**
   * 退出全屏
   */
  exit() {
    this.isFull() && this.exitFullScreenName && document[this.exitFullScreenName]();
  }

  /**
   * 是否处于全屏状态
   * @returns 
   */
  isFull() {
    return !!this.getEl();
  }

  /**
   * 进入/退出全屏
   */
  toggle(el = document.documentElement) {
    this.isFull() ? this.exit() : this.enter(el);
  }

  /**
   * 获取当前全屏元素
   * @returns 
   */
  getEl() {
    return document[this.fullScreenName] || null;
  }

}
