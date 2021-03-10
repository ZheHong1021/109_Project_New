$(function () {
  // PTX
  // https: //ptx.transportdata.tw/MOTC?t=Rail&v=2#!/Metro/MetroApi_ODFare
  $.ajax({
    // url: "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/KRTC?$format=JSON",
    url: "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/KRTC?$format=JSON",
    dataType: "json",
    success: function (result) {
      // console.log(result.length); // 求捕捉到的資料
      console.log('ticket....');
      console.log(result);
      // console.log(result[0]["DestinationStationName"]);
      // console.log(result[0]["DestinationStationName"]['Zh_tw']);
      // console.log(result[0]["DestinationStationName"]['En']);
      // console.log(result[0]["OriginStationID"]);

      // 擷取站點 id的第一個字母 (O為橘線，R為紅線)
      // var station_id = result[0]["OriginStationID"];
      // console.log(station_id.substr(0, 1));

      function select_Route(route) {
        /* 下拉式選單設定 */
        // 透過陣列將沒輸入進去的資料匯入，避免重複
        const select_box_Origin = document.querySelector('#Origin_StationName_List');
        const select_box_Destination = document.querySelector('#Destination_StationName_List');
        var station_list = [];
        const Transfer_Station = ['R10', 'O5'];

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
      }

      select_Route();

      $('select#select_Route').on('change', function () {
        select_Route($(this).val());
      });


      /* 下拉式選單設定 (End) */
      // $('button#go_Search').on('click', function () {
      //   $('div.result').html("");
      //   $('div.result').append("<h2>起站: " + $('#Origin_StationName_List').val() + "</h2>");
      //   $('div.result').append("<h2>迄站: " + $('#Destination_StationName_List').val() + "</h2>");

      //   for (let index = 0; index < result.length; index++) {
      //     var station_Name_O = result[index]['OriginStationID'] + ' ' + result[index]['OriginStationName']['Zh_tw'];
      //     var station_Name_D = result[index]['DestinationStationID'] + ' ' + result[index]['DestinationStationName']['Zh_tw'];
      //     if (station_Name_O == $('#Origin_StationName_List').val() &&
      //       station_Name_D == $('#Destination_StationName_List').val()) {
      //       var fares = result[index]['Fares'];
      //       var travel_Time = result[index]['TravelTime'];
      //       var travel_Distance = result[index]['TravelDistance'];
      //       $('div.result').append("<h2>到達時間約: " + travel_Time + "分鐘</h2>");
      //       $('div.result').append("<h2>路程距離: " + travel_Distance + "公里</h2>");
      //       // console.log(fares);
      //       for (let i = 0; i < fares.length; i++) {
      //         console.log(fares[i]);
      //         switch (fares[i]['FareClass']) {
      //           case 1:
      //             // console.log("成人票: " + fares[i]['Price'])
      //             $('div.result').append("<h2>成人票: $" + fares[i]['Price'] + "</h2>");
      //             break;
      //           case 2:
      //             // console.log("學生票: " + fares[i]['Price'])
      //             $('div.result').append("<h2>學生票: $" + fares[i]['Price'] + "</h2>");
      //             break;
      //           case 3:
      //             // console.log("孩童票: " + fares[i]['Price'])
      //             $('div.result').append("<h2>孩童票: $" + fares[i]['Price'] + "</h2>");
      //             break;
      //         }
      //       }
      //     }
      //   }
      // });

    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log(XMLHttpRequest);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });





});