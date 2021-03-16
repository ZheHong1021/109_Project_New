$(function () {

  let results;
  // PTX
  function select_Route(route) {
    $.ajax({
      // url: "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/KRTC?$format=JSON",
      // url: "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/TRTC?$format=JSON",
      // url: "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/TYMC?$format=JSON",
      // url: "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/TMRT?$format=JSON",
      url: "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/" + route + "?$format=JSON",
      dataType: "json",
      success: function (result) {
        results = $.parseJSON(JSON.stringify(result));
        /* 下拉式選單設定 */
        // 透過陣列將沒輸入進去的資料匯入，避免重複
        const select_box_Origin = document.querySelector('#Origin_StationName_List');
        const select_box_Destination = document.querySelector('#Destination_StationName_List');
        // 點選下拉選單後必須先把原把 options的資料給清空，不然會重疊
        select_box_Origin.length = 0;
        select_box_Destination.length = 0;

        $('img.routing-img').attr('srcset', "img/mrt/" + route + ".jpg");

        var station_list = [];

        for (let index = 0; index < result.length; index++) {
          var station_Name = result[index]["OriginStationName"]['Zh_tw'];
          var station_id = result[index]["OriginStationID"];

          // 如果該站名還沒輸入進去，就輸入
          if (!station_list.includes(station_Name) && !station_list.includes(station_id)) {
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

  select_Route("KRTC");
  $('select#City_List').on('change', function () {
    select_Route($(this).val());
  });



  /* 下拉式選單設定 (End) */
  $('button#go_Search_MRT').on('click', function () {
    $('span.spinner-border').removeAttr("hidden");
    $('button#go_Search').prop("disabled", true);
    $('div#mrt-result').html("載入中......");
    setTimeout(function () {
      $('div#mrt-result').removeClass('text-center');
      $('div#mrt-result').html("");
      $('div#mrt-result').append("<h2>起站: " + $('#Origin_StationName_List').val() + "</h2>");
      $('div#mrt-result').append("<h2>迄站: " + $('#Destination_StationName_List').val() + "</h2>");

      for (let index = 0; index < results.length; index++) {
        var station_Name_O = results[index]['OriginStationID'] + ' ' + results[index]['OriginStationName']['Zh_tw'];
        var station_Name_D = results[index]['DestinationStationID'] + ' ' + results[index]['DestinationStationName']['Zh_tw'];
        if (station_Name_O == $('#Origin_StationName_List').val() &&
          station_Name_D == $('#Destination_StationName_List').val()) {
          var fares = results[index]['Fares'];
          var travel_Time = results[index]['TravelTime'];
          var travel_Distance = results[index]['TravelDistance'];

          // 高捷有給，但北捷沒給，所以要設一個判斷式避免抓取到 underfinded的資料
          if (travel_Time) {
            $('div#mrt-result').append("<h2>到達時間約: " + travel_Time + "分鐘</h2>");
          }
          if (travel_Distance) {
            $('div#mrt-result').append("<h2>路程距離: " + travel_Distance + "公里</h2>");
          }
          console.log(fares);
          for (let i = 0; i < fares.length; i++) {
            console.log(fares[i]);
            // FareClass(Int32): 費率等級 (1: 成人(Adult), 2: 學生(Student), 3: 孩童(Child), 4: 敬老(Senior),
            // 5: 愛心(Disabled), 6: 愛心孩童(Disabled Child), 7: 愛心優待 / 愛心陪伴, 8: 團體(Group)),
            if (fares[i]['TicketType'] == 1) {
              switch (fares[i]['FareClass']) {
                case 1:
                  $('div#mrt-result').append("<h2>成人票: $" + fares[i]['Price'] + "</h2>");
                  break;
                case 2:
                  $('div#mrt-result').append("<h2>學生票: $" + fares[i]['Price'] + "</h2>");
                  break;
                case 3:
                  $('div#mrt-result').append("<h2>孩童票: $" + fares[i]['Price'] + "</h2>");
                  break;
                case 4:
                  $('div#mrt-result').append("<h2>敬老票: $" + fares[i]['Price'] + "</h2>");
                  break;
                case 5:
                  $('div#mrt-result').append("<h2>愛心票: $" + fares[i]['Price'] + "</h2>");
                  break;
                case 6:
                  $('div#mrt-result').append("<h2>愛心孩童票: $" + fares[i]['Price'] + "</h2>");
                  break;
                case 7:
                  $('div#mrt-result').append("<h2>愛心優待 / 愛心陪伴票: $" + fares[i]['Price'] + "</h2>");
                  break;
                case 8:
                  $('div#mrt-result').append("<h2>團體票: $" + fares[i]['Price'] + "</h2>");
                  break;
              }
            }
          }
        }
      }
      $('span.spinner-border').prop("hidden", true);
      $('button#go_Search').prop("disabled", false);
    }, 1500);
  });




  /* 下拉式選單設定 (End) */
  $('button#go_Search_TRA').on('click', function () {
    $('span.spinner-border').removeAttr("hidden");
    $('button#go_Search_TRA').prop("disabled", true);
    $('div#tra-result').html("載入中......");
    setTimeout(function () {
      $('div#tra-result').removeClass('text-center');
      $('div#tra-result').html("");
      $('div#tra-result').append("<h2>起站: " + $('#TRA_Origination_Station_List').val() + "</h2>");
      $('div#tra-result').append("<h2>迄站: " + $('#TRA_Destination_Station_List').val() + "</h2>");

      for (let index = 0; index < results.length; index++) {
        var station_Name_O = results[index]['OriginStationID'] + ' ' + results[index]['OriginStationName']['Zh_tw'];
        var station_Name_D = results[index]['DestinationStationID'] + ' ' + results[index]['DestinationStationName']['Zh_tw'];
        if (station_Name_O == $('#TRA_Origination_Station_List').val() &&
          station_Name_D == $('#TRA_Destination_Station_List').val()) {
          var fares = results[index]['Fares'];
          var travel_Time = results[index]['TravelTime'];
          var travel_Distance = results[index]['TravelDistance'];

          // 高捷有給，但北捷沒給，所以要設一個判斷式避免抓取到 underfinded的資料
          // if (travel_Time) {
          //   $('div#mrt-result').append("<h2>到達時間約: " + travel_Time + "分鐘</h2>");
          // }
          // if (travel_Distance) {
          //   $('div#mrt-result').append("<h2>路程距離: " + travel_Distance + "公里</h2>");
          // }
          console.log(fares);
          for (let i = 0; i < fares.length; i++) {
            console.log(fares[i]);
          }
        }
      }
      $('span.spinner-border').prop("hidden", true);
      $('button#go_Search_TRA').prop("disabled", false);
    }, 1500);
  });


});