$(function () {

  // 得到目前公車的位置
  let get_CurrentBus_Pos = function (city, route, direct) {
    $('h2#stop_Name span#current_bus').html('');

    $.ajax({
      url: `https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeNearStop/City/${city}/${route}?$select=PlateNumb,StopName&$filter=RouteName%2FZh_tw%20eq%20'${route}'%20AND%20Direction%20eq%20${direct}&$format=JSON`,
      dataType: 'json',
      contentType: 'json',
      headers: GetAuthorizationHeader(), // 憑證 API token
      success: function (result) {
        Object.keys(result).forEach(function (value, key) {
          let stopName = result[value]['StopName']['Zh_tw'];
          $(`h2[data-stopname = "${stopName}"]`).append(
            `<span class = 'badge bg-danger' id ='current_bus'>${result[value]['PlateNumb']}</span>`
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
  }


  bus_update_Time =  function(city_name, route_name, route_UID, direct){
    let select = `Direction,PlateNumb,NextBusTime,EstimateTime,StopName`;
    // Tainan的 SubRouteUID的最後一個字為 1 代表Direct 0；2則代表 Direct 1； OR StopStatus 大於等於 2(因為當該站點不停靠、末班已駛的話就不會有 SubRouteUID)
    let Tainan_Swith = direct == 0 ? '1': '2';
    let filter =  city_name == 'Tainan'? `RouteName/Zh_tw eq '${route_name}' AND (endswith(SubRouteUID,'${Tainan_Swith}') OR StopStatus ge 2)` : `RouteUID eq '${route_UID}' AND Direction eq ${direct}`;
    $.ajax({
      url: `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${city_name}/${route_name}?$select=${select}&$filter=${filter}&$format=JSON`,
        dataType: 'json',
        contentType: 'json',
        headers: GetAuthorizationHeader(), // 憑證 API token
        success: function (result) {
          // console.log(result);
          let estimateTime_Status;

          Object.keys(result).forEach(function (value, key) {
            let stopName = result[value]['StopName']['Zh_tw'];
            if( total_Stops.includes(stopName) ){

              // 當StopStatus値為0時，EstimateTime有値。
            if(result[value]['EstimateTime'] != null){
                let estimateTime = result[value]['EstimateTime'];
                // 放置有符合 StopName的 index值
                var indices = [];
                var idx = total_Stops.indexOf(stopName);
                // 當有找到則進入迴圈，沒找到則無
                while (idx != -1) {
                  // 如果有找到，就將其 index加入到其中
                  indices.push(idx);
                  idx = total_Stops.indexOf(stopName, idx + 1);
                }
                // 只抓取預估時間較短的
                if(indices.length > 1){
                  for(let i = 1 ; i < indices.length; i++){
                        if(result[i]['EstimateTime'] < estimateTime ){
                          estimateTime = result[i]['EstimateTime'];
                        }
                      }
                }

                  if(parseInt(estimateTime / 60) == 0){
                    estimateTime_Status = "進站中";
                    $(`span[data-stopName = "${stopName}"]`).removeClass("bg-secondary");
                    $(`span[data-stopName = "${stopName}"]`).removeClass("bg-success");
                    $(`span[data-stopName = "${stopName}"]`).addClass("bg-danger");
                  }else if(parseInt(estimateTime / 60) <= 3){
                    estimateTime_Status = "即將進站";
                    $(`span[data-stopName = "${stopName}"]`).removeClass("bg-secondary");
                    $(`span[data-stopName = "${stopName}"]`).removeClass("bg-success");
                    $(`span[data-stopName = "${stopName}"]`).addClass("bg-warning");
                  }else{
                    estimateTime_Status = parseInt(estimateTime / 60) + "分";
                  }
                }

                else if(result[value]['StopStatus'] == 1){
                  estimateTime_Status = result[value]['NextBusTime'] ? result[value]['NextBusTime'].substr(result[value]['NextBusTime'].indexOf("T") + 1, 5 ) : "尚未發車";
                    $(`span[data-stopName = "${stopName}"]`).removeClass("bg-success");
                    $(`span[data-stopName = "${stopName}"]`).removeClass("bg-secondary");
                    $(`span[data-stopName = "${stopName}"]`).addClass("bg-secondary ");
                }
                else if(result[value]['StopStatus'] == 2){
                  estimateTime_Status = "此站不停靠";
                  $(`span[data-stopName = "${stopName}"]`).removeClass("bg-success");
                  $(`span[data-stopName = "${stopName}"]`).removeClass("bg-secondary");
                  $(`span[data-stopName = "${stopName}"]`).addClass("bg-secondary ");
              }
                else if(result[value]['StopStatus'] == 4){
                  estimateTime_Status = "今日停駛";
                  $(`span[data-stopName = "${stopName}"]`).removeClass("bg-secondary");
                  $(`span[data-stopName = "${stopName}"]`).removeClass("bg-success");
                  $(`span[data-stopName = "${stopName}"]`).addClass("bg-secondary ");
              }
              else{
                // estimateTime_Status = result[value]['NextBusTime'] ? result[value]['NextBusTime'].substr(result[value]['NextBusTime'].indexOf("T") + 1, 5 ) : "末班已駛";
                estimateTime_Status =  "末班已駛";
                $(`span[data-stopName = "${stopName}"]`).removeClass("bg-secondary");
                  $(`span[data-stopName = "${stopName}"]`).removeClass("bg-success");
                  $(`span[data-stopName = "${stopName}"]`).addClass("bg-secondary ");
              }
              $(`span[data-stopName = "${stopName}"]`).html(`${estimateTime_Status}`);
            }
          });      

      },
        // 當Ajax請求失敗
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log(XMLHttpRequest);
          console.log(textStatus);
          console.log(errorThrown);
        }
      });
  };


  let result_BusInfo;
  bus_Route_info = function(city_name, route_name, route_UID){
    result_BusInfo = [];
    $.ajax({
      url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city_name}/${route_name}?$select=RouteUID,DepartureStopNameZh%2C%20DestinationStopNameZh&$filter=RouteUID%20eq%20'${route_UID}'&$format=JSON`,
        dataType: 'json',
        contentType: 'json',
        headers: GetAuthorizationHeader(), // 憑證 API token
        success: function (result) {
          result_BusInfo = $.parseJSON(JSON.stringify(result));
        },
        // 當Ajax請求失敗
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log(XMLHttpRequest);
          console.log(textStatus);
          console.log(errorThrown);
        }
      });
  }


  let total_Stops = [];
  let total_Stops_id = [];
  
  // 找尋單一路線的資訊 (不設 let，因為這樣 HTML才讀得到這個函式(onclick))
    click_bus_info = function (city, route, route_id, direct) {
    bus_Route_info(city, route, route_id);

    window.estimate_Bus = setTimeout(function(){
    console.log('down-------');


    // 要用 window不然不會終止
    clearInterval(window.update_stopInfo);
    clearInterval(window.countDown);

    // 放置倒數
    $(`div#r_${route_id}`).html('');
    $(`div#r_${route_id}`).append(`<span class="timer badge rounded-pill bg-secondary" count-timer='${route_id}'><span>`);
    let update_Time = 25; // 更新時間 15秒

    // 倒數自動更新
    function updateCountdown() {
      if (update_Time <= 0) {
        update_Time = 25;
      }
      update_Time--;
      $(`span[count-timer="${route_id}"]`).html('下次更新時間: ' + update_Time);
    }

    // 透過按鈕的 class 是否有 collapsed(true: 隱藏； false: 顯示)
    let is_show = $(`button[data-route="${route_id}"]`).hasClass('collapsed');

    // 如果為 false，則進行。
    // ========IF Start========
    if (!is_show) {

      // 自動讀秒，延遲 1s
      window.countDown = setInterval(updateCountdown, 1000);

      // 自動刷新車次時間，延遲 25s
      window.update_stopInfo = setInterval(function () {
        click_bus_info(city, route, route_id, direct);
        get_CurrentBus_Pos(city, route, direct);
      }, 25000);

      // direct預設為 0 
      let to_Station = direct == 0 ? result_BusInfo[0]['DestinationStopNameZh'] : result_BusInfo[0]['DepartureStopNameZh'];
       /* ==公車路線== */
       $.ajax({
        url: "https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/" + city + "/" + route + "?$select=RouteUID%2C%20RouteName%2C%20Direction%2C%20Stops%2C%20SubRouteUID&$filter=RouteName%2FZh_tw%20eq%20'" + route + "'%20and%20Direction%20eq%20" + direct + "&$format=JSON",
        dataType: 'json',
        contentType: 'json',
        headers: GetAuthorizationHeader(), // 憑證 API token
        success: function (result) {
          console.log(result);  
          // 如果有捕捉到站點，則進行；反之則無
          if(Object.keys(result).length > 0 ){
            total_Stops = [];
            total_Stops_id = [];
            let bus_Route_UID ;
            let maxLength = 0;
            let max_index = 0;
            Object.keys(result).forEach(function (value, key) {
              // 抓取該路線站點的數量，我們要抓最多站點的路線
              bus_Route_UID = result[value]['RouteUID'];
              let bus_Route_len = result[value]['Stops'].length;
              
              if(maxLength < bus_Route_len){
                maxLength = bus_Route_len;
                max_index = value;
              }     
            });

            for (let i = 0; i < maxLength; i++) {
                let stopName =  result[max_index]['Stops'][i]['StopName']['Zh_tw'];
                let stopName_id =  result[max_index]['Stops'][i]['StopID'];
                if(!total_Stops.includes(stopName)){
                  // 從第 i中插入一個新的站名
                  total_Stops.splice(i, 0, stopName);
                  total_Stops_id.splice(i, 0, stopName_id);
                }
              }
  
  
            $(`div#r_${route_id}`).append(`
            <div id='${bus_Route_UID}'>
            <button id="bus_update" data-direct = '0' class="btn ${direct == 0 ? "btn-primary": "btn-secondary"} m-1 fw-bolder"></button>
            <button id="bus_update" data-direct = '1' class="btn ${direct == 1 ? "btn-primary": "btn-secondary"} m-1 fw-bolder"></button>
            </div>
            `);
    
            $(`button[data-direct = '0']`).html('往' + result_BusInfo[0]['DestinationStopNameZh']);
            $(`button[data-direct = '1']`).html('往' + result_BusInfo[0]['DepartureStopNameZh']);
            
            for (let i = 0; i < total_Stops.length; i++) {
              $(`div#${bus_Route_UID}`).append(`
                <h2 id = "stop_Name" data-stopName = "${total_Stops[i]}" data-stopID="${total_Stops_id[i]}">
                    <span class = "badge bg-success" data-stopName = "${total_Stops[i]}">
                    </span>
                    ${total_Stops[i]}
                </h2> 
              `);
              // too many requests
              // bus_update_Time(city, route, route_id, direct, total_Stops[i]);
            }
            bus_update_Time(city, route, route_id, direct);
  
  
            setTimeout(function(){
              get_CurrentBus_Pos(city, route, direct);
            }, 1500);
  

            // 當 PTX中並未提供任何資料時才執行。
          }else{
            $(`div#r_${route_id}`).append(`
            <!-- body -->
            <div class = "alert alert-warning fade show d-flex justify-content-center" role = "alert" >
                <div id='home_result' class = "alert-body text-center">目前並未提供該路線的查詢</div>
                <!--<p><button onclick="addUser()">add user</button></b>--!>
            </div>
            `);
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
    // ========IF End========

  }, 1000);

  $(`div#r_${route_id}`).on('click', 'button#bus_update',function(){
      let this_direct = $(this).attr('data-direct');
      // 必須清除，不然會重複進行
      clearTimeout(window.estimate_Bus);
      click_bus_info(city, route, route_id, this_direct);

  });

  };

  

  // 紀錄該城市的路線
  let route = [];
  let route_id = [];
  let route_start = [];
  let route_last = [];
  let master_City = ['Taipei', 'NewTaipei', 'Taoyuan', 'Taichung', 'Tainan', 'Kaohsiung'];
  let get_bus_info = function (city) {
    route = [];
    route_id = [];
    route_start = [];
    route_last = [];
    // UI擷取所有縣市公車的路線總資訊
    $.ajax({
      url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city}?$$select=RouteUID%2CRouteName%2CDepartureStopNameZh%20%2CDestinationStopNameZh%20&$orderby=RouteName%2FZh_tw%20asc&$format=JSON`,
      dataType: 'json',
      contentType: 'json',
      headers: GetAuthorizationHeader(), // 憑證 API token
      success: function (result) {
        Object.keys(result).forEach(function (value, key) {
          let bus_Route = result[value]['RouteName']['Zh_tw'];
          let bus_Route_id = result[value]['RouteUID'];
          let bus_Route_start = result[value]['DepartureStopNameZh'];
          let bus_Route_last = result[value]['DestinationStopNameZh'];
          if (route.includes(bus_Route) === false) {
            route.push(bus_Route);
            route_id.push(bus_Route_id);
            route_start.push(bus_Route_start);
            route_last.push(bus_Route_last);
          }
        });

        // 如果不是六都的話，就寫在裡面。
        if (!master_City.includes(city)) {
          let count = 0
          $('div.list-route-group').html('');
          for (let i = 0; i < route.length; i++) {
            count += 1;
            // console.log(route[i]);
            $('.list-route-group').append(`
              <div class="accordion-item" >
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c_${i}" aria-expanded="true" aria-controls="c_${i}" data-route="${route_id[i]}" onclick=click_bus_info('${city}','${route[i]}','${route_id[i]}',0)>
                  ${route[i]} (${route_start[i]} - ${route_last[i]})
                  </button>
                </h2>

                <div id="c_${i}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body" id='r_${route_id[i]}'>
                  </div>
                </div>
              </div>
              `);
          }
          $('.list-route-group').append(`<h2>Count= ${count}</h2>`);
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


  // 各縣市公車路線的紀錄 (當按上一頁則又歸零)
  let Route_Select = [];

  // 其他縣市部分，額外去寫
  $('div.card').on('click', function () {
    // 得到典籍的縣市
    let data_city = $(this).attr('data-city');
    // 得到 p的城市名稱
    let city_Name = $(this).children('p').text();
    // 開啟 Loading動畫 (並加上遮罩效果)
    $('div.bus-loading').show();
    $("div.card").prop("disabled", "disabled");
    $(".Bus-City-info *:not(.bus-loading):not(.bus-loading *)").addClass('bus-loading-mask');
    $(this).removeClass('bus-loading-mask');

    // 設立一個 Loading動畫的時間 : 1.5s
    setTimeout(function () {
      // 判斷點選縣市選項是否為 Other，如果為 Other則不執行這個判斷式
      if (data_city !== 'Other') {
        get_bus_info(data_city); // 執行函式，取得單一縣市的公車資訊
      }
      // 1.5秒後隱藏 Total_City_Bus
      $('div.Bus-City-info').hide(); // 隱藏選擇縣市的畫面
      $('h2#city_Name').text(city_Name); // 顯示縣市名稱

      // 點擊某個縣市選項時，除了那個選項的顏色不會變，其他都會改變 (UI 並不重要)
      $('div.bus_Routes').removeClass('bus_Routes_active');
      $(`div[city_name_EN = '${data_city}']`).addClass('bus_Routes_active');

      // 開啟各個縣市之間的公車資訊內容
      $('.list-route-group').html('');
      // 去取得選取縣市的路線資訊
      for (let i = 0; i < $('.bus_Routes_active').children().length; i++) {
        Route_Select.push($('.bus_Routes_active').children().eq(i).attr('route_info')); // <span>
      }
      // console.log(Route_Select);
      // 當開始跑Loading時，不能再有任何動作
      $(".Bus-City-info *").removeClass('bus-loading-mask');
      $("div.card").prop("disabled", "false");
      $('div.bus-loading').hide();
      $('div.singleCity').show();
    }, 1500);
  });


  // 回上一頁(將路線動線畫面 轉換成 選擇縣市畫面)
  $('button.go_Bus_Total').on('click', function () {
    $('div.singleCity').hide(0);
    $('div.Bus-City-info').show(0);
    Route_Select = [];
    $('.list-route-group').html('');
    $('.bus_Routes_active *').css('background-color', '#fff');
  });



  // 六都路線篩選
  $('.bus_Routes:not([city_name_EN="Other"]) span').on('click', function () {
    // 每次更換路線時，都要先清空一下上一次的內容、顏色
    $('div.list-route-group').html('');
    $('.bus_Routes_active *').css('background-color', '#fff');
    // 而此次點選的則給他不同的顏色來去區分點擊了哪一個
    $(this).css('background-color', '#686de0');
    // 透過點選路線後，提供該路線的所有公車動線(運用到 Boostrap的 accordion)
    for (let i = 0; i < route.length; i++) {
      // 捕捉到跟 span中的 route_info相同則匯入進去
      let route_filter = $(this).attr('getroute-first') ? route[i].includes($(this).attr('route_info')): route[i].substr(0, 1) == $(this).attr('route_info');
        if(route_filter){
        
        $('.list-route-group').append(`
        <div class="accordion-item" >
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c_${i}" aria-expanded="true" aria-controls="c_${i}" data-route="${route_id[i]}" onclick=click_bus_info('${$(this).parent().attr('city_name_EN')}','${route[i]}','${route_id[i]}',0)>
            ${route[i]} (${route_start[i]} - ${route_last[i]})
            </button>
          </h2>

          <div id="c_${i}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body"  id='r_${route_id[i]}'>
            </div>
          </div>
          </div>
        `);
      }
      // 沒捕捉到跟 span中的 route_info相同的
      else {
        // 如果點選的選項為其他(為 Span的最後一個[last-child])
        if ($(this).text() == $('.bus_Routes_active span:last-child').text()) {
          let is_Other = true;
          for (let j = 0; j < Route_Select.length; j++) {
            if (route[i].includes(Route_Select[j])) {
              is_Other = false;
            }
          }
          if (is_Other) {
            $('.list-route-group').append(`
              <div class="accordion-item" >
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c_${i}" aria-expanded="true" aria-controls="c_${i}" data-route="${route_id[i]}" onclick=click_bus_info('${$(this).parent().attr('city_name_EN')}','${route[i]}','${route_id[i]}',0)>
                  ${route[i]} (${route_start[i]} - ${route_last[i]})
                  </button>
                </h2>

                <div id="c_${i}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body"  id='r_${route_id[i]}'>
                  </div>
                </div>
                </div>
              `);
          }
        }
      }
    }
  });



  // 其他縣市部分，因為有些 BUG，所以跟上面六都的寫法不同，將呈現寫在函式(get_bus_info)中
  $(".bus_Routes[city_name_EN='Other'] span").on('click', function () {
    $('.bus_Routes_active *').css('background-color', '#fff');
    $(this).css('background-color', '#686de0');
    get_bus_info($(this).attr('route_info'));
  });

});