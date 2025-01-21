import { createAnimation, ScrollAnimation } from ".";

export default () => {
  const container = document.getElementById('container');
  container.style.height = '500px';
  container.style.position = 'relative';

  const htmlStr = `<div class='scroll-animation-wrap' style='height: 1100px;'>
    <div class='carry-off' style='margin-top: 300px; height: 500px; border: 1px dashed;'>
      <div class='remain' style='position: sticky; top: 0; height: 300px; border: 1px solid orange;'>
        <div class='box' style='width: 200px; height: 200px; background: red; position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto;'></div>
      </div>
    </div>
  </div>`
  const domparser = new DOMParser();
  const dom = domparser.parseFromString(htmlStr, 'text/html').body.firstChild;
  container.appendChild(dom);

  const absorb = new ScrollAnimation({
    scrollEl: container,
  });

  absorb.set(document.querySelector('.scroll-animation-wrap .box'), {
    opacity(scroll) {
      return createAnimation(100, 400, 0, 1)(scroll);
    },
    transform(scroll) {
      const ani = createAnimation(100, 300, -100, 0);
      return `translateX(${ani(scroll)}px)`;
    }
  })

  absorb.updateStyles();
  container.addEventListener('scroll', (e) => {
    absorb.updateStyles();
  })
}