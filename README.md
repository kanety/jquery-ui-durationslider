# jquery-ui-durationslider

Bind text box and jquery-ui slider for duration input.

## Dependencies

* jquery-ui
* moment
* moment-duration-format

## Installation

Install from npm:

    $ npm install @kanety/jquery-ui-durationslider- --save

## Usage

Make a text box and `div` elements for sliders:

```html
<div style="display: flex; align-items: center;">
  <div>
    <input id="text" type="text" value="10:08" style="width: 5em;" />
  </div>
  <div>
    <div id="hour" style="width: 150px;"></div>
    <div id="minute" style="width: 150px;"></div>
  </div>
</div>
```

Then:

```javascript
$('#text').durationslider({
  sliders: {
    h: { elem: '#hour' },
    m: { elem: '#minute' }
  }
});
```

If you want a slider for seconds:

```javascript
$('#text').durationslider({
  sliders: {
    h: { elem: '#hour' },
    m: { elem: '#minute' },
    s: { elem: '#second' }
  }
});
```

Customize max value and step value:

```javascript
$('#text').durationslider({
  sliders: {
    h: { elem: '#hour', max: 48 },
    m: { elem: '#minute', step: 5 }
  }
});
```

Customize duration format:

```javascript
$('#text').durationslider({
  format: 'h.mm'
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
