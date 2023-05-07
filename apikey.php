<?php
header('Content-Type: application/json');
echo json_encode(array('apiKey' => getenv('OPENAI_API_KEY')));
?>
