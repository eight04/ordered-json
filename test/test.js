/* eslint-env mocha */

const assert = require("power-assert");
const {parse, stringify, create} = require("../index");

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

describe("create", () => {
  it("customized keys order", () => {
    const obj = {a: 1, b: 2, c: 3};
    const ordered = create(obj, ["c", "b", "a"]);
    assert.deepEqual(Object.values(ordered), [3, 2, 1]);
  });
});

describe("parse", () => {
  const json = '{"b": 1, "a": 2, "c": [1, 2, 3]}';
  
  it("must parse correctly", () => {
    assert.deepEqual(parse(json), JSON.parse(json));
  });
  
  it("keep key order", () => {
    const keys = Object.keys(parse(json));
    assert.deepEqual(keys, ["b", "a", "c"]);
  });
});

describe("stringify", () => {
  const obj = create({a: 1, b: 2, c: 3}, ["b", "c", "a"]);
  
  it("must stringify correctly", () => {
    assert(stringify(obj) === '{"b":2,"c":3,"a":1}');
  });
});
