$(function () {

  // 得到目前公車的位置
  let get_CurrentBus_Pos = function (city, route) {
    $.ajax({
      url: 'https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeNearStop/City/' + city + '/' + route + '?$format=JSON',
      dataType: 'json',
      contentType: 'json',
      headers: GetAuthorizationHeader(), // 憑證 API token
      success: function (result) {
        Object.keys(result).forEach(function (value, key) {
          console.log(result[value]['StopName']['Zh_tw']);
          console.log(result[value]['SubRouteUID']);
          $(`div#${result[value]['SubRouteUID']}`).css('background-color', 'yellow');
          for (let i = 0; i < $(`div#${result[value]['SubRouteUID']}`).children().length; i++) {
            // 每個都黑色
            $(`div#${result[value]['SubRouteUID']}`).children().eq(i).css('color', '#000');
            if ($(`div#${result[value]['SubRouteUID']}`).children().eq(i).text() === result[value]['StopName']['Zh_tw']) {
              $(`div#${result[value]['SubRouteUID']}`).children().eq(i).css('color', 'red');
              // $(`div#${result[value]['SubRouteUID']}`).children().eq(i).append(`<span class="badge bg-success">目前位置</span>`);
            }
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
  }



  // 找尋單一路線的資訊 (不設 let，因為這樣 HTML才讀得到這個函式(onclick))
  click_bus_info = function (city, route, route_id) {
    console.log('down-------');

    get_CurrentBus_Pos(city, route);

    // 要用 window不然不會終止
    clearInterval(window.update_stopInfo);
    clearInterval(window.countDown);

    // 放置倒數
    $(`div#r_${route_id}`).html('');
    $(`div#r_${route_id}`).append(`<span class="timer badge rounded-pill bg-secondary" count-timer='${route_id}'><span>`);
    let update_Time = 15; // 更新時間 15秒

    function updateCountdown() {
      if (update_Time <= 0) {
        update_Time = 15;
      }
      update_Time--;
      console.log(update_Time);
      $(`span[count-timer="${route_id}"]`).html('下次更新時間: ' + update_Time);
    }


    // 透過按鈕的 class 是否有 collapsed(true: 隱藏； false: 顯示)
    let is_show = $(`button[data-route="${route_id}"]`).hasClass('collapsed');

    // 自動更新公車目前位置的資料

    if (!is_show) {
      window.countDown = setInterval(updateCountdown, 1000);
      window.update_stopInfo = setInterval(function () {
        get_CurrentBus_Pos(city, route);
      }, 15000);
    }

    /* ==公車路線== */
    $.ajax({
      url: 'https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/' + city + '/' + route + '?$format=JSON',
      dataType: 'json',
      contentType: 'json',
      headers: GetAuthorizationHeader(), // 憑證 API token
      success: function (result) {
        Object.keys(result).forEach(function (value, key) {
          let bus_Route_len = result[value]['Stops'].length;
          let bus_SubRoute_UID = result[value]['SubRouteUID'];
          let count = 0;
          let number = 1;
          let uid = bus_SubRoute_UID;
          for (let i = 0; i < $(`div#r_${bus_SubRoute_UID}`).children().length; i++) {
            console.log(i);
            if ($(`div#r_${bus_SubRoute_UID}`).children().eq(i).attr('id') == bus_SubRoute_UID) {
              uid = bus_SubRoute_UID + '_' + number;
              number += 1;
            }
          }

          $(`div#r_${route_id}`).append(`<div id='${uid}'></div>`);
          $(`div#${uid}`).append('<h2>' + result[value]['Stops'][0]['StopName']['Zh_tw'] + ' → ' + result[value]['Stops'][bus_Route_len - 1]['StopName']['Zh_tw'] + '</h2>');
          $(`div#${uid}`).append('<h2>往' + result[value]['Stops'][bus_Route_len - 1]['StopName']['Zh_tw'] + '</h2><hr>');

          for (let i = 0; i < bus_Route_len; i++) {
            let Stop_Name = result[value]['Stops'][i]['StopName']['Zh_tw'];
            $(`div#${uid}`).append('<h3 class="stop_Name">' + Stop_Name + '</h3>');
            count++;
          }
          $(`div#${uid}`).append(`<h2>Count = ${count}</h2>`);
          $(`div#${uid}`).append('<hr>');
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

  // 紀錄該城市的路線
  let route = [];
  let route_id = [];
  let master_City = ['Taipei', 'NewTaipei', 'Taoyuan', 'Taichung', 'Tainan', 'Kaohsiung'];
  let get_bus_info = function (city) {
    route = [];
    route_id = [];
    // UI擷取所有縣市公車的路線總資訊
    $.ajax({
      url: 'https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeByFrequency/City/' + city + '?$format=JSON',
      dataType: 'json',
      contentType: 'json',
      headers: GetAuthorizationHeader(), // 憑證 API token
      success: function (result) {
        // console.log(result);
        Object.keys(result).forEach(function (value, key) {
          let bus_Route = result[value]['RouteName']['Zh_tw'];
          let bus_Route_id = result[value]['RouteUID'];
          if (route.includes(bus_Route) === false) {
            route.push(bus_Route);
            route_id.push(bus_Route_id);
          }
        });


        if (!master_City.includes(city)) {
          let count = 0
          $('div.list-route-group').html('');
          for (let i = 0; i < route.length; i++) {
            count += 1;
            // console.log(route[i]);
            $('.list-route-group').append(`
              <div class="accordion-item" >
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c_${i}" aria-expanded="true" aria-controls="c_${i}" data-route="${route_id[i]}" onclick=click_bus_info('${city}','${route[i]}','${route_id[i]}')>
                  ${route[i]}
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
    $('.bus_Routes_active *').css('background-color', '#fff');
  });



  // 六都路線篩選
  $('.bus_Routes:not([city_name_EN="Other"]) span').on('click', function () {
    let count = 0
    // 每次更換路線時，都要先清空一下上一次的內容、顏色
    $('div.list-route-group').html('');
    $('.bus_Routes_active *').css('background-color', '#fff');
    // 而此次點選的則給他不同的顏色來去區分點擊了哪一個
    $(this).css('background-color', '#686de0');



    // 透過點選路線後，提供該路線的所有公車動線(運用到 Boostrap的 accordion)
    for (let i = 0; i < route.length; i++) {
      // 捕捉到跟 span中的 route_info相同則匯入進去
      if (route[i].includes($(this).attr('route_info'))) {
        count += 1;

        $('.list-route-group').append(`
        <div class="accordion-item" >
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c_${i}" aria-expanded="true" aria-controls="c_${i}" data-route="${route_id[i]}" onclick=click_bus_info('${$(this).parent().attr('city_name_EN')}','${route[i]}','${route_id[i]}')>
            ${route[i]}
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
            count += 1;
            $('.list-route-group').append(`
              <div class="accordion-item" >
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c_${i}" aria-expanded="true" aria-controls="c_${i}" data-route="${route_id[i]}" onclick=click_bus_info('${$(this).parent().attr('city_name_EN')}','${route[i]}','${route_id[i]}')>
                  ${route[i]}
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

    $('.list-route-group').append(`<h2>Count= ${count}</h2>`);





  });

  // 其他縣市部分，因為有些 BUG，所以跟上面六都的寫法不同，將呈現寫在函式中
  $(".bus_Routes[city_name_EN='Other'] span").on('click', function () {
    $('.bus_Routes_active *').css('background-color', '#fff');
    $(this).css('background-color', '#686de0');
    get_bus_info($(this).attr('route_info'));
  });

});