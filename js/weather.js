/**
 * @author SHarmony
 */
function loadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.google.com/maps/api/js?key=AIzaSyD9bkEUd4rLKk-hb-EKDf8D5JOj4Ff1hUY&sensor=false&callback=initialize";
  document.body.appendChild(script);
}
 
window.onload = loadScript;