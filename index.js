const orderedObject = require("ordered-object");

function parse(json) {
  return orderedObject.wrap(JSON.parse(json));
}

function stringify(target, options = {}) {
  if (Array.isArray(options)) {
    options = {order: options};
  }
  const {replacer, space, order} = options;
  if (order) {
    target = applyOrder(target, order);
  }
  return JSON.stringify(target, replacer, space);
}

function applyOrder(obj, order) {
  const keys = Object.keys(obj);
  const cleanOrder = insertMissingKeys(
    keys, order.map(s => typeof s === "string" ? s : s[0]));
  const nested = order.filter(Array.isArray);
  keys.sort(withOrder(cleanOrder));
  obj = orderedObject.create(obj, keys);
  for (const [key, order] of nested) {
    obj[key] = applyOrder(obj[key], order);
  }
  return obj;
}

function insertMissingKeys(keys, order) {
  // remove non-exist keys
  const keySet = new Set(keys);
  order = order.filter(k => keySet.has(k));
  
  // insert missing keys
  const orderSet = new Set(order);
  const output = [];
  let i = 0;
  for (const key of keys) {
    if (orderSet.has(key)) {
      output.push(order[i++]);
    } else {
      output.push(key);
    }
  }
  return output;
}

function withOrder(order) {
  const key2Index = new Map([...order.entries()].map(([i, k]) => [k, i]));
  return (a, b) => {
    const ai = key2Index.get(a);
    const bi = key2Index.get(b);
    if (ai != null && bi != null) {
      return ai - bi;
    }
    return 0;
  };
}

module.exports = {parse, stringify};
