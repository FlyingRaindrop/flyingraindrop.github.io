var slider = (function() {
	
    function sendValues(sliderBlock) {
        var value;
        value = sliderBlock.slider('value');
        wmOpacity = 1 - value;
    }

    function changeOpacity() {
    	$('.processed_wm').fadeTo(0, wmOpacity);
    }

    return {
        init: function() {
            var sliderBlock = $('.opacity__block'),
                wmOpacity;

            sliderBlock.slider({
                range: "min",
                min: 0,
                max: 1,
                step: 0.01,
                value: 0,
                slide: function() {
                    sendValues(sliderBlock);
                    changeOpacity();
                },
                create: function() {
                    sendValues(sliderBlock);
                    changeOpacity();
                },
                change: function() {
                    sendValues(sliderBlock);
                    changeOpacity();
                }
            });
        }
    };
})();

slider.init();