
export class BloomFilter {

  m:          number
  k:          number
  buckets:    Int8Array | Int16Array | Int32Array | number[]
  _locations: ArrayBuffer | Int8Array | Int16Array | Int32Array | number[]

  /**
   * 布隆过滤器
   * @param m 比特位大小
   * @param k hash 次数
   */
  constructor(m = 1024**2*8, k = 16) {
    const n = Math.ceil(m / 32);
    let i = -1;
    this.m = m = n * 32;
    this.k = k;

    if (typeof ArrayBuffer !== "undefined") {
      const kbytes = 1 << Math.ceil(Math.log(Math.ceil(Math.log(m) / Math.LN2 / 8)) / Math.LN2);
      const UnitArr = kbytes === 1 ? Uint8Array : kbytes === 2 ? Uint16Array : Uint32Array;
      const kbuffer = new ArrayBuffer(kbytes * k);
      const buckets = this.buckets = new Int32Array(n);
      if (m) while (++i < n) buckets[i] = m[i];
      // @ts-ignore
      this._locations = new UnitArr(kbuffer);
    } else {
      const buckets = this.buckets = [];
      if (m) while (++i < n) buckets[i] = m[i];
      else while (++i < n) buckets[i] = 0;
      this._locations = [];
    }
  }

  locations(v: string) {
    const k = this.k,
          m = this.m,
          r = this._locations,
          a = fnv_1a(v),
          b = fnv_1a(v, 1576284489); // The seed value is chosen randomly
    let x = a % m;
    for (let i = 0; i < k; ++i) {
      r[i] = x < 0 ? (x + m) : x;
      x = (x + b) % m;
    }
    return r;
  }

  /**
   * 添加内容
   * @param v 
   */
  add(v: string) {
    const l = this.locations(v);
    for (let i = 0; i < this.k; ++i) {
      this.buckets[Math.floor(l[i] / 32)] |= 1 << (l[i] % 32);
    }
  }

  /**
   * 查看有无添加过该内容
   * @param v 
   * @returns 
   */
  has(v: string) {
    let l = this.locations(v);
    for (let i = 0; i < this.k; ++i) {
      let b = l[i];
      if ((this.buckets[Math.floor(b / 32)] & (1 << (b % 32))) === 0) {
        return false;
      }
    }
    return true;
  }

  /**
   * 删除内容
   * @param v 
   */
  delete(v: string) {
    const l = this.locations(v);
    for (let i = 0; i < this.k; ++i) {
      let b = l[i];
      this.buckets[Math.floor(b / 32)] &= ~(1 << (b % 32));
    }
  }

  /**
   * 清空布隆过滤器
   */
  clear() {
    this.buckets.fill(0);
  }

  /**
   * 获取当前布隆过滤器的大小，单位是bit
   * @returns 
   */
  get size() {
    const buckets = this.buckets,
          len = buckets.length,
          m = this.m,
          k = this.k;
    let bits = 0;
    for (let i = 0, n = len; i < n; ++i) bits += popcnt(buckets[i]);
    return -m * Math.log(1 - bits / m) / k;
  }
}

// http://graphics.stanford.edu/~seander/bithacks.html#CountBitsSetParallel
function popcnt(v: number) {
  v -= (v >> 1) & 0x55555555;
  v = (v & 0x33333333) + ((v >> 2) & 0x33333333);
  return ((v + (v >> 4) & 0xf0f0f0f) * 0x1010101) >> 24;
}

// Fowler/Noll/Vo hashing.
// Nonstandard variation: this function optionally takes a seed value that is incorporated
// into the offset basis. According to http://www.isthe.com/chongo/tech/comp/fnv/index.html
// "almost any offset_basis will serve so long as it is non-zero".
function fnv_1a(v: string, seed = 0) {
  let a = 2166136261 ^ seed;
  for (let i = 0, n = v.length; i < n; ++i) {
    let c = v.charCodeAt(i),
        d = c & 0xff00;
    if (d) a = fnv_multiply(a ^ d >> 8);
    a = fnv_multiply(a ^ c & 0xff);
  }
  return fnv_mix(a);
}

// a * 16777619 mod 2**32
function fnv_multiply(a: number) {
  return a + (a << 1) + (a << 4) + (a << 7) + (a << 8) + (a << 24);
}

// See https://web.archive.org/web/20131019013225/http://home.comcast.net/~bretm/hash/6.html
function fnv_mix(a: number) {
  a += a << 13;
  a ^= a >>> 7;
  a += a << 3;
  a ^= a >>> 17;
  a += a << 5;
  return a & 0xffffffff;
}
