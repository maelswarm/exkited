# exkited

Simplistic Template Language

Exkited is a minimalistic templating language that lets you generate markup with JavaScript.

## Example .exkited File

```
<html>
    <div class="title">
        <@ return data.title @> // A 'data' object may be passed rendering.
    </div>
    <@
        let result = '';
        for(let x=0;x<10;x++) {
            for(let i=0;i<4;i++) {
                for(let j=0;j<4;j++){
                    result += `<div>@{i+j}</div>`;
                }
            }
        }
        return result;
    @>
    <div class="average-price">
        <@ return data.prices.reduce((accum, val) => accum += val) / data.prices.length; @>
    </div>
    <div class="day-of-week">
        <@
            switch(data.dayIdx) {
                case 0:
                return 'Sunday';
                break;
                case 1:
                return 'Monday';
                break;
                case 2:
                return 'Tuesday';
                break;
                case 3:
                return 'Wednesday';
                break;
                case 3:
                return 'Thursday';
                break;
                case 3:
                return 'Friday';
                break;
                case 3:
                return 'Saturday';
                break;
            }
        @>
    </div>
</html>
```

## Pairing with Express.js

```
npm install exkited express compression
```

```js
const http = require('http');
const express = require('express');
const compression = require('compression');
const app = express();

app.use(bodyParser.json());
app.use(compression());
app.set('view engine', 'exkited');
app.set('views', './views');

let server = http.createServer(app).listen(8888, '127.0.0.1');

app.get('/', function(req, res) {
  res.render('basic', {}, function(err, html) {
    res.send(html);
  });
});
```

## Benchmarks

Exkited vs. ejs

When Exkited and ejs are both paired with express.js, Exkited has a consistent "Waiting (TTFB)" that's ~4.5x faster than ejs.

More will be coming soon.
