function initMap() {
  // Crea el mapa
  let map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 41.390205, lng: 2.154007 },
      zoom: 12
  });

  // Funció per trobar una ubicació a partir d'una adreça
  function findLocation(address) {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': address }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              // Extrau la latitud i longitud dels resultats
              let latitude = results[0].geometry.location.lat();
              let longitude = results[0].geometry.location.lng();
              // Actualitza els valors de latitud i longitud als inputs ocults
              document.getElementById('latitude').value = latitude;
              document.getElementById('longitude').value = longitude;

              // Centra el mapa a la ubicació trobada i ajusta el zoom
              let center = new google.maps.LatLng(latitude, longitude);
              map.setCenter(center);
              map.setZoom(16);

              // Crea un marcador a la ubicació trobada
              let marker = new google.maps.Marker({
                  map: map,
                  position: center,
                  icon: {
                      url: 'img/pin.png', 
                      scaledSize: new google.maps.Size(50, 50) 
                  }
              });

              // Crea un InfoWindow amb l'adreça proporcionada
              let infowindow = new google.maps.InfoWindow({
                  content: "<strong>Direcció:</strong> " + address
              });

              // Obre l'InfoWindow quan es fa clic al marcador
              marker.addListener('click', function() {
                  infowindow.open(map, marker);
              });
          } else {
              alert('No s\'ha trobat cap adreça.');
          }
      });
  }

  // Event clic per buscar una adreça
  document.getElementById('findLoc').addEventListener('click', function() {
      let address = document.getElementById('address').value.trim();
      if (address !== '') {
          findLocation(address);
      } else {
          alert('Si us plau, introdueix una adreça vàlida.');
      }
  });

  // Event clic per localitzar l'usuari
  document.getElementById('locateMe').addEventListener('click', function() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
              // Obté la posició actual de l'usuari
              let pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              };
              // Centra el mapa a la posició de l'usuari i ajusta el zoom
              map.setCenter(pos);
              map.setZoom(12);
              // Crea un marcador a la posició de l'usuari
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
          alert('El teu navegador no suporta geolocalització.');
      }
  });

  // Estil personalitzat del mapa
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

  // Aplica l'estil personalitzat al mapa
  map.setOptions({ styles: customStyle });
}
