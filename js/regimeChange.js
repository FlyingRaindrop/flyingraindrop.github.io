var RegimeChange = (function(){
	var wm,
			tiling = $('.tiling'),
			mapItem = $('.map__item'),
			tile,
			wmWidth,
			wmHeight;

	var init = function(){
		_setUpListners();
	};

	var _setUpListners = function(){
		$('img').load(function(){
			tile = $('.mode__tile_active');
			wm = $('.processed_wm');
			if(tile.length > 0){
				_regimeTile();
				Tiling.remove();
				Tiling.remove();
				Tiling.reset();
				Tiling.init();
			}
		});

		$('.mode__single').on('click', _regimeSingle);
		$('.mode__single').on('click', function(){
				$(mapItem).removeClass('map__item_active');
				$(mapItem[0]).addClass('map__item_active');
				$(this).addClass('mode__single_active');
				Positioning.sizesChange();
		});
		$('.mode__tile').on('click', _regimeTile);
	};

	var _regimeSingle = function(){
			wm = $('.processed_wm');
			wmWidth = wm.width();
			wmHeight = wm.height();
			$('.mode__tile').removeClass('mode__tile_active');
			$('.map__tiling').css({'display': 'none'});
			tiling.css({'left': 0,
									'top': 0,
									'width': wmWidth,
									'height': wmHeight});
			Tiling.remove();
	};

	var _regimeTile = function(){
		if($('.mode__tile_active').length == 0){
			Positioning.reset();
			$(this).addClass('mode__tile_active');
			$('.mode__single').removeClass('mode__single_active');
			$('.map__tiling').css({'display': 'block'});
			tiling.css({'left': 0,
									'top': 0});
			Tiling.init();
		}
	};


	return{
		init: init
	};
})();

RegimeChange.init();
