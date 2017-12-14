/* eslint no-console: 0 */
const fs = require("fs");
const Benchmark = require("benchmark");
const orderedJSON = require("../index");
const json = fs.readFileSync(__dirname + "/test.json");

bench("parse", {
  "orderedJSON.parse": () => {
    orderedJSON.parse(json);
  },
  "JSON.parse": () => {
    JSON.parse(json);
  }
});

const obj = JSON.parse(json);
const ordered = orderedJSON.parse(json);

bench("stringify", {
  "ordered object": () => {
    orderedJSON.stringify(ordered);
  },
  "normal object": () => {
    JSON.stringify(obj);
  }
});

function bench(title, cases) {
  console.log(`====\nStart benching ${title}`);
  const suite = new Benchmark.Suite;
  Object.entries(cases).forEach(args => suite.add(...args));
  suite
    .on("cycle", e => {
      console.log(String(e.target));
    })
    .on("complete", function() {
      console.log('Fastest is ' + this.filter('fastest').map('name') + '\n====');
    })
    .run();
}
