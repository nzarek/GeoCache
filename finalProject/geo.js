var map;
var markers = [];
var openInfoWindow;



function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 32.253, lng: -110.912},
          zoom: 8
          
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
              
            };
			document.getElementById("latitudeForm").value = position.coords.latitude;
            document.getElementById("longitudeForm").value = position.coords.longitude;
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());

        }
		
	}

	
function handleLocationError() {
	
}
function search() {
	var newPos = {
              lat: parseFloat(document.getElementById("latitudeForm").value),
              lng: parseFloat(document.getElementById("longitudeForm").value)};

	var rad = 1609 * parseInt(document.getElementById("radiusForm").value);

	infoWindow.setPosition(newPos);
	map.setCenter(newPos);
	var zone = new google.maps.Circle({center: newPos, radius: rad});
	var bounds = zone.getBounds();
	maxLat = bounds.getNorthEast().lat();
	minLat = bounds.getSouthWest().lat(); 
	maxLng = bounds.getNorthEast().lng();
	minLng = bounds.getSouthWest().lng();
	
	clearMarkers(map);

	//alert("maxLat " + maxLat + "\nminLat " + minLat + "\nmaxLng " + maxLng + "\nminLng " + minLng);
	ajaxSend(maxLat, minLat, maxLng, minLng);
	ajaxCall(maxLat, minLat, maxLng, minLng);
	
}

function ajaxCall(maxLat, minLat, maxLng, minLng) {
	
	var ajax = new XMLHttpRequest();

	var maxLat = maxLat;
	var minLat = minLat;
	var maxLng = maxLng;
	var minLng = minLng;
	
	var latitudeForm = document.getElementById("latitudeForm").value;
	var longitudeForm = document.getElementById("longitudeForm").value;
	var radiusForm = document.getElementById("radiusForm").value;
	var selectCacheType = document.getElementById("selectCacheType").value;
	var selectDifficulty = document.getElementById("selectDifficulty").value;
	var dataForm = "latitudeForm="+ latitudeForm + "&longitudeForm=" + longitudeForm + "&radiusForm=" + radiusForm + "&selectCacheType=" + selectCacheType + "&selectDifficulty=" + selectDifficulty + "&maxLat=" + maxLat + "&minLat=" + minLat + "&maxLng=" + maxLng + "&minLng=" + minLng;
	

	ajax.open("POST", "data.php", true);
	ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	ajax.send(dataForm);
	
	ajax.onreadystatechange = function ()
	{
		
		if (this.readyState == 4 && this.status == 200)
		{
			
			var data = JSON.parse(this.responseText);
			console.log(data);
		
		
			var html = "";
			
			for (var i = 0; i < data.length; i++)
			{
				var latitude = data[i].latitude;
				var longitude = data[i].longitude;
				var difficulty = data[i].difficulty_rating;
				var id = i;

				if(data[i].cache_type_id == 1) {
					var cacheType = "Traditional";
				} else if(data[i].cache_type_id == 2) {
					var cacheType = "Mystery/Puzzle";
				} else {var cacheType = "Multi-Cache";}
				
				html += "<tr id=\"" + i + "\">";

					html += "<td>" + latitude + "</td>";
					html += "<td>" + longitude + "</td>";
					html += "<td>" + difficulty + "</td>";
					html += "<td>" + cacheType + "</td>";
				html += "</tr>";
							
				document.getElementById("data").innerHTML = html;
				setMarkers(latitude, longitude, cacheType, difficulty);
				
			}	
		
		}
				
		
		
	}
	
}

function ajaxSend(maxLat, minLat, maxLng, minLng) {
	
	var ajax = new XMLHttpRequest();
	
	var maxLat = maxLat;
	var minLat = minLat;
	var maxLng = maxLng;
	var minLng = minLng;
	
	
	var latitudeForm = document.getElementById("latitudeForm").value;
	var longitudeForm = document.getElementById("longitudeForm").value;
	var radiusForm = document.getElementById("radiusForm").value;
	var selectCacheType = document.getElementById("selectCacheType").value;
	var selectDifficulty = document.getElementById("selectDifficulty").value;
	var dataForm = "latitudeForm="+ latitudeForm + "&longitudeForm=" + longitudeForm + "&radiusForm=" + radiusForm + "&selectCacheType=" + selectCacheType + "&selectDifficulty=" + selectDifficulty + "&maxLat=" + maxLat + "&minLat=" + minLat + "&maxLng=" + maxLng + "&minLng=" + minLng;

	ajax.open("POST", "data.php", true);
	ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	ajax.send(dataForm);
	
	ajax.onreadystatechange = function ()
	{
		
		if (this.readyState == 4 && this.status == 200)
		{
			
			
		}
		
		
	}
}



function ajaxFailed(ajax, exception) {
	
	var errorText = document.getElementById("errors");
	var msg = "Error making Ajax request:\n\n";
	
	if (exception) {
		alert(msg += "Exception: " + exception.message);
	} else {
		alert(msg += "Server status:\n" + ajax.status + " " + ajax.statusText +
			"\n\nServer response text:\n" + ajax.responseText);
	}
	
	
}


function setMarkers(latitude, longitude, cacheType, difficulty) {
	
	var markerLat = latitude;
	var markerLng = longitude;
	var markerCache = cacheType;
	var markerDiff = difficulty;
	var url = "https://api.flickr.com/services/rest/?api_key=ec1e016f1e3ddfc8332d9fb48f037a2b&method=flickr.photos.search&lat=" + markerLat + "&lon=" + markerLng;
	var markerPos = {
              lat: parseFloat(markerLat),
              lng: parseFloat(markerLng)};

	marker = new google.maps.Marker({
			map: map,
			position: new google.maps.LatLng(markerPos),
			title: cacheType + ", Difficulty: " + difficulty
			});
			
	infoWindowCreate(markerPos, markerLat, markerLng, marker.title, url);		


	markers.push(marker);
}

function infoWindowCreate(markerPos, infoLat, infoLng, title, url) {
	
	var imageResponse = imageGrab(url);

	var finalImageURL = parseImageData(imageResponse);

	var contentString = '<h2>' + infoLat + ', ' + infoLng + '</h2>' +
						'<p>' + title + '</p>' +
						'<p><u>Photos taken near this location:</u></p>' +
						'<p>' + finalImageURL.join('')+'</p>';
	var windowPOS = markerPos;

	for (var i = 0; i < markers.length; i++) {
          var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
		
		
		infoWindow.setPosition(windowPOS);
		
		
		/*document.getElementById(i).addListener('click', function() {
			
			closeInfoWindow();
			infoWindow.setContent( this.contentString );
			infowindow.open(map, this);
			openInfoWindow = infowindow;
        });*/
		
		
		marker.addListener('click', function() {
			
			closeInfoWindow();
			infoWindow.setContent( this.contentString );
			infowindow.open(map, this);
			openInfoWindow = infowindow;
        });
	}
	
	
}
function clearMarkers(map) {
	for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
	}
}

function closeInfoWindow() {
    if (openInfoWindow) {
        openInfoWindow.close();
    }
}

function imageGrab(url) {
	
	 
	var imageAjax = new XMLHttpRequest();
	imageAjax.open("GET", url, false);
	
	imageAjax.send(null);

	
	return imageAjax.responseXML;
}



function parseImageData(imageResponse) {
	
	var total = imageResponse.getElementsByTagName("photos")[0].attributes[3].value;
	
	var iterations = 12;
	var imgArray = [];
	
		if (total < iterations) {
			iterations = total;
		}
			for (i = 0; i < iterations; i++) {
			var farm = imageResponse.getElementsByTagName("photo")[i].attributes[4].value; 
			var server = imageResponse.getElementsByTagName("photo")[i].attributes[3].value; 
			var id = imageResponse.getElementsByTagName("photo")[i].attributes[0].value; 
			var secret = imageResponse.getElementsByTagName("photo")[i].attributes[2].value; 

			var imageURL = "<img src=https://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + "_t.jpg>";
			imgArray.push(imageURL);
			}
		

	return imgArray;
}

function memWarning() {
	
	alert("Welcome to my Final Project!" + "\nWARNING! For the integrity of your browser session, please limit your search to a reasonable quantity, or make sure you have nothing open in your browser you can't afford to lose. Results may take a few moments to load. I appreciate your patience. ~NZ");
}


