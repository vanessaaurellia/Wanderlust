<?php
header('Content-type: application/json');

$jsonFile = file_get_contents('database/users.json'); //Ngambil isi file json
$jsonArray = json_decode($jsonFile, true); //Convert file json jadi array biar bisa dibaca sama php

$newUser = [ //Ini array associative, kalo di python kek dictionary
    'name' => $_POST['name'],
    'email' => $_POST['email'],
    'password' => $_POST['password'],
    'TTL' => $_POST['TTL'],
];

array_push($jsonArray, $newUser); //Masukin user baru ke array of users tadi
$newJSON = json_encode($jsonArray); //Ngeconvert si array tadi jadi bentuknya JSON

file_put_contents('database/users.json', $newJSON); //Masukin ke file

echo json_encode(['status' => true]);
