function initMap() {
  let map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 41.390205, lng: 2.154007 },
      zoom: 12
  });

  function findLocation(address) {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': address }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              let latitude = results[0].geometry.location.lat();
              let longitude = results[0].geometry.location.lng();
              document.getElementById('latitude').value = latitude;
              document.getElementById('longitude').value = longitude;

              let center = new google.maps.LatLng(latitude, longitude);
              map.setCenter(center);
              map.setZoom(16);

              let marker = new google.maps.Marker({
                  map: map,
                  position: center,
                  icon: {
                      url: 'img/pin.png', 
                      scaledSize: new google.maps.Size(50, 50) 
                  }
              });

              let infowindow = new google.maps.InfoWindow({
                  content: "<strong>Dirección:</strong> " + address
              });

              marker.addListener('click', function() {
                  infowindow.open(map, marker);
              });
          } else {
              alert('No se ha encontrado ninguna dirección.');
          }
      });
  }

  document.getElementById('findLoc').addEventListener('click', function() {
      let address = document.getElementById('address').value.trim();
      if (address !== '') {
          findLocation(address);
      } else {
          alert('Por favor, introduce una dirección válida.');
      }
  });

  document.getElementById('locateMe').addEventListener('click', function() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
              let pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              };
              map.setCenter(pos);
              map.setZoom(12);
              let marker = new google.maps.Marker({
                  position: pos,
                  map: map,
                  icon: {
                      url: 'img/pin.png',
                      scaledSize: new google.maps.Size(50, 50)
                  }
              });
          });
      } else {
          alert('Tu navegador no soporta geolocalización.');
      }
  });

  let customStyle = [
      {
          featureType: "all",
          stylers: [
              { saturation: -80 }
          ]
      },
      {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [
              { hue: "#00ffee" },
              { saturation: 50 }
          ]
      },
  ];

  map.setOptions({ styles: customStyle });
}
