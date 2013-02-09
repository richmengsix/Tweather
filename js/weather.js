/**
 * @author SHarmony
 */
//Node object
$(document).ready(function(){
	getJASON();
	$('#refresh-button').click(function(){
		refresh(WeatherNodes);
	});
});


function getJASON(){
		
		$.getJSON("temp.json", function(json) {		
	    	console.log(json); // this will show the info it in firebug console
			$.each(json.results, function(i, item) {

				var created_at = item.created_at;
				var user = item.from_user;
				var lat = item.geo.coordinates[0];
				var lng = item.geo.coordinates[1];
				var tweet = item.text;
				var weather = item.weather;
																			
				addWeatherNode(user,lat,lng,user,tweet,created_at,weather);
				
				$('<p>').text(tweet).appendTo('body');
		});
	});
}

function WeatherNode(name,lat,lng,description,tweet,nowtime,weather){
	this.name=name;
	this.lat=lat;
	this.lng=lng;
	this.description=description;
	this.tweet=tweet;
	this.nowtime=nowtime;
	this.weather=weather;
}
var WeatherNodes=new Array();
WeatherNodes[0]=new WeatherNode("Columbia University",40.807979,-73.963137,"Columbia University","Wow! It's sunny outside... Finally!",getTimeAgo("Sat, 09 Feb 2013 03:55:38 +0000"),"sunny");
WeatherNodes[1]=new WeatherNode("Time Square",40.756035,-73.986676,"Time Square","Cloudy!! It's so bad!",getTimeAgo("Sat, 09 Feb 2013 04:55:38 +0000"),"snowy");

function addWeatherNode(name,lat,lng,description,tweet,nowtime,weather){
	var length = WeatherNodes.length;
	WeatherNodes[length] = new WeatherNode(name,lat,lng,name,tweet,getTimeAgo(nowtime),weather);
	alert(WeatherNodes.length);
}

function getTimeAgo(timestatement){
	var date = new Date();
	var second = date.getSeconds();
	var hour = date.getHours();
	var minute = date.getMinutes();
	//Sat, 09 Feb 2013 03:55:38 +0000
	var TweetHour = timestatement.split(" ")[4].split(":")[0];
	var TweetMinute = timestatement.split(" ")[4].split(":")[1];
	var TweetSecond = timestatement.split(" ")[4].split(":")[2];
	var OffsetHour = hour-(TweetHour-5);
	var OffsetMinute = minute-TweetMinute;
	//modify cross day
	if (OffsetHour<0) OffsetHour=OffsetHour+24;
	//modify cross hour
	if (OffsetHour>0 && OffsetMinute<0){
		OffsetHour--;
		OffsetMinute=OffsetMinute+60;
	}
	//Output
	if (OffsetHour==0) return " - "+OffsetMinute+" min ago";
	else return " - "+OffsetHour+" hr and "+OffsetMinute+" min ago"; 
}

function loadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.google.com/maps/api/js?key=AIzaSyD9bkEUd4rLKk-hb-EKDf8D5JOj4Ff1hUY&sensor=false&callback=initialize";
  document.body.appendChild(script);
}
 
window.onload = loadScript;
