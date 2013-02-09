/**
 * @author SHarmony
 */
    var geocoder; 
     var map;
      function initialize() {
      	geocoder = new google.maps.Geocoder(); 
      	
      	
        var mapOptions = {
          center: new google.maps.LatLng(42.361937,-71.090276),
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
		pining(42.361937,-71.090276,"Stata Center","<h4>Stata Center</h4><h5>- Massachusetts Institute of Technology</h4><a id='stata-get' href='#' onclick='getDirection();'>Get Inside Direction</a>");
		pining(42.361303,-71.091864,"Fairchild Building","<h4>Fairchild Building</h4><h5>- Massachusetts Institute of Technology</h4><a id='stata-get' href='#' onclick='getDirection();'>Get Inside Direction</a>");
	    pining(42.360054,-71.089777,"Dreyfus Building","<h4>Dreyfus Building</h4><h5>- Massachusetts Institute of Technology</h4><a id='stata-get' href='#' onclick='getDirection();'>Get Inside Direction</a>");
		pining(42.360308,-71.089308,"Green Building","<h4>Green Building</h4><h5>- Massachusetts Institute of Technology</h4><a id='stata-get' href='#' onclick='getDirection();'>Get Inside Direction</a>");
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
	        alert('(lng,lat): '+ [results[0].geometry.location.lng(),results[0].geometry.location.lat()]);
	        getNowCoordinate(address,[results[0].geometry.location.lng(),results[0].geometry.location.lat()]);
	        $("#current-addr").html("Current Address: "+NowAddress);
//	        return [results[0].geometry.location.lng(),results[0].geometry.location.lat()];
	      } else {
	        alert("Geocode was not successful for the following reason: " + status);
	      }
	    });
	  }
  
  function pining(lat,lng,description,contentString){
  	var myLatlng = new google.maps.LatLng(lat,lng);

	var infowindow = new google.maps.InfoWindow({
    	content: contentString
		});

	var marker = new google.maps.Marker({
    	position: myLatlng,
    	map: map,
    	title: description
		});

	google.maps.event.addListener(marker, 'click', function() {
  		infowindow.open(map,marker);
		});
  	}