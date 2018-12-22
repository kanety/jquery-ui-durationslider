describe('jquery-durationslider', function() {
  beforeEach(function() {
    document.body.innerHTML = __html__['index.html'];
  });

  it('has basic sliders', function() {
    var $ex = $('#basic');
    var $hour = $('#basic_hour');
    var $minute = $('#basic_minute');
    $ex.durationslider({
      h: { elem: $hour },
      m: { elem: $minute }
    });

    expect($ex.val()).toEqual('10:08');
    expect($hour.slider('value')).toEqual(10);
    expect($minute.slider('value')).toEqual(8);

    $hour.slider('value', 11).trigger('slide', { value: 11 });
    $minute.slider('value', 9).trigger('slide', { value: 9 });
    expect($ex.val()).toEqual('11:09');
    expect($hour.slider('value')).toEqual(11);
    expect($minute.slider('value')).toEqual(9);
  });

  it('includes sliders for days and seconds', function() {
    var $ex = $('#extend');
    var $day = $('#extend_day');
    var $hour = $('#extend_hour');
    var $minute = $('#extend_minute');
    var $second = $('#extend_second');
    $ex.durationslider({
      format: 'd [DAYS] hh:mm:ss',
      d: { elem: $day },
      h: { elem: $hour },
      m: { elem: $minute },
      s: { elem: $second }
    });

    expect($ex.val()).toEqual('1 DAYS 10:08:59');
    expect($day.slider('value')).toEqual(1);
    expect($hour.slider('value')).toEqual(10);
    expect($minute.slider('value')).toEqual(8);
    expect($second.slider('value')).toEqual(59);
  });

  it('handles mousewheel', function() {
    // IE can't handle WheelEvent
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.indexOf('msie') != -1 || ua.indexOf('trident') != -1) {
      return;
    }

    var $ex = $('#wheel');
    var $hour = $('#wheel_hour');
    var $minute = $('#wheel_minute');
    $('#wheel').durationslider({
      h: { elem: $hour },
      m: { elem: $minute },
      mousewheel: true
    });

    $hour.find('.ui-slider-handle').addClass('ui-state-focus');
    $minute.find('.ui-slider-handle').addClass('ui-state-focus');

    var event = new WheelEvent('wheel', { deltaX: 0, deltaY: -1, deltaZ: 0 });
    window.dispatchEvent(event);

    expect($ex.val()).toEqual('11:11');
  });
});
