var language = (function() {
    var eng = {
            'header': 'Watermark generator',
            'settings': 'Settings',
            'image': 'Original image',
            'watermark': 'Watermark',
            'place': 'Place',
            'transparency': 'Transparency',
            'reset': 'Reset',
            'download': 'Download'
        },
        rus = {
            header: 'Генератор водяных знаков',
            settings: 'Настройки',
            image: 'Исходное изображение',
            watermark: 'Водяной знак',
            place: 'Положение',
            transparency: 'Прозрачность',
            reset: 'Сброс',
            download: 'Скачать'
        },
        button = $('.lang__link'),
        header = $('.preview__header-text'),
        settings = $('.settings__header-text'),
        image = $('.input__label-img'),
        watermark = $('.input__label-wm'),
        place = $('.input__label_position'),
        transparency = $('.input__label_opacity'),
        reset = $('.button__reset'),
        download = $('.button__submit');

    function language($this) {
        if ($this.attr('id') == 'eng') {
            header.text(eng.header);
            settings.text(eng.settings);
            image.text(eng.image);
            watermark.text(eng.watermark);
            place.text(eng.place);
            transparency.text(eng.transparency);
            reset.val(eng.reset);
            download.val(eng.download);
        } else if ($this.attr('id') == 'rus') {
            header.text(rus.header);
            settings.text(rus.settings);
            image.text(rus.image);
            watermark.text(rus.watermark);
            place.text(rus.place);
            transparency.text(rus.transparency);
            reset.val(rus.reset);
            download.val(rus.download);
        }
    }

    return {
        init: function() {
            button.on('click', function(e) {
                var $this = $(this);
                e.preventDefault();
                language($this);
            });
        }
    };

})();


language.init();
