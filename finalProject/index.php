<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>GeoCache Search</title>
<link rel="stylesheet" type="text/css" href="geo.css">
<script src="http://ajax.googleapis.com/ajax/libs/prototype/1.6.1.0/prototype.js" type="text/javascript"></script>
<script src="http://ajax.googleapis.com/ajax/libs/scriptaculous/1.8.3/scriptaculous.js" type="text/javascript"></script>
<script src="geo.js" type="text/javascript"></script>

    <script>

	
    </script>
</head>

<body onload="memWarning()">
	
	<div id = "column1">
	<h2>GeoCache Locator</h2>

	<p>Click on the map to select a location, or enter one manually below.</p>
	<div id = "formData">
	
	<form id="searchform" name="searchform" method="post" action="data.php"   >
		Latitude: <input type="text" name ="latitudeForm" value = "32.253" id="latitudeForm" size="10"/></br></br>
		Longitude: <input type="text" name ="longitudeForm" value = "-110.912" id="longitudeForm" size="10"/></br></br>
		Radius (miles): <input type="number" id="radiusForm" name="radiusForm" value = "10" step="5" min="5" max="200"/></br></br>
		Cache Type: <select id = "selectCacheType" name ="selectCacheType">
			<option value="1,2,3">All</option>
			<option value="1">Traditional</option>
			<option value="2">Mystery/Puzzle</option>
			<option value="3">Multi-Cache</option>
		</select></br></br>
		Difficulty: <select id = "selectDifficulty" name ="selectDifficulty">
			<option value="1,2,3,4,5,6,7,8,9,10">Any</option>
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
			<option value="7">7</option>
			<option value="8">8</option>
			<option value="9">9</option>
			<option value="10">10</option>
		</select>
		<input type="button" name="submit" value="Search" onclick="search()"/></br></br>
		
	</form>
	</div>

	<h2>Nearby GeoCaches</h2>
	
	<table id="geoTable" style="width:400px" style="margin:auto" align="center">
		<tr>
			<th>Latitude</th>
			<th>Longitude</th> 
			<th>Difficulty</th>
			<th>Cache Type</th>
		</tr>
		<tbody id = "data">
		
		</tbody>
			
	</table>

	</div>
	<div id = "column2"></div>
		<div id="map"></div>

	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAkjwoUJI0OP9icIcGlYE3JY7E3-8lGmdU&callback=initMap" async defer></script>


	</body>

</html>












