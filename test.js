$(function(){

    $('select#city-select').on('change', function(){
        city_name = $(this).val();
        $('select#route-select').html('');
        $.ajax({
          url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city_name}?$select=RouteName%2C%20RouteUID&$format=JSON`,
            dataType: 'json',
            contentType: 'json',
            headers: GetAuthorizationHeader(), // 憑證 API token
            success: function (result) {
              Object.keys(result).forEach(function (value, key) {
                $('select#route-select').append(
                  `<option value="${result[value]['RouteName']['Zh_tw']}" data-RouteUID = "${result[value]['RouteUID']}">${result[value]['RouteName']['Zh_tw']}</option>`
                );
              });
            },
            // 當Ajax請求失敗
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log(XMLHttpRequest);
              console.log(textStatus);
              console.log(errorThrown);
            }
          });
    });

    let result_BusInfo;
    $('select#route-select').on('change', function(){
      let city_name = $('select#city-select').val();
      let route_name = $('select#route-select').val();
      let route_UID  = $('option:selected', this).attr('data-RouteUID');
      $.ajax({
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city_name}/${route_name}?$select=RouteUID,DepartureStopNameZh%2C%20DestinationStopNameZh&$filter=RouteUID%20eq%20'${route_UID}'&$format=JSON`,
          dataType: 'json',
          contentType: 'json',
          headers: GetAuthorizationHeader(), // 憑證 API token
          success: function (result) {
            // console.log(result);
            result_BusInfo = $.parseJSON(JSON.stringify(result));
            $(`button[data-direct = '0']`).html('往' + result_BusInfo[0]['DestinationStopNameZh']);
            $(`button[data-direct = '1']`).html('往' + result_BusInfo[0]['DepartureStopNameZh']);
          },
          // 當Ajax請求失敗
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
          }
        });
      });
    

    let bus_update_Time =  function(direct, stopName){
      let city_name = $('select#city-select').val();
      let route_name = $('select#route-select').val();
      let route_UID = $('select#route-select option:selected').attr('data-RouteUID');
      $.ajax({
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${city_name}/${route_name}?$filter=RouteUID%20eq%20'${route_UID}'%20AND%20StopName%2FZh_tw%20eq%20'${stopName}'%20AND%20(Direction%20eq%20${direct}%20OR%20Direction%20eq%20255)&$format=JSON`,
          dataType: 'json',
          contentType: 'json',
          headers: GetAuthorizationHeader(), // 憑證 API token
          success: function (result) {
            // console.log(result);
              let estimateTime_Status;
              if(result[0]['EstimateTime'] != null){
                let estimateTime = result[0]['EstimateTime'];

                // 如果當前有一筆以上的估計時間，我們要優先取距離現在最少時間的估計時間，如只有一筆就不影響
                if(Object.keys(result).length > 1){
                  for(let i = 1 ; i < Object.keys(result).length; i++){
                    if(result[i]['EstimateTime'] < estimateTime ){
                      estimateTime = result[i]['EstimateTime'];
                    }
                  }
                }
                  if(parseInt(estimateTime / 60) == 0){
                    estimateTime_Status = "進站中";
                    $(`span[data-stopName = "${stopName}"]`).removeClass("bg-success");
                    $(`span[data-stopName = "${stopName}"]`).addClass("bg-danger");
                  }else if(parseInt(estimateTime / 60) <= 3){
                    estimateTime_Status = "即將進站";
                    $(`span[data-stopName = "${stopName}"]`).removeClass("bg-success");
                    $(`span[data-stopName = "${stopName}"]`).addClass("bg-warning");
                  }else{
                    estimateTime_Status = parseInt(estimateTime / 60) + "分";
                  }
                }else if(result[0]['StopStatus'] == 1){
                  estimateTime_Status = "尚未發車";
                    $(`span[data-stopName = "${stopName}"]`).removeClass("bg-success");
                    $(`span[data-stopName = "${stopName}"]`).addClass("bg-secondary ");
                }
                else if(result[0]['StopStatus'] == 2){
                  estimateTime_Status = "此站不停靠";
                  $(`span[data-stopName = "${stopName}"]`).removeClass("bg-success");
                  $(`span[data-stopName = "${stopName}"]`).addClass("bg-secondary ");
              }
                else if(result[0]['StopStatus'] == 4){
                  estimateTime_Status = "今日停駛";
                  $(`span[data-stopName = "${stopName}"]`).removeClass("bg-success");
                  $(`span[data-stopName = "${stopName}"]`).addClass("bg-secondary ");
              }
              else{
                estimateTime_Status = result[0]['NextBusTime'] ? result[0]['NextBusTime'].substr(result[0]['NextBusTime'].indexOf("T") + 1, 5 ) : "末班已駛";
                  $(`span[data-stopName = "${stopName}"]`).removeClass("bg-success");
                  $(`span[data-stopName = "${stopName}"]`).addClass("bg-secondary ");
              }

              $(`span[data-stopName = "${stopName}"]`).html(`${estimateTime_Status}`);
              
          },
          // 當Ajax請求失敗
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
          }
        });
    };


    $('button#bus_update').on('click', function(){
      let city_name = $('select#city-select').val();
      let route_name = $('select#route-select').val();
      let direct = $(this).attr('data-direct');
      $('div.haha').html('');
      $('h2.count').html('');
     
      // 得到 HeadSign XX - XX
      // 往XXX
      let to_Station = direct == 0 ? result_BusInfo[0]['DestinationStopNameZh'] : result_BusInfo[0]['DepartureStopNameZh'];

      /* ==公車路線== */
      $.ajax({
        url: "https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/" + city_name + "/" + route_name + "?$select=RouteUID%2C%20RouteName%2C%20Direction%2C%20Stops&$filter=RouteName%2FZh_tw%20eq%20'" + route_name + "'%20and%20Direction%20eq%20" + direct + "&$format=JSON",
        dataType: 'json',
        contentType: 'json',
        headers: GetAuthorizationHeader(), // 憑證 API token
        success: function (result) {
          let total_Stops = [];
          let bus_Route_UID ;

          Object.keys(result).forEach(function (value, key) {
            let bus_Route_len = result[value]['Stops'].length;
            bus_Route_UID = result[value]['RouteUID'];

            for (let i = 0; i < bus_Route_len; i++) {
              let stopName =  result[value]['Stops'][i]['StopName']['Zh_tw'];
              if(!total_Stops.includes(stopName)){
                // 從第 i中插入一個新的站名
                total_Stops.splice(i, 0, stopName);
              }
            }
          });
          $('div.haha').append(`
          <div id='${bus_Route_UID}'>
          <span class = "badge bg-primary fw-bolder" style='font-size: 18px;'>數量：${total_Stops.length}</span>
              <h2 class = "fw-bolder text-info">
                ${result_BusInfo[0]['DepartureStopNameZh']} - ${result_BusInfo[0]['DestinationStopNameZh']} (往${to_Station})
              </h2>
          </div>
          `);
          
          for (let i = 0; i < total_Stops.length; i++) {
            $(`div#${bus_Route_UID}`).append(`
              <h2 id = "stop_Name">
                  <span class = "badge bg-success" data-stopName = "${total_Stops[i]}">
                  </span>
                  ${total_Stops[i]}
              </h2> 
            `);

            bus_update_Time(direct, total_Stops[i]);
          }
        },
        // 當Ajax請求失敗
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log(XMLHttpRequest);
          console.log(textStatus);
          console.log(errorThrown);
        }
      });

  });


});