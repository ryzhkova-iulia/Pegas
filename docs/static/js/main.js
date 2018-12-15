
ymaps.ready().then(function () {
    var map = new ymaps.Map("map", {
        center: [55.733, 37.588],
        zoom: 10,
        controls: []
    });

    function showPoint(geoObject) {
        map.panTo(geoObject.geometry.getCoordinates(), {useMapMargin: true});

        var item = geoObject.properties.get('balloonContent');
        var $templateContent = $("#tooltip-template").html();

        for (var fieldName in item) {
            if (item.hasOwnProperty(fieldName)) {
                $templateContent = $templateContent.replace(new RegExp("#" + fieldName + "#", "g"), item[fieldName]);
            }
        }

        $(".map-tooltip-container").html($templateContent);
    }


    // Создадим коллекцию геообъектов.
    var collection = new ymaps.GeoObjectCollection(null, {
        // Запретим появление балуна.
        hasBalloon: false,
        iconColor: '#3b5998',
        iconLayout: 'default#image',
        iconImageHref: "./static/img/general/point.svg",
        iconImageSize: [30, 42],
        iconImageOffset: [-5, -38]
    });

    // Добавим геообъекты в коллекцию.
    collection
        .add(new ymaps.Placemark([55.733838, 37.588100], {
            balloonContent: {
                phone : '+7 (495) 162-56-07',
                address : '1 Зубовский б-р, д.13 стр 1',
                subAddress: 'Парк Культуры, Фрунзенская, Октябрьская',
                workingHours : 'Пн-Пт: 10:00-20:00 <br />' +
                    'Сб: 11:00-16-00'
            }
        }))
        .add(new ymaps.Placemark([55.758240, 37.678523], {
            balloonContent: {
                phone : '+7 (495) 162-56-07',
                address : '2 Зубовский б-р, д.13 стр 1',
                subAddress: 'Парк Культуры, Фрунзенская, Октябрьская',
                workingHours : 'Пн-Пт: 10:00-20:00 <br />' +
                    'Сб: 11:00-16-00'
            }
        }))
        .add(new ymaps.Placemark([55.693784, 37.564942], {
            balloonContent: {
                phone : '+7 (495) 162-56-07',
                address : '3 Зубовский б-р, д.13 стр 1',
                subAddress: 'Парк Культуры, Фрунзенская, Октябрьская',
                workingHours : 'Пн-Пт: 10:00-20:00 <br />' +
                    'Сб: 11:00-16-00'
            }
        }));

    map.geoObjects.add(collection);
    collection.events.add('click', function (e) {
        showPoint(e.get('target'));
    });
    showPoint(collection.get(0));

});



$(document).ready(function () {

    $('[name="phone"]').inputmask('+7 (999) 999-99-99');


    $('[name="phone"]').attr('type', 'tel');


    $( document ).on( 'click', '.js-callback', function(e) {
        $( '.js-callback' ).magnificPopup({
            items: {
                src: '#popup',
                type: 'inline'
            },

            callbacks: {
                elementParse: function(item) {

                    var mp = $.magnificPopup.instance,
                        cur = mp.st.el,
                        title = cur.attr('data-header'),
                        curImg = cur.attr("src");

                    if (curImg != undefined ) {
                        $( item.src).find('.form-image').attr("src", curImg);
                    } else {
                        // $( item.src).find('.form-image').hide();
                    }
                    $( item.src).find('.title_form').text(title);
                }
            }
        }).magnificPopup('open');
        e.preventDefault();
    });

// якорь
    $(function() {
        $('.menu__item, .info__link, .menu_footer li a').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });



    $('.js-sent').magnificPopup({
        items: {
            src: '#sucess',
            type: 'inline'
        }
    });


});
