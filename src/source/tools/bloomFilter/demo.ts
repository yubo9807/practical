import { BloomFilter } from ".";

export default () => {
  const bloom = new BloomFilter(1024 * 8, 32);
  bloom.add('foo');
  bloom.add("bar");

  const wrap = document.getElementById('container');
  wrap.innerText += bloom.has('foo') + '\n';
  wrap.innerText += bloom.has('bar') + '\n';
  wrap.innerText += bloom.has('baz') + '\n';
}
