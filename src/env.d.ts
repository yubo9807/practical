import { IntrinsicElements as PlIntrinsicElements } from 'pl-react/lib/jsx';

declare global {
  namespace JSX {
    interface IntrinsicElements extends PlIntrinsicElements {}
  }
}
