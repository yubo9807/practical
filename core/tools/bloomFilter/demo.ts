import { BloomFilter } from ".";

export default () => {
  const bloom = new BloomFilter(1024 * 8, 32);
  bloom.add('foo');
  bloom.add("bar");

  console.log('foo:', bloom.has('foo'));
  console.log('bar:', bloom.has('bar'));
  console.log('baz:', bloom.has('baz'));
}
