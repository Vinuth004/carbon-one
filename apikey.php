<?php
// Get the environmental variable from Netlify
$api_key = $_ENV['OPENAI_API_KEY'];

// Return the environmental variable as a JSON response
header('Content-Type: application/json');
echo json_encode(['apiKey' => $api_key]);
?>
