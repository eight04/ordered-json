function parse(text) {
  return wrap(JSON.parse(text));
}

function wrap(obj) {
  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      obj = obj.map(wrap);
    } else {
      obj = create(obj);
      for (const key of Object.keys(obj)) {
        obj[key] = wrap(obj[key]);
      }
    }
  }
  return obj;
}

function stringify(...args) {
  return JSON.stringify(...args);
}

function create(obj, keys = Object.keys(obj)) {
  return new Proxy(obj, {
    set: (target, prop, value) => {
      if (!(prop in target)) {
        keys.push(prop);
      }
      target[prop] = value;
      return true;
    },
    deleteProperty: (target, prop) => {
      if (prop in target) {
        const i = keys.indexOf(prop);
        if (i >= 0) {
          keys.splice(i, 1);
        }
        delete target[prop];
      }
      return true;
    },
    ownKeys: target => {
      return keys;
    }
  });
}

module.exports = {parse, stringify, create};
