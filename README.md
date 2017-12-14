ordered-json
============

A experimental module which can maintain key order while parsing/stringifying JSON.

Usage
-----
```js
const orderedJSON = require("ordered-json");

const json = orderedJSON.stringify({a: 1, b: 2, c: 3}, {order: ["c", "b", "a"]});
// -> {"c":3,"b":2,"a":1}

const obj = orderedJSON.parse(json);
Object.values(obj); // [3, 2, 1]
```

API reference
-------------

### parse(json: string): any

Parse string into object. Does the result of `JSON.parse` has the same property order as `json`?

### stringify(obj: any, options?: object | array): string

`options` object may contains following optional properties:

* `replacer` - function.
* `space` - number | string, default to `""`.

* `order` - Array<string | Array>.

  Specify property order. The element can be a key or a `[key, nestedObjectPropertyOrder]` tuple. For example:
  
  ```js
  stringify({a: {c: 1, d: 2}, b: 2}, {order: [
    "b",
    ["a", [
      "d",
      "c"
    ]]
  ]})
  ```
  would result in
  ```
  {"b":2,"a":{"d":2,"c":1}}
  ```
  If a property is missing in `order`, it would be kept at the same position (index).
  
If `options` is an array, it is used as `options.order`.

Benchmark
---------
See `bench/bench.js`.
```
====
Start benching parse
orderedJSON.parse x 2,398 ops/sec ±0.96% (86 runs sampled)
JSON.parse x 20,926 ops/sec ±0.57% (89 runs sampled)
Fastest is JSON.parse
====
====
Start benching stringify
ordered object x 4,979 ops/sec ±0.61% (90 runs sampled)
normal object x 32,246 ops/sec ±0.35% (90 runs sampled)
Fastest is normal object
====
```

Changelog
---------

* 0.1.0 (Dec 14, 2017)

    - First release.
