<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow CORS for React

$conn = new mysqli('localhost', 'root', '', 'iotweb');

if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

// Handle GET request (fetch data)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT time_recorded AS time, level_m, temp_c AS temperature, hum_percent AS humidity, ph 
                            FROM environmental_data 
                            ORDER BY time_recorded DESC 
                            LIMIT 50");
    $data = [];
    while ($row = $result->fetch_assoc()) {
        // Convert to numeric values, use null if not numeric
        $row['level_m'] = is_numeric($row['level_m']) ? floatval($row['level_m']) : null;
        $row['temperature'] = is_numeric($row['temperature']) ? floatval($row['temperature']) : null;
        $row['humidity'] = is_numeric($row['humidity']) ? floatval($row['humidity']) : null;
        $row['ph'] = is_numeric($row['ph']) ? floatval($row['ph']) : null;
        $data[] = $row;
    }
    echo json_encode($data, JSON_NUMERIC_CHECK); // Ensure numbers aren't strings
}

// Handle POST request (from IoT)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Extract input data matching the table columns
    $temp = $input['temperature'] ?? null;
    $humidity = $input['humidity'] ?? null;
    $level = $input['level'] ?? null; // Assuming level_m might come from IoT
    $ph = $input['ph'] ?? null;

    // Validate required fields (adjust based on your needs)
    if ($temp === null || $humidity === null) {
        echo json_encode(['error' => 'Missing temperature or humidity']);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO environmental_data (time_recorded, level_m, temp_c, hum_percent, ph) 
                           VALUES (NOW(), ?, ?, ?, ?)");
    $stmt->bind_param("dddd", $level, $temp, $humidity, $ph); // All decimals
    if ($stmt->execute()) {
        echo json_encode(['status' => 'Data inserted']);
    } else {
        echo json_encode(['error' => 'Failed to insert data: ' . $stmt->error]);
    }
    $stmt->close();
}

$conn->close();
?>