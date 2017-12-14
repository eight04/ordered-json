ordered-json
============

A experimental module which can maintain key order while parsing/stringifying JSON.

Usage
-----
```js
const orderedJSON = require("ordered-json");

// {"c":3,"b":2,"a":1}
const json = orderedJSON.stringify({a: 1, b: 2, c: 3}, {order: ["c", "b", "a"]});

const obj = orderedJSON.parse(json);
// [3, 2, 1]
Object.values(obj);
```

API reference
-------------

### parse(json: string): any

Parse string into object. Does the result of `JSON.parse` has the same property order as `json`?

### stringify(obj: any, options?: object): string

`options` may contains following optional properties:

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

Changelog
---------

* 0.1.0 (Next)

    - First release.
