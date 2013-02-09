/**
 * @author SHarmony
 */
    var geocoder; 
     var map;
      function initialize() {
      	geocoder = new google.maps.Geocoder(); 
      	
      	
        var mapOptions = {
          center: new google.maps.LatLng(40.807979,-73.963137),
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.SATELLITE
        };
        map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
		pining(40.807979,-73.963137,"Columbia University","<h4>Columbia University</h4><h5>- Columbia University</h4><a id='stata-get' href='#' onclick=''>Get Inside Direction</a>",'http://maps.google.com/mapfiles/ms/icons/green-dot.png');
		pining(40.907979,-73.863137,"Columbia University","<h4>Columbia University</h4><h5>- Columbia University</h4><a id='stata-get' href='#' onclick=''>Get Inside Direction</a>",'http://maps.google.com/mapfiles/ms/icons/green-dot.png');
      }
      
      
      
	  function codeAddress() {
	    var address = document.getElementById("Google-address").value;
	    geocoder.geocode( { 'address': address}, function(results, status) {
	      if (status == google.maps.GeocoderStatus.OK) {
	        map.setCenter(results[0].geometry.location);
	        var marker = new google.maps.Marker({
	            map: map,
	            position: results[0].geometry.location
	        });
//	        alert('(lng,lat): '+ [results[0].geometry.location.lng(),results[0].geometry.location.lat()]);
	        getNowCoordinate(address,[results[0].geometry.location.lng(),results[0].geometry.location.lat()]);
	        $("#current-addr").html("Current Address: "+NowAddress);
	      } else {
	        alert("Geocode was not successful for the following reason: " + status);
	      }
	    });
	  }
  
  function pining(lat,lng,description,contentString,iconPath){
  	var myLatlng = new google.maps.LatLng(lat,lng);

	var infowindow = new google.maps.InfoWindow({
    	content: contentString
		});

  	var marker = new google.maps.Marker({ 
        position: myLatlng, 
        map: map, 
        flat: true, 
        title: description, 
     });
		iconFile = iconPath; 
		marker.setIcon(iconFile)

    // The function after click
	google.maps.event.addListener(marker, 'click', function() {
  		infowindow.open(map,marker);
		});
  	}