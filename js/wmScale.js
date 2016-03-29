var wmScaleSlider = (function() {

    function sendValues(sliderBlock) {
        var value;
        value = sliderBlock.slider('value');
        wmScale = value;
        return value;
    }

    function changeScale() {
        var wm = $('.processed_wm'),
            img = $('.processed_img'),
            wmHeight = wm.attr('data-height'),
            wmWidth = wm.attr('data-width');
        wm.css('width', wmWidth * wmScale)
            .css('height', wmHeight * wmScale);
    }

    function changePosition() {
        var wm = $('.processed_wm'),
            img = $('.processed_img'),
            tiling = $('.tiling'),
            wmLeftCurrent = parseInt(tiling.css('left').replace('px', '')),
            wmTopCurrent = parseInt(tiling.css('top').replace('px', '')),
            wmHeightCurrent = parseInt(tiling.height()),
            wmWidthCurrent = parseInt(tiling.width()),
            spinnerX = $('#coords-x'),
            spinnerY = $('#coords-y');

        if ((wmLeftCurrent + wmWidthCurrent) > img.width()) {
            tiling.css('left', wmLeftCurrent - (wmLeftCurrent + wmWidthCurrent - img.width()));
            spinnerX.val(parseInt(tiling.css('left').replace('px', '')));
        }
        if ((wmTopCurrent + wmHeightCurrent) > img.height()) {
            tiling.css('top', wmTopCurrent - (wmTopCurrent + wmHeightCurrent - img.height()));
            spinnerY.val(parseInt(tiling.css('top').replace('px', '')));
        }
        // ^
        // | This is just a mathemetic
        // |
    }

    return {
        sendValues: sendValues,
        init: function() {
            var sliderBlock = $('.scale__block'),
                wmScale;

            sliderBlock.slider({
                range: "min",
                min: 0,
                max: 1,
                step: 0.01,
                value: 1,
                slide: function() {
                  var single = $('.mode__single_active');
                  sendValues(sliderBlock);
                  changeScale();
                  if(single.length > 0){
                    changePosition();
                    Positioning.coords();
                  }
                },
                create: function() {
                  var single = $('.mode__single_active');
                  sendValues(sliderBlock);
                  changeScale();
                  if(single.length > 0){
                    changePosition();
                    Positioning.coords();
                  }
                },
                change: function() {
                  var single = $('.mode__single_active');
                  sendValues(sliderBlock);
                  changeScale();
                  if(single.length > 0){
                    changePosition();
                    Positioning.coords();
                  }
                },
                stop: function() {
                  var tile = $('.mode__tile_active'),
                      single = $('.mode__single_active');

                    if(tile.length > 0){
                      Tiling.remove();
                      Tiling.init();
                    }
                    if(single.length > 0){
                      Positioning.coords();
                    }
                }
            });
        }
    };
})();

wmScaleSlider.init();
