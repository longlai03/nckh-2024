<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "IOTWEB");

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Lỗi kết nối database"]));
}

// Check for required fields
$requiredFields = ['username'];
foreach ($requiredFields as $field) {
    if (!isset($_POST[$field]) || empty($_POST[$field])) {
        die(json_encode(["success" => false, "message" => "Thiếu thông tin bắt buộc: $field"]));
    }
}

$username = $_POST["username"] ?? null;
$fullName = $_POST["fullName"] ?? null;
$email = $_POST["email"] ?? null;
$phone = $_POST["phone"] ?? null;
$gender = $_POST["gender"] ?? null;
$dob = $_POST["dob"] ?? null;
$avatarPath = null;

// Handle file upload
if (!empty($_FILES["avatar"]["name"])) {
    $targetDir = "uploads/";
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0755, true);
    }
    $avatarName = basename($_FILES["avatar"]["name"]);
    $avatarPath = $targetDir . time() . "_" . $avatarName;
    move_uploaded_file($_FILES["avatar"]["tmp_name"], $avatarPath);
}

// Prepare SQL for INSERT
$sql = "INSERT INTO users (username, fullName, email, phone, gender, dob";
$params = [$username, $fullName, $email, $phone, $gender, $dob];

if ($avatarPath) {
    $sql .= ", avatar";
    $params[] = $avatarPath;
}
$sql .= ") VALUES (". str_repeat("?,", count($params) - 1) . "?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param(str_repeat("s", count($params)), ...$params);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Thêm mới thành công", "avatar" => $avatarPath]);
} else {
    echo json_encode(["success" => false, "message" => "Lỗi khi thêm dữ liệu"]);
}

$stmt->close();
$conn->close();
?>