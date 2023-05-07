<?php
header('Content-Type: application/json');

// Retrieve the API key from an environment variable
$apiKey = $_ENV['OPENAI_API_KEY'];

// Create an array containing the API key
$data = array('apiKey' => $apiKey);

// Encode the data as JSON and return it
echo json_encode($data);
?>
