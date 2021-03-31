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

  let travel_html = `
  <div class='container-bus'>
                <div class="city_container" id='Taipei'>
                  <img src="img/city/Taipei.jpg" alt="台北">
                  <div class="txt">
                    <h2>台北市</h2>
                  </div>
                </div>

                <div class="city_container" id='NewTaipei'>
                  <img src="img/city/NewTaipei.jpg" alt="新北">
                  <div class="txt">
                    <h2>新北市</h2>
                  </div>
                </div>
                <div class="city_container" id='Taoyuan'>
                  <img src="img/city/Taoyuan.jpg" alt="桃園">
                  <div class="txt">
                    <h2>桃園市</h2>
                  </div>
                </div>
                <div class="city_container" id='Taichung'>
                  <img src="img/city/Taichung.jpg" alt="台中">
                  <div class="txt">
                    <h2>台中市</h2>
                  </div>
                </div>
                <div class="city_container" id='Tainan'>
                  <img src="img/city/Tainan.jpg" alt="台南">
                  <div class="txt">
                    <h2>台南市</h2>
                  </div>
                </div>
                <div class="city_container" id='Kaohsiung'>
                  <img src="img/city/Kaohsiung.jpg" alt="高雄">
                  <div class="txt">
                    <h2>高雄市</h2>
                  </div>
                </div>
                <div class="city_container" id='Other'>
                  <img src="img/city/Other.jpg" alt="其他縣市">
                  <div class="txt">
                    <h2>其他縣市</h2>
                  </div>
                </div>
  `;
  let bus_html = `
  <div class='container-List'>
  <div class = "alert alert-warning  fade show d-flex justify-content-center" role = "alert" >
    <div id='bus_result' class = "alert-body">
      <select id="select_bus_items">
      </select>
      <hr>
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



  // 找尋單一路線的資訊 (不設 let，因為這樣 HTML才讀得到這個函式(onclick))
  click_bus_info = function (city, route) {
    $(`div#route_${route}`).html('');
    /* ==公車路線== */
    $.ajax({
      // url: 'https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeByFrequency/City/' + city + '/' + route + '?$format=JSON',
      url: 'https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/' + city + '/' + route + '?$format=JSON',
      dataType: 'json',
      headers: GetAuthorizationHeader(), // 憑證 API token
      success: function (result) {
        console.log(result);
        Object.keys(result).forEach(function (value, key) {

          let bus_Route_len = result[value]['Stops'].length;
          let count = 0;
          $(`div#r_${route}`).append('<h2>' + result[value]['Stops'][0]['StopName']['Zh_tw'] + ' → ' + result[value]['Stops'][bus_Route_len - 1]['StopName']['Zh_tw'] + '</h2>');

          for (let i = 0; i < bus_Route_len; i++) {
            let Stop_Name = result[value]['Stops'][i]['StopName']['Zh_tw'];
            $(`div#r_${route}`).append('<h3>' + Stop_Name + '</h3>');
            count++;
          }
          $(`div#r_${route}`).append(`<h2>Count = ${count}</h2>`);
          $(`div#r_${route}`).append('<hr>');
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
  let master_City = ['Taipei', 'NewTaipei', 'Taoyuan', 'Taichung', 'Tainan', 'Kaohsiung'];
  let get_bus_info = function (city) {
    route = [];
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
          if (route.includes(bus_Route) === false) {
            route.push(bus_Route);
          }
        });


        if (!master_City.includes(city)) {
          let count = 0
          $('div.list-route-group').html('');
          for (let i = 0; i < route.length; i++) {
            count += 1;
            console.log(route[i]);
            $('.list-route-group').append(`
              <div class="accordion-item" >
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c_${i}" aria-expanded="true" aria-controls="c_${i}" onclick=click_bus_info('${city}','${route[i]}')>
                  ${route[i]}
                  </button>
                </h2>

                <div id="c_${i}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body" id='r_${route[i]}'>
                  </div>
                </div>
              </div>
              `);


          }
          $('.list-route-group').append(`<h2>Count= ${count}</h2>`);
        }

        // console.log(route);
      },
      // 當Ajax請求失敗
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  }

  // 臺北市: Taipei
  // 新北市: NewTaipei
  // 桃園市: Taoyuan
  // 臺中市: Taichung
  // 臺南市: Tainan
  // 高雄市: Kaohsiung
  // 基隆市: Keelung
  // 新竹市: Hsinchu
  // 新竹縣: HsinchuCounty
  // 苗栗縣: MiaoliCounty
  // 彰化縣: ChanghuaCounty
  // 南投縣: NantouCounty
  // 雲林縣: YunlinCounty
  // 嘉義縣: ChiayiCounty
  // 嘉義市: Chiayi
  // 屏東縣: PingtungCounty
  // 宜蘭縣: YilanCounty
  // 花蓮縣: HualienCounty
  // 臺東縣: TaitungCounty
  // 金門縣: KinmenCounty
  // 澎湖縣: PenghuCounty
  // 連江縣: LienchiangCounty
  // let Bus_City = ["Taipei", "NewTaipei", "Taoyuan", "Taichung",
  //   "Tainan", "Kaohsiung", "Keelung", "Hsinchu",
  //   "HsinchuCounty", "MiaoliCounty", "ChanghuaCounty", "NantouCounty",
  //   "YunlinCounty", "ChiayiCounty", "Chiayi", "PingtungCounty",
  //   "YilanCounty", "HualienCounty", "TaitungCounty", "KinmenCounty",
  //   "PenghuCounty", "LienchiangCounty"
  // ];
  // let Bus_City_Zh = ['臺北市', '新北市', '桃園市', '臺中市', '臺南市',
  //   '高雄市', '基隆市', '新竹市', '新竹縣', '苗栗縣', '彰化縣', '南投縣',
  //   '雲林縣', '嘉義縣', '嘉義市', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣',
  //   '金門縣', '澎湖縣', '連江縣'
  // ]


  let Route_Select = [];

  // 其他縣市部分，額外去寫
  // $('div.card:not([data-city="Other"])').on('click', function () {
  $('div.card').on('click', function () {
    let data_city = $(this).attr('data-city');
    // 得到 p的城市名稱
    let city_Name = $(this).children('p').text();
    // 開啟 Loading動畫
    $('div.bus-loading').show();
    // 當開始跑Loading時，不能再有任何動作
    // $(".Bus-City-info *").prop("disabled", "disabled").off('click');
    $("div.card").prop("disabled", "disabled");
    $(".Bus-City-info *:not(.bus-loading):not(.bus-loading *)").addClass('bus-loading-mask');
    $(this).removeClass('bus-loading-mask');

    setTimeout(function () {
      if (data_city !== 'Other') {
        get_bus_info(data_city);
      }
      // 1.5秒後隱藏 Total_City_Bus
      $('div.Bus-City-info').hide();
      $('h2#city_Name').text(city_Name);
      $('div.bus_Routes').removeClass('bus_Routes_active');
      $(`div[city_name_EN = '${data_city}']`).addClass('bus_Routes_active');
      $('.list-route-group').html('');
      for (let i = 0; i < $('.bus_Routes_active').children().length; i++) {
        Route_Select.push($('.bus_Routes_active').children().eq(i).attr('route_info'));
      }
      // console.log(Route_Select);
      // 當開始跑Loading時，不能再有任何動作
      $(".Bus-City-info *").removeClass('bus-loading-mask');
      $("div.card").prop("disabled", "false");
      $('div.bus-loading').hide();
      $('div.singleCity').show();
    }, 1500);
  });


  // 回上一頁
  $('button.go_Bus_Total').on('click', function () {
    $('div.singleCity').hide(0);
    $('div.Bus-City-info').show(0);
    Route_Select = [];
    $('.bus_Routes_active *').css('background-color', '#fff');
  });



  // 六都路線篩選
  $('.bus_Routes:not([city_name_EN="Other"]) span').on('click', function () {
    let count = 0
    $('div.list-route-group').html('');
    $('.bus_Routes_active *').css('background-color', '#fff');
    $(this).css('background-color', '#686de0');

    for (let i = 0; i < route.length; i++) {
      if (route[i].includes($(this).attr('route_info'))) {
        count += 1;
        $('.list-route-group').append(`
        <div class="accordion-item" >
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c_${i}" aria-expanded="true" aria-controls="c_${i}" onclick=click_bus_info('${$(this).parent().attr('city_name_EN')}','${route[i]}')>
            ${route[i]}
            </button>
          </h2>

          <div id="c_${i}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body"  id='r_${route[i]}'>
            </div>
          </div>
          </div>
        `);

      } else {
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
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c_${i}" aria-expanded="true" aria-controls="c_${i}" onclick=click_bus_info('${$(this).parent().attr('city_name_EN')}','${route[i]}')>
                  ${route[i]}
                  </button>
                </h2>

                <div id="c_${i}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body"  id='r_${route[i]}'>
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






  $('.city_container').on('click', function () {
    console.log($(this).attr('id'));
  });



});