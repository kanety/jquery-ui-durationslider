# jquery-ui-durationslider

Bind text field and jquery-ui slider for duration input.

## Dependencies

* jquery-ui
* moment
* moment-duration-format

## Installation

Install from npm:

    $ npm install @kanety/jquery-ui-durationslider --save

## Usage

Make a text field and `div` elements for sliders:

```html
<input id="text" type="text" value="10:08" style="width: 5em;" />
<div id="hour" style="width: 150px;"></div>
<div id="minute" style="width: 150px;"></div>
```

Then:

```javascript
$('#text').durationslider({
  h: { elem: '#hour' },
  m: { elem: '#minute' }
});
```

If you want a slider for seconds:

```javascript
$('#text').durationslider({
  h: { elem: '#hour' },
  m: { elem: '#minute' },
  s: { elem: '#second' }
});
```

Customize max value and step value:

```javascript
$('#text').durationslider({
  h: { elem: '#hour', max: 48 },
  m: { elem: '#minute', step: 5 }
});
```

Customize duration format:

```javascript
$('#text').durationslider({
  format: 'd [DAYS] hh.mm'
});
```

Enable mousewheel support (only modern browsers):

```javascript
$('#text').durationslider({
  mousewheel: true
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
