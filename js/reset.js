$('.button__reset').on('click', function(e) {
	var tile = $('.mode__tile_active'),
			single = $('.mode__single_active'),
			sliderBlock = $('.scale__block'),
			wmScale = wmScaleSlider.sendValues(sliderBlock);
	e.preventDefault();
	slider.init();
	wmScaleSlider.init();
	if((tile.length > 0)){
		Tiling.reset();
		if((wmScale < 1)){
			Tiling.remove();
		Tiling.init();
		}
	}
	if(single.length > 0){
		Positioning.reset();
	}
});