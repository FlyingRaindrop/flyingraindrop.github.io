var Positioning = (function(){

	var mapList = $('.map__list'),
			mapItem = $('.map__item'),
			inputX = $('#coords-x'),
			inputY = $('#coords-y'),
			img = $('.processed_img'),
			wm = $('.processed_wm'),
			tile = $('.mode__tile_active'),
			single = $('.mode__single_active'),
			tiling = $('.tiling'),
			imgWidth,
			imgHeight,
			wmWidth,
			wmHeight,
			displacement;

	var init = function(){
		_sizesUpdate();
		_setUpListners();
		_coord();
		_coordSpin();
	};

	var _setUpListners = function(){
		mapList.on('click', _sector);
		tiling.mousedown( _mouseMove);
	};

	var reset = function() {
			//сброс секторов 
			$(mapItem).removeClass('map__item_active');
			$(mapItem[0]).addClass('map__item_active');
			//сброс инпутов
			inputX.val(0);
			inputY.val(0);
			wm.css({'top': 0, 'left':0});
	};

	var _sizesUpdate = function(){
		img.load(function(){
  		imgWidth = img.width(),
			imgHeight = img.height();
		});

			wm = $('.processed_wm');
			wm.load(function(){
				tile = $('.mode__tile_active');
				if(tile.length == 0){
					wmWidth = wm.width(),
					wmHeight = wm.height();
					tiling.css({'left': 0,
											'top': 0,
											'width': wmWidth,
											'height': wmHeight});
					$('.mode__single').addClass('mode__single_active');
					//сброс секторов 
					$(mapItem).removeClass('map__item_active');
					$(mapItem[0]).addClass('map__item_active');
					//сброс инпутов
					inputX.val(0);
					inputY.val(0);
					_mouseMove();
				}
			});

		mapList.on('click', function(){
			//Координаты для секторов
			displacement = [
					[0, 0],
					[0, (imgWidth/2) - (wmWidth/2)],
					[0, imgWidth - wmWidth],
					[(imgHeight/2) - (wmHeight/2), 0],
					[(imgHeight/2) - (wmHeight/2), (imgWidth/2) - (wmWidth/2)],
					[(imgHeight/2) - (wmHeight/2), imgWidth - wmWidth],
					[imgHeight - wmHeight, 0],
					[imgHeight - wmHeight, (imgWidth/2) - (wmWidth/2)],
					[imgHeight - wmHeight, imgWidth - wmWidth]
			];
		});
	};

//Пересчет размеров вотермарка
	var wmSizes = function(){
			wmWidth = wm.width();
			wmHeight = wm.height();
			tiling.css({'width': wmWidth,
									'height': wmHeight});
	};

	var sizesChange = function(){
		imgWidth = img.width(),
		imgHeight = img.height();
		wmWidth = wm.width(),
		wmHeight = wm.height();
	};

//Перемещение вотермарка с помощью секторов
	var _sector = function(e){
		$(mapItem).removeClass('map__item_active');
			for(var i=0; i<mapItem.length; i++){
				if(e.target == mapItem[i]){
					tiling.css({'top': displacement[i][0],
									'left':displacement[i][1]});
					inputX.val(displacement[i][1]);
					inputY.val(displacement[i][0]);
					$(mapItem[i]).addClass('map__item_active');
				}
			}
	};

//Перемещение вотермарка с помощью инпутов
	var _coord = function(){
		document.getElementById('coords-x').oninput = function(e){
			var x = this.value;
			if(x>=0 && x<=(imgWidth-wmWidth) && !isNaN(parseFloat(x)) && isFinite(x)){
				tiling.css({'left': x +'px'});
			}
		};
		document.getElementById('coords-y').oninput = function(e){
			var y = this.value;
			if(y>=0 && y<=(imgHeight-wmHeight) && !isNaN(parseFloat(y)) && isFinite(y)){
				tiling.css({'top': y +'px'});
			}
		};
	};

//Перемещение вотермарка с помощью мыши
	var _mouseMove = function(){
		var single = $('.mode__single_active');
		if(single.length > 0){
			tiling.draggable({
				cursor: 'move',
				drag: function(){
					single = $('.mode__single_active');
					if(single.length > 0){
						inputX.val($(this).position().left);
						inputY.val($(this).position().top);
					}
				},
				containment: '.preview__window-img'
			});
		}
	};

//Перемещение вотермарка спиннерами
	var _coordSpin = function(){
		var spinnerX = inputX.spinner({step: 2});
		var spinnerY = inputY.spinner({step: 2});

			spinnerX.on('spin', function(e, ui){
				var single = $('.mode__single_active');
				if(single.length > 0){
					spinnerX = inputX.spinner({
						min: 0,
						max: imgWidth-wmWidth
					});
					var currentVal = ui.value;
					tiling.css({
						left: currentVal + 'px'
					});
				}
			});

			spinnerY.on('spin', function(e, ui){
				var single = $('.mode__single_active');
				if(single.length > 0){
					spinnerY = inputY.spinner({
						min: 0,
						max: imgHeight-wmHeight
					});
					var currentVal = ui.value;
					tiling.css({
						top: currentVal + 'px'
					});
				}
			});
	};

		var reset = function() {
			//сброс секторов 
			$(mapItem).removeClass('map__item_active');
			$(mapItem[0]).addClass('map__item_active');
			//сброс инпутов
			inputX.val(0);
			inputY.val(0);
			tiling.css({'top': 0, 'left':0});
	};

    return{
      init: init,
      sizesChange: sizesChange,
      coords: wmSizes,
      reset: reset
    };
})();

Positioning.init();

$('.mode__single').on('click', function(){
	Tiling.remove();
	Tiling.reset();
	Positioning.init();
});