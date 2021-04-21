$(function () {
  // 透過 PTX(公共交通運輸服務平台)來擷取各個交通工具的資訊

  // select_Route(route): 用來決定要擷取哪個縣市的捷運 (KRTC: 高雄捷運；KLRT: 高雄輕軌 ；TRTC: 台北捷運； TYMC: 桃園捷運； TMRT: 台中捷運)
  // 透過呼叫函式並給予參數來決定呼叫哪個 API
  // 設立一個變數來存放利用 Ajax從 API中得到的 JSON，並轉換成 array方便使用
  let results_MRT;

  function select_Route(route) {
    $.ajax({
      // url: "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/KRTC?$format=JSON",
      // url: "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/TRTC?$format=JSON",
      // url: "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/TYMC?$format=JSON",
      // url: "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/TMRT?$format=JSON",
      url: "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/" + route + "?$format=JSON",
      dataType: "json",
      contentType: 'json',
      headers: GetAuthorizationHeader(), // 憑證 API token
      success: function (result) {
        // JSON轉換成 Array
        results_MRT = $.parseJSON(JSON.stringify(result));
        /* 下拉式選單設定 */
        // 透過陣列將沒輸入進去的資料匯入，避免重複
        const select_box_Origin = document.querySelector('#Origin_StationName_List');
        const select_box_Destination = document.querySelector('#Destination_StationName_List');
        // 點選下拉選單後必須先把原把 options的資料給清空，不然會重疊
        // select_box_Origin.length = 0;
        // select_box_Destination.length = 0;

        // 插入圖片，透過點選連結可以 show出來
        $('img.routing-img').attr('srcset', "img/mrt/" + route + ".jpg");

        // 設立一個陣列，記錄目前已存放的站點資料，如果已在陣列中則不會進入條件式，避免重複紀錄
        let station_list = [];
        for (let index = 0; index < result.length; index++) {
          var station_Name = result[index]["OriginStationName"]['Zh_tw'];
          var station_id = result[index]["OriginStationID"];
          // 如果該站名還沒輸入進去，就輸入
          if (!station_list.includes(station_Name) && !station_list.includes(station_id)) {
            // let route_Select = station_id.match(/([A-Z])/g).join('');
            // console.log(route_Select);
            // 建立物件
            const option_Origin = document.createElement('option');
            const option_Destination = document.createElement('option');
            // 設定值
            option_Origin.text = station_id + " " + station_Name;
            option_Destination.text = station_id + " " + station_Name;
            // 新增物件到下拉式選單中
            select_box_Origin.appendChild(option_Origin);
            select_box_Destination.appendChild(option_Destination);
            // 輸入過的資料就進入陣列，在下一輪迴圈時，就不會被新增進去
            station_list.push(station_Name);
            station_list.push(station_id);
          }
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  };

  // 預設為【高雄捷運】
  select_Route("KRTC");
  // 當下拉選單有變動時，就呼叫函式
  $('select#City_List').on('change', function () {
    let select_val = $(this).val();
    const select_box_Origin = document.querySelector('#Origin_StationName_List');
    const select_box_Destination = document.querySelector('#Destination_StationName_List');
    // 點選下拉選單後必須先把原把 options的資料給清空，不然會重疊
    select_box_Origin.length = 0;
    select_box_Destination.length = 0;
    $('div.bus-loading').show();
    setTimeout(function(){
      select_Route(select_val);
      $('div.bus-loading').hide();
    }, 1500);
  });
  /* 下拉式選單設定 (End) */

  /*****
   *** 捷運抓取票價 ***
   *****/
  // 透過點擊事件，執行Ajax來呼叫 API
  $('button#go_Search_MRT').on('click', function () {
    /* Loading效果 */
    $('span#spinner-MRT').removeAttr("hidden"); // 清除隱藏效果(原本有)，這樣按鈕就有 Loading動畫
    $('button#go_Search_MRT').prop("disabled", true); // 當你點擊按鈕後，將按鈕 disabled不能再點擊，避免重複執行
    $('div#mrt_result').html("載入中......"); // 讓輸出框有個載入效果

    // 設立延遲時間
    setTimeout(function () {
      $('div#mrt_result').removeClass('text-center'); // 原本輸出框是置中對齊(Boostrap)，但這樣資料呈現會很醜，變成靠左
      $('div#mrt_result').html(""); // 清出原本輸出框的內容
      $('div#mrt_result').append("<h2>起站: " + $('#Origin_StationName_List').val() + "</h2>"); // 疊加起站站名
      $('div#mrt_result').append("<h2>迄站: " + $('#Destination_StationName_List').val() + "</h2>"); // 疊加迄站站名

      for (let index = 0; index < results_MRT.length; index++) {
        var station_Name_O = results_MRT[index]['OriginStationID'] + ' ' + results_MRT[index]['OriginStationName']['Zh_tw'];
        var station_Name_D = results_MRT[index]['DestinationStationID'] + ' ' + results_MRT[index]['DestinationStationName']['Zh_tw'];
        // 當 API Response的資料中有跟目前下拉選單所選取的結果相同，則捕捉票價資訊
        if (station_Name_O == $('#Origin_StationName_List').val() &&
          station_Name_D == $('#Destination_StationName_List').val()) {
          var fares = results_MRT[index]['Fares'];
          var travel_Time = results_MRT[index]['TravelTime'];
          var travel_Distance = results_MRT[index]['TravelDistance'];

          // 當有抵達時間和路線距離時則執行，避免像是這些資訊高捷有給，但北捷沒給，所以要設一個判斷式避免抓取到 underfinded的資料
          if (travel_Time) {
            $('div#mrt_result').append("<h2>到達時間約: " + travel_Time + "分鐘</h2>");
          }
          if (travel_Distance) {
            $('div#mrt_result').append("<h2>路程距離: " + travel_Distance + "公里</h2>");
          }

          for (let i = 0; i < fares.length; i++) {
            // FareClass(Int32): 費率等級 (1: 成人(Adult), 2: 學生(Student), 3: 孩童(Child), 4: 敬老(Senior),
            // 5: 愛心(Disabled), 6: 愛心孩童(Disabled Child), 7: 愛心優待 / 愛心陪伴, 8: 團體(Group)),
            if (fares[i]['TicketType'] == 1) {
              switch (fares[i]['FareClass']) {
                case 1:
                  $('div#mrt_result').append("<h2>成人票: $" + fares[i]['Price'] + "</h2>");
                  break;
                case 2:
                  $('div#mrt_result').append("<h2>學生票: $" + fares[i]['Price'] + "</h2>");
                  break;
                case 3:
                  $('div#mrt_result').append("<h2>孩童票: $" + fares[i]['Price'] + "</h2>");
                  break;
                case 4:
                  $('div#mrt_result').append("<h2>敬老票: $" + fares[i]['Price'] + "</h2>");
                  break;
                case 5:
                  $('div#mrt_result').append("<h2>愛心票: $" + fares[i]['Price'] + "</h2>");
                  break;
                case 6:
                  $('div#mrt_result').append("<h2>愛心孩童票: $" + fares[i]['Price'] + "</h2>");
                  break;
                case 7:
                  $('div#mrt_result').append("<h2>愛心優待 / 愛心陪伴票: $" + fares[i]['Price'] + "</h2>");
                  break;
                case 8:
                  $('div#mrt_result').append("<h2>團體票: $" + fares[i]['Price'] + "</h2>");
                  break;
              }
            }
          }
        }
      }

      // 當執行完後，則將按鈕恢復成可點擊狀態(abled)，Spinner關閉(hidden)
      $('span#spinner-MRT').prop("hidden", true);
      $('button#go_Search_MRT').prop("disabled", false);
    }, 1500);
  });
  /* 下拉式選單設定 (End) */



  /*****
   *** 台鐵下拉選單設定 ***
   *****/
  // 設立一個變數來存放利用 Ajax從 API中得到的 JSON，並轉換成 array方便使用
  let results_TRA;
  $.ajax({
    url: "https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/Station?$format=JSON",
    dataType: "json",
    contentType: 'json',
    headers: GetAuthorizationHeader(), // 憑證 API token
    // 當成功從 php回傳 json結果(result)的話
    success: function (result) {
      // console.log(result);
      // 將回傳的JSON轉成陣列座使用
      results_TRA = $.parseJSON(JSON.stringify(result));
      // 紀錄各縣市的車站再來分類
      let city_arr = [];
      for (let i = 0; i < result.length; i++) {
        // 抓縣市(前兩個字)
        let city = result[i]['LocationCity'].substr(0, 2);
        // 如果當前陣列沒有此縣市，就 push進去且加入一個 optgroup到下拉選單中；反之有就不用
        if (!(city_arr.includes(city))) {
          city_arr.push(city);
          $('select.selectpicker').append($('<optgroup></optgroup>').prop('label', city));
        }
        // 將各車站個別匯入到各個縣市的 optgroup中
        $('optgroup[label=' + city + ']').append($('<option></option>').html(result[i]['StationName']['Zh_tw']));
      }
    },
    // 當Ajax請求失敗
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log(XMLHttpRequest);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });


  // 查詢台鐵車票
  $('button#go_Ticket_Search_TRA').on('click', function () {
    // Loading動畫設定 (開啟)
    $('span#spinner-TRA-Ticket').removeAttr("hidden");
    $('button#go_Ticket_Search_TRA').prop("disabled", true);
    $('div#tra_result').html("載入中......");

    setTimeout(function () {
      // 如果其中一個下拉選單沒有選取值，則不執行 Ajax來呈現資料，
      if ($('#TRA_Origination_Station_List').val() == null || $('#TRA_Destination_Station_List').val() == null) {
        $('div#tra_result').html("");
        $('div#tra_result').append("<h2> ❗ 請確實填入站點資訊 ❗</h2>");
      }
      // 如果沒有上述問題，則正常進行
      else {
        $('div#tra_result').removeClass('text-center');
        $('div#tra_result').html("");
        $('div#tra_result').append("<h2>起站: " + $('#TRA_Origination_Station_List').val() + "</h2>");
        $('div#tra_result').append("<h2>迄站: " + $('#TRA_Destination_Station_List').val() + "</h2>");
        for (let index = 0; index < results_TRA.length; index++) {
          if (results_TRA[index]['StationName']['Zh_tw'] == $('#TRA_Origination_Station_List').val()) {
            var station_ID_O = results_TRA[index]['StationID'];
          }
          if (results_TRA[index]['StationName']['Zh_tw'] == $('#TRA_Destination_Station_List').val()) {
            var station_ID_D = results_TRA[index]['StationID'];
          }
        }
        // console.log(station_ID_O);
        // console.log(station_ID_D);

        // TRA Fare API (Required: 起站 ID、 迄站 ID)
        $.ajax({
          url: "https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/ODFare/" + station_ID_O + "/to/" + station_ID_D + "?$format=JSON",
          dataType: "json",
          contentType: 'json',
          headers: GetAuthorizationHeader(), // 憑證 API token
          // 當成功從 php回傳 json結果(result)的話
          success: function (result) {
            // 回傳只有一筆，所以就用 0就好
            let fares = result[0]['Fares'];
            console.log(fares);
            for (let i = 0; i < fares.length; i++) {
              $('div#tra_result').append("<h2>" + fares[i]['TicketType'] + "票: $" + fares[i]['Price'] + "</h2>");
            }
          },
          // 當Ajax請求失敗
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
          }
        });
      }
      // Loading動畫設定 (關閉)
      $('span#spinner-TRA-Ticket').prop("hidden", true);
      $('button#go_Ticket_Search_TRA').prop("disabled", false);
    }, 1500);
  });
  /* ------台鐵(END)------ */


  // 查詢台鐵車班
  $('button#go_Time_Search_TRA').on('click', function () {
    // Loading動畫設定 (開啟)
    $('span#spinner-TRA-Time').removeAttr("hidden");
    $('button#go_Time_Search_TRA').prop("disabled", true);
    $('div#tra_result').html("載入中......");

    setTimeout(function () {
      if ($('#TRA_Origination_Station_List').val() == null || $('#TRA_Destination_Station_List').val() == null) {
        $('div#tra_result').html("");
        $('div#tra_result').append("<h2> ❗ 請確實填入站點資訊 ❗</h2>");
      }
      // 如果沒有上述問題，則正常進行
      else {
        $('div#tra_result').removeClass('text-center');
        $('div#tra_result').html("");
        for (let index = 0; index < results_TRA.length; index++) {
          if (results_TRA[index]['StationName']['Zh_tw'] == $('#TRA_Origination_Station_List').val()) {
            var station_ID_O = results_TRA[index]['StationID'];
          }
          if (results_TRA[index]['StationName']['Zh_tw'] == $('#TRA_Destination_Station_List').val()) {
            var station_ID_D = results_TRA[index]['StationID'];
          }
        }
        // console.log(station_ID_O);
        // console.log(station_ID_D);

        // 得到今天的日期資料
        const Today = new Date()
        const date = Today.getDate() + 1 > 10 ? Today.getDate() : '0' + Today.getDate();
        // month的部分，他一月為 0開始，所以要都加 1喔
        const month = Today.getMonth() + 1 > 10 ? Today.getMonth() + 1 : '0' + (Today.getMonth() + 1);
        const year = Today.getFullYear()
        const train_Date = year + '-' + month + '-' + date;
        // alert(train_Date);

        // TRA TrainTime API (Required: 起站 ID、 迄站 ID、 日期)
        $.ajax({
          url: "https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/DailyTimetable/OD/" + station_ID_O + "/to/" + station_ID_D + "/" + train_Date + "?$format=JSON",
          dataType: "json",
          headers: GetAuthorizationHeader(), // 憑證 API token
          // 當成功從 php回傳 json結果(result)的話
          success: function (result) {
            // console.log(result);
            for (let index = 0; index < result.length; index++) {
              let train_No = result[index]['DailyTrainInfo']['TrainNo']; // 車次代號
              let direction = result[index]['DailyTrainInfo']['Direction']; // 順(0)逆(1)行
              let startingStationName = result[index]['DailyTrainInfo']['StartingStationName']['Zh_tw']; // 列車起點車站名稱
              let endingStationName = result[index]['DailyTrainInfo']['EndingStationName']['Zh_tw']; // 列車終點車站名稱
              let trainTypeName = result[index]['DailyTrainInfo']['TrainTypeName']['Zh_tw']; // 列車車種名稱
              let O_stationName = result[index]['OriginStopTime']['StationName']['Zh_tw']; // 上車的站名
              let O_ArrivalTime = result[index]['OriginStopTime']['ArrivalTime']; // 上車的時間
              let D_stationName = result[index]['DestinationStopTime']['StationName']['Zh_tw']; // 下車的站名
              let D_ArrivalTime = result[index]['DestinationStopTime']['ArrivalTime']; // 下車的時間
              // 計算時間差
              // var start_time = "08:10";
              // var end_time = "09:30";
              _startTime = O_ArrivalTime.split(":");
              _endTime = D_ArrivalTime.split(":");
              var startDate = new Date(0, 0, 0, _startTime[0], _startTime[1], 0);
              var EndDate = new Date(0, 0, 0, _endTime[0], _endTime[1], 0);
              EndDate.setHours(EndDate.getHours() - startDate.getHours());
              EndDate.setMinutes(EndDate.getMinutes() - startDate.getMinutes());
              resultTime = EndDate.getHours() + "小時" + EndDate.getMinutes() + "分鐘";

              $('div#tra_result').append("<h2>日期: " + train_Date + "</h2>");
              $('div#tra_result').append("<h2>車次代號: " + train_No + "</h2>");
              $('div#tra_result').append("<h2>順(0)逆(1)行: " + direction + "</h2>");
              $('div#tra_result').append("<h2>起發站: " + startingStationName + "</h2>");
              $('div#tra_result').append("<h2>終點站: " + endingStationName + "</h2>");
              $('div#tra_result').append("<h2>列車車種名稱: " + trainTypeName + "</h2>");
              $('div#tra_result').append("<h2>起站: " + O_stationName + "</h2>");
              $('div#tra_result').append("<h2>上車的時間: " + O_ArrivalTime + "</h2>");
              $('div#tra_result').append("<h2>迄站: " + D_stationName + "</h2>");
              $('div#tra_result').append("<h2>下車的時間: " + D_ArrivalTime + "</h2>");
              $('div#tra_result').append("<h2>需花費: " + resultTime + "</h2>");
              $('div#tra_result').append("<h2>--------------------------------</h2>");
            }




          },
          // 當Ajax請求失敗
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
          }
        });
      }
      // Loading動畫設定 (關閉)
      $('span#spinner-TRA-Time').prop("hidden", true);
      $('button#go_Time_Search_TRA').prop("disabled", false);
    }, 1500);
  });
  /* ------台鐵(END)------ */




});