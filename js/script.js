'use strict';

(function () {
  
/* Slide list */    
    
  var slideList = [
            {
               id: 1,
               title: 'Dream house - Photo 1',
               image: "https://images.pexels.com/photos/2091166/pexels-photo-2091166.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=940",
               coords: {lat: 49.887314, lng: 19.090301}
            },
            {
               id: 2,
               title: 'Dream family - Photo 2',
               image: "https://images.pexels.com/photos/1914982/pexels-photo-1914982.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
               coords: {lat: 54.825747, lng: 18.340305}
            },
    {
               id: 3,
               title: 'Dream job - Photo 3',
               image: "https://images.pexels.com/photos/935743/pexels-photo-935743.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
               coords: {lat: 49.817733, lng: 19.043825}
            },
    {
               id: 4,
               title: 'Dream car - Photo 4',
               image: "https://images.pexels.com/photos/1461887/pexels-photo-1461887.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
               coords: {lat: 50.215233, lng: 18.979839}
            },
    {
               id: 5,
               title: 'Dream friend - Photo 5',
               image: "https://images.pexels.com/photos/460823/pexels-photo-460823.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
               coords: {lat: 49.654904, lng: 21.159709}
            },
        ];

/* Mustache template */
    
    var templateItem = document.getElementById('template_item').innerHTML;
    Mustache.parse(templateItem);

    var listItems = '';

    for (var i = 0; i < slideList.length; i++) {
        listItems += Mustache.render(templateItem, slideList[i]);
    }
  
    console.log(listItems);
  
/* Flickity plugin */
    
    var results = document.querySelector('.carousel');
    results.innerHTML = listItems;

    var carousel = document.querySelector('.carousel');
    
    var flkty = new Flickity( carousel, {
      imagesLoaded: true,
      percentPosition: false,
      wrapAround: true,
      pageDots: false,
      adaptiveHeight: true,
      hash: true,
    });

    var buttonGroup = document.querySelector('.button-group');
    var buttons = buttonGroup.querySelectorAll('.button');
    buttons = fizzyUIUtils.makeArray( buttons );

    buttonGroup.addEventListener( 'click', function( event ) {
      if ( !matchesSelector( event.target, '.button' ) ) {
        return;
      }
      var index = buttons.indexOf( event.target );
      flkty.select( index );
    });

    var progressBar = document.querySelector('.progress-bar')

    flkty.on( 'scroll', function( progress ) {
      progress = Math.max( 0, Math.min( 1, progress ) );
      progressBar.style.width = progress * 100 + '%';
    });
  
/*Google Maps + Flickity*/
var par = true;    
    
  window.initMap = function() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: slideList[flkty.selectedIndex].coords
  });
  for(var i = 0; i < slideList.length; i++) {
    var marker = new google.maps.Marker({
      position: slideList[i].coords,
      map: map
    });
    (function(i){
      marker.addListener('click', function() {
        par = false;
        flkty.select(i);
      });
    })(i);
  };

  flkty.on( 'change', function( index ) {
    if (par) {
      map.panTo(slideList[index].coords);
      map.setZoom(10);
    } else {
      par = true;
    };
  });
};
    
  
})();
