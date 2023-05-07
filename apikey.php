<?php
// Retrieve the environmental variable from Netlify
$apiKey = getenv('OPENAI_API_KEY');

// Construct a JSON object containing the API key
$response = array('apiKey' => $apiKey);

// Set the content type header to JSON
header('Content-Type: application/json');

// Output the JSON object
echo json_encode($response);
?>
