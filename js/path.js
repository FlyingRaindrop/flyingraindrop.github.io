(function () {
	function include(path) {
		$('body').append('<script src="'+path+'"></script>');
	}
	include('js/jquery.js');
	include('js/jquery-ui.js');
	include('js/jquery.fileupload.js');
	include('js/block.js');
	include('js/fileupload.js');
	include('js/positioning.js');
	include('js/tiling.js');
	include('js/wmOpacity.js');
	include('js/language.js');
	include('js/wmScale.js');
	include('js/regimeChange.js');
	include('js/reset.js');
})();

