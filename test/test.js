/* eslint-env mocha */
const assert = require("power-assert");
const {parse, stringify} = require("../index");

describe("constraint", () => {
  it("JSON.parse must keep key order", () => {
    const json = '{"c": 1, "b": 2, "a": 3}';
    const keys = Object.keys(JSON.parse(json));
    assert.deepEqual(keys, ["c", "b", "a"]);
  });
  
  it("JSON.stringify must follow Object.keys() order", () => {
    const obj = new Proxy({a: 1, b: 2, c: 3}, {
      ownKeys: () => ["c", "a", "b"]
    });
    assert(JSON.stringify(obj) === '{"c":3,"a":1,"b":2}');
  });
});

describe("parse", () => {
  it("must parse correctly", () => {
    const json = '{"b": 1, "a": 2, "c": [1, 2, 3]}';
    assert.deepEqual(parse(json), JSON.parse(json));
  });
  
  it("keep key order", () => {
    const json = '{"b": 1, "a": 2, "c": [1, 2, 3]}';
    const keys = Object.keys(parse(json));
    assert.deepEqual(keys, ["b", "a", "c"]);
  });
});

describe("stringify", () => {
  it("must stringify correctly", () => {
    const json = stringify({a: 1, b: 2, c: 3}, ["b", "c", "a"]);
    assert(json === '{"b":2,"c":3,"a":1}');
  });
  
  it("nested order", () => {
    const json = stringify({a: {b: 1, c: 2}}, [["a", ["c", "b"]]]);
    assert(json === '{"a":{"c":2,"b":1}}');
  });
  
  it("keep unordered prop", () => {
    const json = stringify({a: 1, b: 2, c: 3}, ["c", "a"]);
    assert(json === '{"c":3,"b":2,"a":1}');
  });
});
