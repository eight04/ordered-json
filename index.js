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
  const cleanOrder = order.map(s => typeof s === "string" ? s : s[0]);
  const nested = order.filter(Array.isArray);
  obj = orderedObject.create(obj, cleanOrder, "keep");
  for (const [key, order] of nested) {
    obj[key] = applyOrder(obj[key], order);
  }
  return obj;
}

module.exports = {parse, stringify};
