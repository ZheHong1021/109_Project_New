<?php
require_once('db_connect.php');


if (isset($_POST['action']) && !empty($_POST['action'])) //判別使用哪個function
{
    $action = $_POST['action'];
    switch ($action) {
        case 'getdata':
            getdata();
            break;
            // ...etc...
        case 'weather_Data':
            get_WeatherData();
            break;
        case 'Insert_Users_Pos':
            Insert_Users_Pos();
    }
}



function get_WeatherData()
{
    global $conn;
    $position = [];
 // 【抓取天氣資料】
    // 調整時差問題
    date_default_timezone_set('Asia/Taipei');
    $now_Date = date("Y-m-d");  # 2021-2-16
    $now_Time = date("H:i:s");  # 15:54:21
    $before_Time = date("H:i:s", strtotime('-3 hours')); # 12:54:21

    $sql = "SELECT City, District, T, AT, PoP6h, Time FROM get_weather
    WHERE Day = '{$now_Date}'
    AND TIME < '{$now_Time}'
	AND TIME > '{$before_Time}'
    ORDER BY TIME DESC";
     

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
   
    $count = 0;
    // 透過迴圈將資料庫資料都丟入到position陣列中，最後透過json_decode將結果傳回給 js
    foreach ($rows as $key => $value) {
        $position[$count]['City'] = $value['City'];
        $position[$count]['District'] = $value['District'];
        $position[$count]['PoP6h'] = $value['PoP6h'];
        $position[$count]['Time'] = $value['Time'];
        $position[$count]['T'] = $value['T'];
        $position[$count]['AT'] = $value['AT'];
        $count++;
    }

    // 如果資料庫找不到輸入的尋找資訊時，直接回傳 [no_data]，並離開迴圈
    if ($position == []) {
        $position['message'] = "no_data";
        echo json_encode(
            array(
                "message" => "no_data"
            )
        );
        exit;
    }

    // 透過 JSON方式回傳回前端地圖中
    echo json_encode($position);
}



function getdata()
{
    global $conn;
    global $select_info;
    $position = [];

    $sql = "SELECT * FROM robber UNION SELECT * FROM police_station UNION SELECT * FROM monitor UNION SELECT * FROM snatch ";

    $stmt = $conn->query($sql);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);;
    $count = 0;

    // 透過迴圈將資料庫資料都丟入到position陣列中，最後透過json_decode將結果傳回給 js
    foreach ($rows as $key => $value) {
        $position['sign'][$count]['sign_name'] = $value['name'];
        $position['sign'][$count]['sign_address'] = $value['address'];
        $position['sign'][$count]['sign_date'] = $value['date'];
        $position['sign'][$count]['sign_time'] = $value['time'];
        $position['sign'][$count]['sign_department'] = $value['department'];
        $position['sign'][$count]['category'] = $value['category'];
        $position['markerPoint'][$count]['longitude'] = $value['longitude'];
        $position['markerPoint'][$count]['latitude'] = $value['latitude'];

        $count++;
    }

    echo json_encode($position);
}




// function get_Users_Pos()
// {
//     global $conn;
//     $position = [];
//     $sql = "SELECT * FROM user_Position";
//     $stmt = $conn->query($sql);
//     $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);;
//     $count = 0;

//     // 透過迴圈將資料庫資料都丟入到position陣列中，最後透過json_decode將結果傳回給 js
//     foreach ($rows as $key => $value) {
//         $position['sign'][$count]['guest_id'] = $value['id'];
//         $position['sign'][$count]['Lat'] = $value['lat'];
//         $position['sign'][$count]['Lng'] = $value['lng'];
//         $count++;
//     }

//     echo json_encode($position);
// }

function Insert_Users_Pos()
{
    $id = isset($_POST['guest_id']) ? $_POST['guest_id']: '';
    $lat = isset($_POST['lat']) ? $_POST['lat']: '';
    $lng = isset($_POST['lng']) ? $_POST['lng']: '';
 
    global $conn;
    // $input = array(':id' => $id,':lat' => $lat,':lng' => $lng);
    // $sql = "UPDATE  `user_position`  SET id=:id, lat=:lat, lng=:lng";
    // $sth = $conn->prepare($sql);
    // $sth->execute($input);
    
    $input = array(':id' => $id,':lat' => $lat,':lng' => $lng);
    $sql = "INSERT INTO `user_position` (id, lat, lng) VALUES(:id,:lat,:lng)";
    $sth = $conn->prepare($sql);
    $sth->execute($input);
}

