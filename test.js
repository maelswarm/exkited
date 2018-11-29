const ejs = require('ejs');
const exkited = require('./index.js');

let exkitedTotal = [];
let ejsTotal = [];

let exkitedTimes = [];
let ejsTimes = [];

for (let x = 0; x < 10; x++) {
  for (let i = 0; i < 10000; i++) {
    let start = Date.now();
    exkited.renderFile(
      './views/basic.exkited',
      { a: 0, dayIdx: 3, prices: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
      (err, rendered) => {
        exkitedTimes.push(Date.now() - start);
      }
    );
  }
  exkitedTimes.forEach(a => {
    exkitedTotal.push(a);
  });
}
let total = 0;
exkitedTotal.forEach(a => {
  total += a;
});
console.log('Exkited');
console.log(total / exkitedTotal.length + 'ms');

for (let x = 0; x < 10; x++) {
  for (let i = 0; i < 10000; i++) {
    let start = Date.now();
    ejs.renderFile(
      './views-ejs/basic.ejs',
      { a: 0, title: 'hamburger', message: 'hello' },
      {},
      function(err, str) {
        //console.log(str);
        ejsTimes.push(Date.now() - start);
      }
    );
  }
  ejsTimes.forEach(a => {
    ejsTotal.push(a);
  });
}

total = 0;
ejsTotal.forEach(a => {
  total += a;
});
console.log('ejs');
console.log(total / ejsTotal.length + 'ms');
