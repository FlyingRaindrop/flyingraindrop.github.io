var Tiling = (function(){

	var $this = $(this),
			inputX = $('#coords-x'),
			inputY = $('#coords-y'),
			imgWidth,
			imgHeight,
			wmWidth,
			wmHeight,
			tiling = $('.tiling'),
			mapItem = $('.map__item'),
			countWidth,
			countHeight;

    var init = function(){
        _tiling();
        _tileSpin();
    };

    var _tiling = function(){
    	var img = $('.processed_img'),
    			wm = $('.processed_wm'),
    			clone = null,
    			l = 0;

			imgWidth = img.width(),
			imgHeight = img.height();
			wmWidth = wm.width(),
			wmHeight = wm.height();

			$(wm[0]).css({
					position: 'relative',
					float: 'left',
				});
			
			$(mapItem).removeClass('map__item_active');
			$('.map__tiling').show();
			$('.mode__single').removeClass('mode__single_active');
			$this.addClass('mode__tile_active');
			countWidth = Math.ceil(imgWidth / wmWidth) + 1;
			countHeight = Math.ceil(imgHeight / wmHeight) + 1;

			tiling.css({'width': countWidth * wmWidth,
									'height': countHeight * wmHeight});

			for (var i = 0, l = countHeight * countWidth; i<l-1; i++){
				clone = wm.clone();
				clone.css({
					position: 'relative',
					float: 'left',
				});
				tiling.append(clone);
			}

			tiling.draggable({
				cursor: 'move',
				containment: false
			});

		};

		var _tileSpin = function(){
			var spinnerX = inputX.spinner({step: 2});
			var min,
					max; 

			if(((imgWidth - 2*wmWidth) < 50) && ((imgHeight - 2*wmHeight) < 50)){
				min = 0;
				maxX = 100;
				maxY = 100;
			}else if((imgHeight - 2*wmHeight) < 50){
				min = 0;
				maxX = imgWidth - wmWidth*2;
				maxY = 100;
			}else if((imgWidth - 2*wmWidth) < 50){
				min = 0;
				maxX = 100;
				maxY = imgHeight - wmHeight*2;
			}else{
				min = 0;
				maxX = imgWidth - wmWidth*2;
				maxY = imgHeight - wmHeight*2;
			}

				spinnerX.on('spin', function(e, ui){
					var tile = $('.mode__tile_active');
					var wm = $('.processed_wm');
					if(tile.length > 0){
						spinnerX = inputX.spinner({
							min: min,
							max: maxX
						});

						var currentVal = ui.value;
						$(wm).css({'margin-right': currentVal + 'px'});
						tiling.css({'width': countWidth * (wmWidth + currentVal)});

						if(currentVal == 0){
							$('.map__margin_left').css({'width': 1});
						}else{
							$('.map__margin_left').css({'width': currentVal/(maxX/103) + 'px'});
						}
				}
			});

			var spinnerY = inputY.spinner({step: 2});

			spinnerY.on('spin', function(e, ui){
				var tile = $('.mode__tile_active');
				var wm = $('.processed_wm');
				if(tile.length > 0){
					spinnerY = inputY.spinner({
						min: min,
						max: maxY
					});

					var currentVal = ui.value;
					$(wm).css({'margin-bottom': currentVal + 'px'});
					tiling.css({'height': countHeight * (wmHeight + currentVal)});

					if(currentVal == 0){
						$('.map__margin_bottom').css({'height': 1});
					}else{
						$('.map__margin_bottom').css({'height': currentVal/(maxY/103) + 'px'});
					}
				}
			});
		};

		var remove = function(){
			var wm = $('.processed_wm');
			for(var i = 0; i < countHeight * countWidth; i++){
				if(i != 0){
					$(wm[i]).remove();
				}
			}
		};

		var reset = function(){
			var wm = $('.processed_wm');
			inputX.val(0);
			inputY.val(0);
			$('.map__margin_left').css({'width': 1});
			$('.map__margin_bottom').css({'height': 1});
			tiling.css({'width': countWidth * wmWidth,
									'height': countHeight * wmHeight,
									'left': 0,
									'top': 0});
			$(wm).css({'margin-right': 0,
								'margin-bottom': 0});
		};

		var _load = function(){
			_tiling();
		};

    return{
        init: init,
        tiling: _tiling,
        reset: reset,
        remove: remove
    };
})();