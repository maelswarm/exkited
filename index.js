const fs = require('fs');

let files = {};

function transform(content, data) {
  let start = content.indexOf('<@');
  return (
    content.substring(0, start) +
    Function(
      'data',
      'let f = data => {' +
        content.substring(start + 2, content.indexOf('@>')) +
        '}; return f(data);'
    )(data)
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
  cb(null, render.replace(/(\r\n\t|\n|\r\t|  +)/g, ''));
};

exports.__express = exports.renderFile;
