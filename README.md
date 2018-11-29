# exkited

Simplistic Template Engine

Exkited is made to be minimal and fast.

## Example .exkited File

Exkited is a minimalistic templating language that lets you generate markup with JavaScript.

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

## Benchmarks

More will be coming soon.
