<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Methods: GET, POST');
$conn = mysqli_connect('localhost','root','','iotweb',3307);
$sql = 'select * from statistic';
$mysqli = mysqli_query($conn, $sql);
$json_data=array();
while($row = mysqli_fetch_assoc($mysqli))
{
    $json_data[]=$row;
}
echo json_encode(['phpresult'=>$json_data]);