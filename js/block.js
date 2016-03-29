var Block = (function(){

    var init = function(){
        _disable();
    };

	var _disable = function(){
		var inputImg = $('#source'),
				inputWm = $('#watermark');
		$(inputImg).change(function() {
			if (inputImg.val() != ''){
				$('.wm-wrap').removeClass('disable');
			} else {
				$('.wm-wrap').addClass('disable');
			}
		});
		$(inputWm).change(function() {
			if (inputWm.val() != ''){
				$('.settings-wrap').removeClass('disable');
			} else {
				$('.wm-wrap').addClass('disable');
			}
		});
	};

    return{
        init: init
    };
})();

Block.init();