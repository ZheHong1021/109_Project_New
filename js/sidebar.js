$(function () {

  // tra-sidebar-body
  let tra_html = `
  <!-- body -->
  <div class = "alert alert-primary fade show d-flex justify-content-center" role = "alert" >
      <div id='home_result' class = "alert-body text-center">
          <p>這部分可能會有Bug，如有問題請見諒😓</p>
          <p>本團隊會盡快修復正常😤</p>
      </div>
      </div>

   <div class='container-List'>
          <div class="TRA_Origination">
            <select id="TRA_Origination_Station_List" class="selectpicker" data-live-search="true" data-none-results-text = "沒有搜尋到關鍵字：{0}">
              <option selected disabled value="null">請選擇起站</option>
            </select>

          </div>

          <div class="TRA_Destination">
            <select id="TRA_Destination_Station_List" class="selectpicker" data-live-search="true" data-none-results-text = "沒有搜尋到關鍵字：{0}">
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
      <div class="bus-loading" style = "padding: 10px 20px; background-color: #eee; border-radius: 20px;">
        <div class = "d-flex justify-content-center align-items-center">
      <div class="spinner-border text-danger" role="status" ></div>
        <span class = 'mx-2'>Loading...</span>
        </div>
      </div>

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
  <div class='container-travel'>
  <div class="city_container" id='Taipei' city_name_Tw='臺北市'>
    <img src="img/city/Taipei.jpg" alt="臺北">
    <div class="txt">
      <h2>臺北市</h2>
    </div>
  </div>

  <div class="city_container" id='NewTaipei' city_name_Tw='新北市'>
    <img src="img/city/NewTaipei.jpg" alt="新北">
    <div class="txt">
      <h2>新北市</h2>
    </div>
  </div>
  <div class="city_container" id='Taoyuan' city_name_Tw='桃園市'>
    <img src="img/city/Taoyuan.jpg" alt="桃園">
    <div class="txt">
      <h2>桃園市</h2>
    </div>
  </div>
  <div class="city_container" id='Taichung' city_name_Tw='臺中市'>
    <img src="img/city/Taichung.jpg" alt="臺中">
    <div class="txt">
      <h2>臺中市</h2>
    </div>
  </div>
  <div class="city_container" id='Tainan' city_name_Tw='臺南市'> 
    <img src="img/city/Tainan.jpg" alt="臺南">
    <div class="txt">
      <h2>臺南市</h2>
    </div>
  </div>
  <div class="city_container" id='Kaohsiung' city_name_Tw='高雄市'>
    <img src="img/city/Kaohsiung.jpg" alt="高雄">
    <div class="txt">
      <h2>高雄市</h2>
    </div>
  </div>
  <div class="city_container" id='Other' city_name_Tw='其他縣市'>
    <img src="img/city/Other.jpg" alt="其他縣市">
    <div class="txt">
      <h2>其他縣市</h2>
    </div>
  </div>

  <div class="bus-loading">
    <div class="spinner-border text-danger" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  </div>

  <div class="travel_Category">
    <div class="category">

    <h2 class = "Travel_city_Name fw-bolder my-2" style='font-size: 28px'></h2>
      <button type="button" class="btn btn-secondary go_city_Container">上一頁</button>
      <div class="searchBox">
        <input class="search-value" type="text" placeholder="請搜尋你想找尋的地方">
        <i class="fas fa-list-alt" id='go_filter' data-view="show"></i>
      </div>


      <div class="filter_Container_Travel">
        <div class="filter_City_List mb-3">
          <h2 class="filter_header">縣市分類</h2>
          <div class="city-List text-center">
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'Keelung'>基隆市</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'Hsinchu'>新竹市</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'HsinchuCounty'>新竹縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'MiaoliCounty'>苗栗縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'ChanghuaCounty'>彰化縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'NantouCounty'>南投縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'YunlinCounty'>雲林縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'ChiayiCounty'>嘉義縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'Chiayi'>嘉義市</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'PingtungCounty'>屏東縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'YilanCounty'>宜蘭縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'HualienCounty'>花蓮縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'TaitungCounty'>金門縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'KinmenCounty'>臺東縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'PenghuCounty'>澎湖縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'LienchiangCounty'>連江縣</span>
          </div>

        </div>
        <h2 class='filter_header'>景點分類</h2>
        <div class="category-List">
        </div>
        <div class='line' style='width:100%; border-bottom: 2px solid #999; margin: 10px 0;'></div>
        <div class="item_Control">
          <button type="button" class="btn btn-primary confirm_items">確定</button>
          <button type="button" class="btn btn-danger all_choose_items">全選</button>
          <button type="button" class="btn btn-secondary clear_items">清除</button>
        </div>

      </div>

      <!-- <div class="category-List"></div> -->
      <div class="category-Items">
      </div>

    </div>

    <div class="bus-loading">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
  `;
 
  
  let food_html = `
  <!-- body -->
  <div class = "alert alert-primary fade show d-flex justify-content-center" role = "alert" >
      <div id='home_result' class = "alert-body text-center">目前只有UI介面，功能部分暫請等待</div>
      <!--<p><button onclick="addUser()">add user</button></b>--!>
      </div>

  <div class='container-food'>
  <div class="city_container" id='Taipei' city_name_Tw='臺北市'>
    <img src="img/food/Taipei.jpg" alt="臺北">
    <div class="txt">
      <h2>臺北市</h2>
    </div>
  </div>

  <div class="city_container" id='NewTaipei' city_name_Tw='新北市'>
    <img src="img/food/NewTaipei.jpg" alt="新北美食">
    <div class="txt">
      <h2>新北市</h2>
    </div>
  </div>
  <div class="city_container" id='Taoyuan' city_name_Tw='桃園市'>
    <img src="img/food/Taoyuan.jpg" alt="桃園美食">
    <div class="txt">
      <h2>桃園市</h2>
    </div>
  </div>
  <div class="city_container" id='Taichung' city_name_Tw='臺中市'>
    <img src="img/food/Taichung.jpg" alt="臺中美食">
    <div class="txt">
      <h2>臺中市</h2>
    </div>
  </div>
  <div class="city_container" id='Tainan' city_name_Tw='臺南市'> 
    <img src="img/food/Tainan.jpg" alt="臺南美食">
    <div class="txt">
      <h2>臺南市</h2>
    </div>
  </div>
  <div class="city_container" id='Kaohsiung' city_name_Tw='高雄市'>
    <img src="img/food/Kaohsiung.jpg" alt="高雄美食">
    <div class="txt">
      <h2>高雄市</h2>
    </div>
  </div>
  <div class="city_container" id='Other' city_name_Tw='其他縣市'>
    <img src="img/food/Other.jpg" alt="其他縣市美食">
    <div class="txt">
      <h2>其他縣市</h2>
    </div>
  </div>

  <div class="bus-loading">
    <div class="spinner-border text-danger" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  </div>

  <div class="food_Category">
    <div class="category">

    <h2 class = "Food_city_Name fw-bolder my-2" style='font-size: 28px'></h2>
      <button type="button" class="btn btn-secondary go_city_Container">上一頁</button>
      <div class="searchBox">
        <input class="search-value" type="text" placeholder="請搜尋你想找尋的地方">
        <i class="fas fa-list-alt" id='go_filter' data-view="show"></i>
      </div>
      <div class="filter_Container_Food">
        <div class="filter_City_List mb-3">
          <h2 class="filter_header">縣市分類</h2>
          <div class="city-List text-center">
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'Keelung'>基隆市</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'Hsinchu'>新竹市</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'HsinchuCounty'>新竹縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'MiaoliCounty'>苗栗縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'ChanghuaCounty'>彰化縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'NantouCounty'>南投縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'YunlinCounty'>雲林縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'ChiayiCounty'>嘉義縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'Chiayi'>嘉義市</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'PingtungCounty'>屏東縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'YilanCounty'>宜蘭縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'HualienCounty'>花蓮縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'TaitungCounty'>金門縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'KinmenCounty'>臺東縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'PenghuCounty'>澎湖縣</span>
            <span class = "badge bg-secondary" id="city_filter" is_filter="false" city_filter = 'LienchiangCounty'>連江縣</span>
          </div>
        </div>

        <div class="Food-category-List">
        </div>
        

      <div class="Food-category-Items">
      </div>

    </div>

    <div class="bus-loading">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>

  `;




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
        <span route_info = '橘'>橘線</span>
        <span route_info = 'JOY' getroute-first = '0'>JOY</span>
        <span route_info = '幹線' getroute-first = '0'>幹線</span>
        <span route_info = '快線' getroute-first = '0'>快線</span>
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
      <div id='home_result' class = "alert-body text-center">尚無功能，暫請等待</div>
      <!--<p><button onclick="addUser()">add user</button></b>--!>
      </div>`;

  let config_html = `
  <!-- body -->
  <div class = "alert alert-primary fade show d-flex justify-content-center" role = "alert" >
      <div id='home_result' class = "alert-body text-center">尚無功能，暫請等待</div>
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
  sidebar
    .addPanel({
      id: 'food',
      tab: '<i class="fas fa-utensils"></i>',
      title: '美食',
      pane: food_html,
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


});