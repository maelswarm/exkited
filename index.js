const fs = require('fs');

let files = {};

function transform(content, data, lev) {
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
        compile(filename, data, ++lev).replace(/'/g, "\\'") +
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
    Function('data', `let f = data => {${inner}}; return f(data);`)(data)
  );
}

let rec = (obj, str, path, content, lev) => {
  for (const i in obj) {
    str = '';
    if (typeof obj[i] === 'object') {
      str += i;
      rec(obj[i], str, path, content);
    } else {
      if (content.indexOf(str + i) > -1 || lev === 1) {
        path += str + i + obj[i].toString().replace(/[^a-z0-9]+/g, '');
      }
    }
  }
  return path;
};

function constructKey(content, path, data, lev) {
  path = 'c' + path.replace(/[^a-z0-9]+/g, '');
  content = content.replace(/[^a-z0-9 ]+/g, '');
  return rec(data, '', path, content, lev);
}

function compile(path, data, lev) {
  if (files[path] === undefined) {
    files[path] = fs.readFileSync(path).toString();
  }
  let key = constructKey(files[path], path, data, lev);
  let render = '';
  let fin = '';
  if (files[key] != undefined) {
    fin = files[key];
  } else {
    console.log(key);
    let content = files[path];
    content = content.toString();
    let len = content.split('<@').length - 1;
    for (let i = 0; i < len; i++) {
      render += transform(content, data, lev);
      content = content.substring(content.indexOf('@>') + 2);
    }
    render += content;
    fin = render.replace(/(\r\n\t|\n|\r\t|  +)/g, '');
    if (files[key] === undefined) {
      files[key] = fin;
    }
  }
  return fin;
}

exports.renderFile = function(path, data, cb) {
  let fin = compile(path, data, 1);
  if (cb !== undefined) {
    cb(null, fin);
  }
  return fin;
};

exports.__express = exports.renderFile;
