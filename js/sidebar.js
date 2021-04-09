$(function () {

  // tra-sidebar-body
  let tra_html = `
   <div class='container-List'>
          <div class="TRA_Origination">
            <select id="TRA_Origination_Station_List" class="selectpicker" data-live-search="true">
              <option selected disabled value="null">請選擇起站</option>

            </select>

          </div>

          <div class="TRA_Destination">
            <select id="TRA_Destination_Station_List" class="selectpicker" data-live-search="true">
              <option selected disabled value="null">請選擇迄站</option>
            </select>
          </div>

          <!-- Button trigger modal -->
          <button type="button" id='go_Ticket_Search_TRA' class="btn btn-success">
            查詢票價
            <span class="spinner-border spinner-border-sm" id='spinner-TRA-Ticket' role="status" aria-hidden="true" hidden></span>
          <button type="button" id='go_Time_Search_TRA' class="btn btn-primary">
            查詢車班
            <span class="spinner-border spinner-border-sm" id='spinner-TRA-Time' role="status" aria-hidden="true" hidden></span>


        </div>

        <div class="alert alert-warning  fade show d-flex justify-content-center" role="alert">
          <div id='tra_result' lass="alert-body text-center">尚無查詢紀錄</div>
        </div>
  `;

  // mrt-sidebar-body
  let mrt_html =
    `<div class="container-List">
    <div class="City d-flex my-3">
      <label for="City_List" class="select_Label">縣市</label>
      <select class="form-select form-select-sm" id="City_List" aria-label="Default select example">
        <option selected value="KRTC">高雄捷運</option>
        <option value="KLRT">高雄輕軌</option>
        <option value="TRTC">台北捷運</option>
        <option value="TYMC">桃園捷運</option>
        <option value="TMRT">台中捷運</option>
      </select>
    </div>

    <div class="Origin_Station d-flex my-3">
      <label for="Origin_StationName_List " class='select_Label'>起站</label>
      <select class="form-select form-select-sm" id="Origin_StationName_List" aria-label="Default select example">

      </select>
    </div>

    <div class="Destination_Station d-flex my-3">
      <label for="Destination_StationName_List" class='select_Label'>迄站</label>
      <select class="form-select form-select-sm" id="Destination_StationName_List"
        aria-label="Default select example">

      </select>
    </div>

    <!-- Button trigger modal -->
    <button type="button" id='go_Search_MRT' class="btn btn-success" >
      查詢
        <span
      class="spinner-border spinner-border-sm"
      id='spinner-MRT'
      role="status"
      aria-hidden="true"
      hidden
    ></span>
    </button>



    <a class="routing_pic" href="#" data-bs-toggle="modal"  data-bs-target="#exampleModal">查看捷運路線圖</a>
  </div>


  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-white">
          <h5 class="modal-title" id="exampleModalLabel">查詢結果</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img class = "routing-img" >
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
        </div>
      </div>
    </div>
  </div>

  <div class = "alert alert-warning  fade show d-flex justify-content-center" role = "alert" >
      <div id='mrt_result' class = "alert-body text-center">尚無查詢紀錄</div>
    </div>
    `;

  let travel_html = '123';
  // let travel_html = `
  // <div class='container-travel'>
  //               <div class="city_container" id='Taipei'>
  //                 <img src="img/city/Taipei.jpg" alt="台北">
  //                 <div class="txt">
  //                   <h2>台北市</h2>
  //                 </div>
  //               </div>

  //               <div class="city_container" id='NewTaipei'>
  //                 <img src="img/city/NewTaipei.jpg" alt="新北">
  //                 <div class="txt">
  //                   <h2>新北市</h2>
  //                 </div>
  //               </div>
  //               <div class="city_container" id='Taoyuan'>
  //                 <img src="img/city/Taoyuan.jpg" alt="桃園">
  //                 <div class="txt">
  //                   <h2>桃園市</h2>
  //                 </div>
  //               </div>
  //               <div class="city_container" id='Taichung'>
  //                 <img src="img/city/Taichung.jpg" alt="台中">
  //                 <div class="txt">
  //                   <h2>台中市</h2>
  //                 </div>
  //               </div>
  //               <div class="city_container" id='Tainan'>
  //                 <img src="img/city/Tainan.jpg" alt="台南">
  //                 <div class="txt">
  //                   <h2>台南市</h2>
  //                 </div>
  //               </div>
  //               <div class="city_container" id='Kaohsiung'>
  //                 <img src="img/city/Kaohsiung.jpg" alt="高雄">
  //                 <div class="txt">
  //                   <h2>高雄市</h2>
  //                 </div>
  //               </div>
  //               <div class="city_container" id='Other'>
  //                 <img src="img/city/Other.jpg" alt="其他縣市">
  //                 <div class="txt">
  //                   <h2>其他縣市</h2>
  //                 </div>
  //               </div>
  // `;

  let bus_html = `
  <div class="Bus-City-info">

  <div class="card" data-city = 'Taipei'>
    <i class="card-icon fas fa-bus-alt"></i>
    <p>台北市</p>
  </div>

  <div class="card" data-city = 'NewTaipei'>
    <i class="card-icon fas fa-bus-alt"></i>
    <p>新北市</p>
  </div>
  <div class="card" data-city = 'Taoyuan'>
    <i class="card-icon fas fa-bus-alt"></i>
    <p>桃園市</p>
  </div>

  <div class="card" data-city = 'Taichung'>
    <i class="card-icon fas fa-bus-alt"></i>
    <p>台中市</p>
  </div>
  <div class="card" data-city = 'Tainan'>
    <i class="card-icon fas fa-bus-alt"></i>
    <p>台南市</p>
  </div>

  <div class="card" data-city = 'Kaohsiung'>
    <i class="card-icon fas fa-bus-alt"></i>
    <p>高雄市</p>
  </div>

  <div class="card other_City" data-city = 'Other'>
    <i class="card-icon fas fa-bus-alt"></i>
    <p>其他縣市</p>
  </div>

    <!-- 用個 div包裝，不然不能使用 transform來置中 -->
  <div class="bus-loading">
    <div class="spinner-border text-danger" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

</div>


<div class="singleCity" >
  <div class="busInfo">
    <h2 id="city_Name"></h2>
    <div class="bus_info_List">
      <div class="bus_Routes" city_name_EN = 'Taipei'>
        <span route_info = '紅'>紅線</span>
        <span route_info = '綠'>綠線</span>
        <span route_info = '棕'>棕線</span>
        <span route_info = '藍'>藍線</span>
        <span route_info = '其他'>其他</span>
      </div>
      <div class="bus_Routes" city_name_EN = 'NewTaipei'>
        <span route_info = '紅'>紅線</span>
        <span route_info = '綠'>綠線</span>
        <span route_info = '棕'>棕線</span>
        <span route_info = '橘'>橘線</span>
        <span route_info = '藍'>藍線</span>
        <span route_info = '其他'>其他</span>
      </div>
      <div class="bus_Routes" city_name_EN = 'Taoyuan'>
        <span route_info = '其他'>其他</span>
      </div>
      <div class="bus_Routes" city_name_EN = 'Taichung'>
        <span route_info = '其他'>其他</span>
      </div>
      <div class="bus_Routes" city_name_EN = 'Tainan'>
        <span route_info = '紅'>紅線</span>
        <span route_info = '黃'>黃線</span>
        <span route_info = '綠'>綠線</span>
        <span route_info = '棕'>棕線</span>
        <span route_info = '橘'>橘線</span>
        <span route_info = '藍'>藍線</span>
        <span route_info = '其他'>其他</span>
      </div>
      <div class="bus_Routes" city_name_EN = 'Kaohsiung'>
        <span route_info = '紅'>紅線</span>
        <span route_info = '黃'>黃線</span>
        <span route_info = '綠'>綠線</span>
        <span route_info = '橘'>橘線</span>
        <span route_info = 'JOY'>JOY</span>
        <span route_info = '幹線'>幹線</span>
        <span route_info = '快線'>快線</span>
        <span route_info = '其他'>其他</span>
      </div>
      <div class="bus_Routes" city_name_EN = 'Other'>
        <span route_info = 'Keelung'>基隆市</span>
        <span route_info = 'Hsinchu'>新竹市</span>
        <span route_info = 'HsinchuCounty'>新竹縣</span>
        <span route_info = 'MiaoliCounty'>苗栗縣</span>
        <span route_info = 'ChanghuaCounty'>彰化縣</span>
        <span route_info = 'NantouCounty'>南投縣</span>
        <span route_info = 'YunlinCounty'>雲林縣</span>
        <span route_info = 'ChiayiCounty'>嘉義縣</span>
        <span route_info = 'Chiayi'>嘉義市</span>
        <span route_info = 'PingtungCounty'>屏東縣</span>
        <span route_info = 'YilanCounty'>宜蘭縣</span>
        <span route_info = 'HualienCounty'>花蓮縣</span>
        <span route_info = 'TaitungCounty'>金門縣</span>
        <span route_info = 'KinmenCounty'>臺東縣</span>
        <span route_info = 'PenghuCounty'>澎湖縣</span>
        <span route_info = 'LienchiangCounty'>連江縣</span>
      </div>
    </div>
    <button type="button" class="btn btn-secondary go_Bus_Total">上一頁</button>


      <div class="accordion list-route-group" id="accordionExample">

        <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Accordion Item #1
          </button>
        </h2>

        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <strong>This is the first item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
        </div>

      </div>


    </div>
  </div>

  <div class="bus-loading">
    <div class="spinner-border text-danger" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

</div>
  `;

  let card_html = `
  <!-- body -->
  <div class = "alert alert-primary fade show d-flex justify-content-center" role = "alert" >
      <div id='mrt_result' class = "alert-body text-center">尚無功能，暫請等待</div>
      <!--<p><button onclick="addUser()">add user</button></b>--!>
      </div>`;

  let config_html = `
  <!-- body -->
  <div class = "alert alert-primary fade show d-flex justify-content-center" role = "alert" >
      <div id='mrt_result' class = "alert-body text-center">尚無功能，暫請等待</div>
      <!--<p><button onclick="addUser()">add user</button></b>--!>
      </div>`;

  // 【addUser函式】
  // 用來計算目前共新增了幾個使用者(暫時用不到)
  var userid = 0
  addUser = function () {
    sidebar.addPanel({
      id: 'user' + userid++,
      tab: '<i class="fa fa-user"></i>',
      title: 'User Profile ' + userid,
      pane: '<p>user ipsum dolor sit amet</p>',
    });
  }


  // 建立並加入到地圖中
  // create the sidebar instance and add it to the map
  var sidebar = L.control.sidebar({
      container: 'sidebar',
    })
    .addTo(map)
    .open('home'); // 起始 panel為 home

  // add panels dynamically to the sidebar
  sidebar
    .addPanel({
      id: 'travel',
      tab: '<i class="fas fa-suitcase-rolling"></i>',
      title: '旅遊',
      pane: travel_html,
    })

  // add panels dynamically to the sidebar
  sidebar
    .addPanel({
      id: 'bus',
      tab: '<i class="fas fa-bus-alt"></i>',
      title: '公車',
      pane: bus_html,
    })

    // add panels dynamically to the sidebar
    .addPanel({
      id: 'train',
      tab: '<i class="fas fa-subway"></i>',
      title: '火車',
      pane: tra_html,
    })

    // add panels dynamically to the sidebar
    .addPanel({
      id: 'mrt',
      tab: '<i class="fas fa-train"></i>',
      title: '捷運',
      pane: mrt_html,
    })

    // add panels dynamically to the sidebar
    .addPanel({
      id: 'user-card',
      tab: '<i class="fas fa-address-card"></i>',
      title: '使用者註冊',
      pane: card_html,
      position: 'bottom'
    })
    // add panels dynamically to the sidebar
    .addPanel({
      id: 'user-config',
      tab: '<i class="fas fa-cog"></i>',
      title: '設定',
      pane: config_html,
      position: 'bottom'
    })
  03


  let get_CurrentBus_Pos = function (city, route) {
    $.ajax({
      url: 'https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeNearStop/City/' + city + '/' + route + '?$format=JSON',
      dataType: 'json',
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
      // url: 'https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeByFrequency/City/' + city + '/' + route + '?$format=JSON',
      url: 'https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/' + city + '/' + route + '?$format=JSON',
      dataType: 'json',
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
        //   $(`div#r_${route_id}`).append(`<div id='${bus_SubRoute_UID}'></div>`);

        //   $(`div#${bus_SubRoute_UID}`).append('<h2>' + result[value]['Stops'][0]['StopName']['Zh_tw'] + ' → ' + result[value]['Stops'][bus_Route_len - 1]['StopName']['Zh_tw'] + '</h2>');
        //   $(`div#${bus_SubRoute_UID}`).append('<h2>往' + result[value]['Stops'][bus_Route_len - 1]['StopName']['Zh_tw'] + '</h2><hr>');

        //   for (let i = 0; i < bus_Route_len; i++) {
        //     let Stop_Name = result[value]['Stops'][i]['StopName']['Zh_tw'];
        //     $(`div#${bus_SubRoute_UID}`).append('<h3 class="stop_Name">' + Stop_Name + '</h3>');
        //     count++;
        //   }
        //   $(`div#${bus_SubRoute_UID}`).append(`<h2>Count = ${count}</h2>`);
        //   $(`div#${bus_SubRoute_UID}`).append('<hr>');
        // });


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
      // url: 'https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeByFrequency/City/Tainan?$format=JSON',
      dataType: 'json',
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


  let results_Travel;
  // 旅遊
  $('.city_container').on('click', function () {
    // 換個縣市，就清空
    let travel_Category = []
    $('.category-List').html('');
    $('.category-Items').html('');

    let city_name = $(this).attr('id');
    $('div.bus-loading').show();

    // 設立一個 Loading動畫的時間 : 1.5s
    setTimeout(function () {
      // console.log(Route_Select);
      // 當開始跑Loading時，不能再有任何動作
      $('div.bus-loading').hide();
      $('.container-travel').hide();
      $('div.travel_Category').show();
    }, 1500);

    $.ajax({
      url: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/' + city_name + '?$format=JSON',
      dataType: 'json',
      headers: GetAuthorizationHeader(), // 憑證 API token
      success: function (result) {
        // console.log(result);
        results_Travel = $.parseJSON(JSON.stringify(result));
        Object.keys(result).forEach(function (value, key) {
          // 分類中除了 Class1之外，還有 Class2、Class3。
          if (result[value]['Class1'] || result[value]['Class2'] || result[value]['Class3']) {
            if (travel_Category.includes(result[value]['Class1']) === false && result[value]['Class1']) {
              travel_Category.push(result[value]['Class1']);
            }
            if (travel_Category.includes(result[value]['Class2']) === false && result[value]['Class2']) {
              travel_Category.push(result[value]['Class2']);
            }
            if (travel_Category.includes(result[value]['Class3']) === false && result[value]['Class3']) {
              travel_Category.push(result[value]['Class3']);
            }
          }

          $('.category-Items').append(`
          <div class="travel-item" travel-id="${result[value]['ID']}">
            <h2 class="view_Name">${result[value]['Name']}
                <span class = "badge bg-primary">${result[value]['Class1']}</span>
            </h2>
            <h3 class="view_address">${result[value]['Address']}
              <i class="fas fa-location-arrow" id="go_View_Pos" title="前往該座標位置" pos-Lat="${result[value]["Position"]["PositionLat"]}" pos-Lng="${result[value]["Position"]["PositionLon"]}" view="${result[value]['Name']}"></i>
            </h3>
            </div>`);
        });
        // console.log(travel_Category);
        for (let i = 0; i < travel_Category.length; i++) {
          $('.category-List').append(`<span class="badge bg-primary category_item" data-category="${travel_Category[i]}" >${travel_Category[i]}</span>`);
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

  $('.category').on('click', 'i#go_View_Pos', function () {
    let Lat = $(this).attr('pos-Lat');
    let Lng = $(this).attr('pos-Lng');
    let position = [Lat, Lng];
    let fly_Marker_Content = `
      <h2>${$(this).attr("view")}</h2>
      <p>${$(this).parent().text()}</p>
    `;
    console.log(position);
    fly_To_Marker(Lat, Lng, fly_Marker_Content);
  });



  $('button.go_city_Container').on('click', function () {
    $('div.bus-loading').show();
    // 設立一個 Loading動畫的時間 : 1.5s
    setTimeout(function () {
      // 當開始跑Loading時，不能再有任何動作
      $('div.bus-loading').hide();
      $('div.travel_Category').hide();
      $('.container-travel').show();
    }, 1500);
  });


  let choose_Items = [];
  $('.category-List').on('click', 'span.category_item', function () {
    choose_Items = [];
    $('.category-Items').html('');
    console.log($(this).attr("data-category"));
    if ($(this).hasClass('bg-primary')) {
      $(this).removeClass('bg-primary');
      $(this).addClass('bg-secondary');
    } else {
      $(this).removeClass('bg-secondary');
      $(this).addClass('bg-primary');
    }

    for (let i = 0; i < $('.category-List').children().length; i++) {
      if ($('.category-List').children().eq(i).hasClass('bg-primary')) {
        choose_Items.push($('.category-List').children().eq(i).text());
      }
    }
    if (choose_Items.length > 0) {
      if ($('input.search-value').val()) {
        Object.keys(results_Travel).forEach(function (value, key) {
          if (choose_Items.includes(results_Travel[value]['Class1']) && (results_Travel[value]['Name'].includes($('input.search-value').val()) || results_Travel[value]['Address'].includes($('input.search-value').val()))) {
            $('.category-Items').append(`
            <div class="travel-item" travel-id="${results_Travel[value]['ID']}">
              <h2 class="view_Name">${results_Travel[value]['Name']}
                  <span class = "badge bg-primary">${results_Travel[value]['Class1']}</span>
              </h2>
              <h3 class="view_address">${results_Travel[value]['Address']}
                <i class="fas fa-location-arrow" id="go_View_Pos" title="前往該座標位置" pos-Lat="${results_Travel[value]["Position"]["PositionLat"]}" pos-Lng="${results_Travel[value]["Position"]["PositionLon"]}" view="${results_Travel[value]['Name']}"></i>
              </h3>
              </div>`);
          }
        })
      } else {
        Object.keys(results_Travel).forEach(function (value, key) {
          if (choose_Items.includes(results_Travel[value]['Class1'])) {
            $('.category-Items').append(`
            <div class="travel-item" travel-id="${results_Travel[value]['ID']}">
              <h2 class="view_Name">${results_Travel[value]['Name']}
                  <span class = "badge bg-primary">${results_Travel[value]['Class1']}</span>
              </h2>
              <h3 class="view_address">${results_Travel[value]['Address']}
                <i class="fas fa-location-arrow" id="go_View_Pos" title="前往該座標位置" pos-Lat="${results_Travel[value]["Position"]["PositionLat"]}" pos-Lng="${results_Travel[value]["Position"]["PositionLon"]}" view="${results_Travel[value]['Name']}"></i>
              </h3>
              </div>`);
          }
        })
      }

    } else {
      $('.category-Items').append(`
          <div class="travel-item">
            <h2 class="view_Name text-center">
                無查詢到資料
            </h2>
            </div>`);
    }
  });

  $('input.search-value').on('input', function () {
    let input_Val = $(this).val();
    if (input_Val) {
      $('.category-Items').html('');
      Object.keys(results_Travel).forEach(function (value, key) {
        if (choose_Items.includes(results_Travel[value]['Class1']) && (results_Travel[value]['Name'].includes($('input.search-value').val()) || results_Travel[value]['Address'].includes($('input.search-value').val()))) {
          $('.category-Items').append(`
          <div class="travel-item" travel-id="${results_Travel[value]['ID']}">
            <h2 class="view_Name">${results_Travel[value]['Name']}
                <span class = "badge bg-primary">${results_Travel[value]['Class1']}</span>
            </h2>
            <h3 class="view_address">${results_Travel[value]['Address']}
              <i class="fas fa-location-arrow" id="go_View_Pos" title="前往該座標位置" pos-Lat="${results_Travel[value]["Position"]["PositionLat"]}" pos-Lng="${results_Travel[value]["Position"]["PositionLon"]}" view="${results_Travel[value]['Name']}"></i>
            </h3>
            </div>`);
        }
      })
    } else {
      Object.keys(results_Travel).forEach(function (value, key) {
        $('.category-Items').append(`
            <div class="travel-item" travel-id="${results_Travel[value]['ID']}">
              <h2 class="view_Name">${results_Travel[value]['Name']}
                  <span class = "badge bg-primary">${results_Travel[value]['Class1']}</span>
              </h2>
              <h3 class="view_address">${results_Travel[value]['Address']}
                <i class="fas fa-location-arrow" id="go_View_Pos" title="前往該座標位置" pos-Lat="${results_Travel[value]["Position"]["PositionLat"]}" pos-Lng="${results_Travel[value]["Position"]["PositionLon"]}" view="${results_Travel[value]['Name']}"></i>
              </h3>
              </div>`);
      })
    }
  });


});