import { Inlay } from ".";

export default () => {
  const container = document.getElementById('container');
  container.innerText = 'hello';

  const inlay = new Inlay();
  inlay.text`
    --color: red;
    color: var(--color);
  `

  // @ts-ignore
  container.style = inlay.text;
}