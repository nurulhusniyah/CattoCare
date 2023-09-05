document.getElementById("map-button").addEventListener("click", function(){
  // Get user's current location
  /*navigator.geolocation.getCurrentPosition(function(position){
    var userLat = position.coords.latitude;
    var userLng = position.coords.longitude;*/


    navigator.geolocation.getCurrentPosition(function(location) {
  var lat = location.coords.latitude;
  var lng = location.coords.longitude;

  var clinicUrl = 'https://www.google.com/maps/search/?api=1&query=clinic'+ lat +','+ lng;
  document.querySelector('.btn').setAttribute('onclick', `location.href = '${clinicUrl}'`);
});

    // Use the Google Places API to search for nearby places


  });
});
