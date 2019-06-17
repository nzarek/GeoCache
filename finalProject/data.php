

<?php

	header('Content-Type: application/json');

	$maxLat=$_POST['maxLat'];
	$minLat=$_POST['minLat'];
	$maxLng=$_POST['maxLng'];
	$minLng=$_POST['minLng'];
	
	$lat=$_POST['latitudeForm'];
	$long=$_POST['longitudeForm'];
	$rad=$_POST['radiusForm'];
	$cache=$_POST['selectCacheType'];
	$diff=$_POST['selectDifficulty'];

	$conn = new PDO("mysql:dbname=test;host=150.135.53.5", "student", "B3@rD0wn!");



	$result = $conn->query("SELECT * FROM test_data 
							WHERE (latitude BETWEEN $minLat AND $maxLat) 
							AND (longitude BETWEEN $minLng AND $maxLng)
							AND (cache_type_id IN ($cache))
							AND (difficulty_rating IN ($diff))"); 
	//$result = $conn->query("SELECT * FROM test_data WHERE cache_type_id = $cache AND difficulty_rating = $diff");
	

	$data = $result->fetchAll(PDO::FETCH_ASSOC);
	
	echo json_encode($data); 

			
 ?>

 