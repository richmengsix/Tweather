/**
 * @author SHarmony
 */
    var geocoder; 
     var map;
     var mc;
     var mcOptions;
      function initialize() {
      	geocoder = new google.maps.Geocoder(); 
      	
      	
        var mapOptions = {
          center: new google.maps.LatLng(40.807979,-73.963137),
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.SATELLITE
        };
        map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
        var markers=new Array();    
        //Adding points

		markers[0]=pining(40.806979,-73.964137,"Columbia University","<h4>Columbia University</h4><h5>- Columbia University</h4><a id='stata-get' href='#' onclick=''>Get Inside Direction</a>",'http://maps.google.com/mapfiles/ms/icons/green-dot.png');
		markers[1]=pining(40.907979,-73.863137,"Columbia University","<h4>Columbia University</h4><h5>- Columbia University</h4><a id='stata-get' href='#' onclick=''>Get Inside Direction</a>",'http://maps.google.com/mapfiles/ms/icons/green-dot.png');
		markers[2]=pining(40.927979,-73.893137,"Columbia University","<h4>Columbia University</h4><h5>- Columbia University</h4><a id='stata-get' href='#' onclick=''>Get Inside Direction</a>",'http://maps.google.com/mapfiles/ms/icons/green-dot.png');
		markers[3]=pining(40.807989,-73.963137,"Columbia University","<h4>Columbia University</h4><h5>- Columbia University</h4><a id='stata-get' href='#' onclick=''>Get Inside Direction</a>",'http://maps.google.com/mapfiles/ms/icons/green-dot.png');
		markers[4]=pining(40.907999,-73.863137,"Columbia University","<h4>Columbia University</h4><h5>- Columbia University</h4><a id='stata-get' href='#' onclick=''>Get Inside Direction</a>",'http://maps.google.com/mapfiles/ms/icons/green-dot.png');
		markers[5]=pining(40.927969,-73.893137,"Columbia University","<h4>Columbia University</h4><h5>- Columbia University</h4><a id='stata-get' href='#' onclick=''>Get Inside Direction</a>",'http://maps.google.com/mapfiles/ms/icons/green-dot.png');
		
		//set style options for marker clusters (these are the default styles)
mcOptions = {gridSize: 30, maxZoom: 15,
	styles: [{
		height: 64,
		url: "img/sunny64.png",
		width: 64
	},
	{
		height: 64,
		url: "img/sunny64.png",
		width: 64
	},
	{
		height: 64,
		url: "img/cloudy64.png",
		width: 64
	},
	{
		height: 64,
		url: "img/snowy64.png",
		width: 64
	},
	{
		height: 64,
		url: "img/rainy64.png",
		width: 64
		}]};
		mc = new MarkerClusterer(map,markers,mcOptions);
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
	        $("#current-addr").html("Current Address: "+address);
	      } else {
	        alert("Geocode was not successful for the following reason: " + status);
	      }
	    });
	  }
  
  function refresh(pinary)
  {
  	var iconPath;
  	var iconSmallPath;
  	var content;
  	var CurrentMarkers = new Array();
  	for(var i=0;i<pinary.length;i++){
  		iconPath=getWeatherPic(pinary[i].weather);
  		iconSmallPath=getWeatherSmallPic(pinary[i].weather);
		content="<div class='mapitem'>"+
							"<div class='mapitem-left'>"+
								"<p class='mapitem-title'>"+pinary[i].name+"</p>"+
								"<img class='mapitem-line' src='img/line22.png'/>"+
								"<p class='mapitem-tweet'>"+pinary[i].tweet+"</p>"+
								"<p class='mapitem-time'>"+pinary[i].nowtime+"</p>"+
							"</div>"+
							"<div class='mapitem-right'>"+
								"<img class='mapitem-img' src='"+iconPath+"' />"+
							"</div>"+
						"</div>";
  		CurrentMarkers[i]=pining(pinary[i].lat,pinary[i].lng,pinary[i].description,content,iconSmallPath);

  	}
 	mc.clearMarkers();
	mc.addMarkers(CurrentMarkers,false);
  }
  function getWeatherPic(weather){
  	var sunny="img/sunny.png";
  	var cloudy="img/cloudy.png";
  	var rainy="img/rainy.png";
  	var snowy="img/snow.png";
  	var defaut="img/clearmoon.png";
  	
  	if(weather=="sunny") return sunny;
  	else if (weather=="cloudy") return cloudy;
  	else if (weather=="rainy") return rainy;
  	else if (weather=="snowy") return snowy;
  	else return defaut;
  }
  function getWeatherSmallPic(weather){
  	var sunny="img/sunny64.png";
  	var cloudy="img/cloudy64.png";
  	var rainy="img/rainy64.png";
  	var snowy="img/snow64.png";
  	var defaut="img/sunny_night64.png";
  	
  	if(weather=="sunny") return sunny;
  	else if (weather=="cloudy") return cloudy;
  	else if (weather=="rainy") return rainy;
  	else if (weather=="snowy") return snowy;
  	else return defaut;
  }  
  function pining(lat,lng,description,contentString,iconPath)
  {
  	var myLatlng = new google.maps.LatLng(lat,lng);
/*	contentS="<div class='mapitem'>"+
							"<div class='mapitem-left'>"+
								"<p class='mapitem-title'>Columbia University</p>"+
								"<img class='mapitem-line' src='img/line22.png'/>"+
								"<p class='mapitem-tweet'>Wow! It's sunny outside... Finally!</p>"+
								"<p class='mapitem-time'>-30 minutes ago</p>"+
							"</div>"+
							"<div class='mapitem-right'>"+
								"<img class='mapitem-img' src='img/sunny.png' />"+
							"</div>"+
						"</div>";
						*/
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
		marker.setIcon(iconFile);

    // The function after click
	google.maps.event.addListener(marker, 'click', function() {
  		infowindow.open(map,marker);
		});
		return marker;
  	}