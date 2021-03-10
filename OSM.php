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
        case 'Get_Transportation':
            get_transportation();
            break;
    }
}


function get_transportation()
{
    global $conn;
    $position = [];
    $check_val = isset($_POST['check_val']) ? $_POST['check_val'] : "";
    $search_val = isset($_POST['search_val']) ? $_POST['search_val'] : "";
    if ($search_val) {
        $input = " WHERE name LIKE '%" . $search_val . "%' or address LIKE
        '%" . $search_val . "%'";
    } else {
        $input = "";
    }

    $except = "";
    // $check_val = ["False", "True", "False"];
    if (isset($check_val) && !empty($check_val)) {
        for ($i = 1; $i <= count($check_val); $i++) {
            // echo $check_val[0];
            if ($check_val[$i - 1] == "False") {
                $except = $except .  " EXCEPT SELECT * FROM transportation WHERE C_id = " . $i;
            }
        }
    }



    // $sql = "SELECT * FROM transportation"  . $input . $except;
    $sql = "SELECT * FROM transportation";

    $stmt = $conn->query($sql);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $count = 0;

    // 【抓取天氣資料】
    // 調整時差問題
    date_default_timezone_set('Asia/Taipei');
    $now_Date = date("Y-m-d");  # 2021-2-16
    $now_Time = date("H:i:s");  # 15:54:21

    // 透過迴圈將資料庫資料都丟入到position陣列中，最後透過json_decode將結果傳回給 js
    foreach ($rows as $key => $value) {
        $position['Station'][$count]['station_info']['station_name'] = $value['name'];
        $position['Station'][$count]['station_info']['station_address'] = $value['address'];
        switch ($value['C_id']) {
            case 1:
                $position['Station'][$count]['station_info']['category'] = "台鐵";
                break;
            case 2:
                $position['Station'][$count]['station_info']['category'] = "捷運";
                break;
            case 3:
                $position['Station'][$count]['station_info']['category'] = "輕軌";
                break;
        }
        $position['Station'][$count]['coordinates']['longitude'] = $value['longitude'];
        $position['Station'][$count]['coordinates']['latitude'] = $value['latitude'];


        // -- MS_SQL用法: CHARINDEX(City, "高雄市鼓山區臨海二路17-1號B1")
        // -- MySQL用法:  instr("高雄市鼓山區臨海二路17-1號B1", City)
        // 抓取未來三個小時的天氣現象
        // $sql = "SELECT T, AT, RH, Time, PoP6h, Wx FROM get_weather
        $sql = "SELECT T, PoP6h FROM get_weather
        WHERE Day = '{$now_Date}'
        AND TIME < '{$now_Time}'
        AND instr('{$value['address']}', City) != 0
        AND instr('{$value['address']}', District) != 0
        ORDER BY TIME DESC
         LIMIT 1";

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $fetch = $stmt->fetch();

        # 如果該站點地址不能對應中央氣象局的資料(縣市、鄉鎮區)，則只捕捉縣市
        if (!empty($fetch)) {
            // $position['Station'][$count]['weather']['T'] = $fetch['T'];
            // $position['Station'][$count]['weather']['Time'] = $fetch['Time'];
            // $position['Station'][$count]['weather']['AT'] = $fetch['AT'];
            // $position['Station'][$count]['weather']['RH'] = $fetch['RH'];
            // $position['Station'][$count]['weather']['PoP6h'] = $fetch['PoP6h'];
            // $position['Station'][$count]['weather']['Wx'] = $fetch['Wx'];
            $position['Station'][$count]['weather']['T'] = $fetch['T'];
            $position['Station'][$count]['weather']['PoP6h'] = $fetch['PoP6h'];
        } else {

            $position['Station'][$count]['weather']['underfied'] = "123";
            # 這邊將 District去除掉
            // $sql = "SELECT T, AT, RH, PoP6h, Wx FROM get_weather
            $sql = "SELECT T, PoP6h FROM get_weather
            WHERE Day = '{$now_Date}'
            AND TIME < '{$now_Time}'
            AND instr('{$value['address']}', City) != 0
            ORDER BY TIME DESC
            LIMIT 1";

            $stmt_underfied = $conn->prepare($sql);
            $stmt_underfied->execute();
            $fetch_underfied = $stmt_underfied->fetch();
            if (!empty($fetch_underfied)) {
                // $position['Station'][$count]['weather']['T'] = $fetch_underfied['T'];
                // $position['Station'][$count]['weather']['AT'] = $fetch_underfied['AT'];
                // $position['Station'][$count]['weather']['RH'] = $fetch_underfied['RH'];
                // $position['Station'][$count]['weather']['PoP6h'] = $fetch_underfied['PoP6h'];
                // $position['Station'][$count]['weather']['Wx'] = $fetch_underfied['Wx'];
                $position['Station'][$count]['weather']['T'] = $fetch_underfied['T'];
                $position['Station'][$count]['weather']['PoP6h'] = $fetch_underfied['PoP6h'];
            }
        }


        $count++;
    }

    // 如果資料庫找不到輸入的尋找資訊時，直接回傳 [no_data]，並離開迴圈
    if ($position == []) {
        $position['Station']['message'] = "no_data";
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

// get_transportation();


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
