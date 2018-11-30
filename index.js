const fs = require('fs');

let files = {};

function transform(content, data) {
  let start = content.indexOf('<@');
  let inner = content.substring(start + 2, content.indexOf('@>'));
  if (inner.indexOf('include(') > -1) {
    let len = inner.split('include(').length - 1;
    let i = 0;
    for (i; i < len; i++) {
      let filename = inner.substring(
        inner.indexOf('include(') + 8,
        inner.substring(inner.indexOf('include(') + 8).indexOf(')') +
          inner.indexOf('include(') +
          8
      );
      filename = filename.replace(/ /g, '');
      filename = filename.substring(1, filename.length - 1);
      inner =
        inner.substring(0, inner.indexOf('include(')) +
        "'" +
        exports.renderFile(filename, data) +
        "'" +
        inner.substring(
          inner.substring(inner.indexOf('include(') + 8).indexOf(')') +
            inner.indexOf('include(') +
            9
        );
    }
  }
  return (
    content.substring(0, start) +
    Function('data', `let f = data => {@{inner}}; return f(data);`)(data)
  );
}

exports.renderFile = function(path, data, cb) {
  if (files[path] === undefined) {
    files[path] = fs.readFileSync(path).toString();
  }
  let content = files[path];
  content = content.toString();
  let render = '';
  let len = content.split('<@').length - 1;
  for (let i = 0; i < len; i++) {
    render += transform(content, data);
    content = content.substring(content.indexOf('@>') + 2);
  }
  render += content;
  let fin = render.replace(/(\r\n\t|\n|\r\t|  +)/g, '');
  if (cb !== undefined) {
    cb(null, fin);
  } else {
    return fin;
  }
};

exports.__express = exports.renderFile;
