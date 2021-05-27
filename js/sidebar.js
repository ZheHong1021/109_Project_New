$(function () {

  let tra_html = `
   <div class='container-List'>
        <img src='./img/TRA_LOGO.webp' style='width:60%; height:60%; margin: 15px 0;'></img>
        <div class="select-box">
            <div class="options-container" id = 'O_Station'>
            </div>
            <div class="selected" id = "TRA_Origination_Selected">
                請選擇起站
            </div>
            <div class="search-box" id = 'O_Station'>
              <input type="text" placeholder="請選擇起站" />
            </div>
        </div>

        <div class="select-box">
            <div class="options-container" id = 'D_Station'>
            </div>
            <div class="selected" id = "TRA_Destination_Selected">
                請選擇迄站
            </div>
            <div class="search-box" id = 'D_Station'>
              <input type="text" placeholder="請選擇迄站"  />
            </div>
        </div>

        <div class = 'tra_Button_Container'>
          <!-- Button trigger modal -->
        <button type="button" id='go_Time_Search_TRA' class="btn btn-primary">
            查詢車班
            <span class="spinner-border spinner-border-sm" id='spinner-TRA-Time' role="status" aria-hidden="true" hidden></span>
          </div>

        </div>

        <div class="alert alert-warning  fade show d-flex justify-content-center" role="alert">
          <div id='tra_result' class="alert-body text-center" style='width: 100%;'>尚無查詢紀錄</div>
        </div>
      
  `;

  let thsr_html = `
   <div class='container-List'>
   <img src='./img/THSR_LOGO.webp' style='width:80%; height:80%; margin-bottom: 15px;'></img>
        <div class="select-box" id='thsr'>
            <div class="options-container-thsr" id = 'O_Station'>
            </div>
            <div class="selected-thsr" id = "THSR_Origination_Selected">
                請選擇起站
            </div>
            <div class="search-box-thsr" id = 'O_Station'>
              <input type="text" placeholder="請選擇起站" />
            </div>
        </div>

        <div class="select-box" id='thsr'>
            <div class="options-container-thsr" id = 'D_Station'>
            </div>
            <div class="selected-thsr" id = "THSR_Destination_Selected">
                請選擇迄站
            </div>
            <div class="search-box-thsr" id = 'D_Station'>
              <input type="text" placeholder="請選擇迄站"  />
            </div>
        </div>

        <div class = 'thsr_Button_Container'>
          <!-- Button trigger modal -->
        <button type="button" id='go_Time_Search_THSR' class="btn btn-primary">
            查詢車班
            <span class="spinner-border spinner-border-sm" id='spinner-THSR-Time' role="status" aria-hidden="true" hidden></span>
          </div>

        </div>

        <div class="alert alert-warning  fade show d-flex justify-content-center" role="alert">
          <div id='thsr_result' class="alert-body text-center" style='width: 100%;'>尚無查詢紀錄</div>
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

  <div class="bus-loading" style = "padding: 10px 20px; background-color: #eee; border-radius: 20px;">
    <div class = "d-flex justify-content-center align-items-center">
    <div class="spinner-border text-danger" role="status" ></div>
      <span class = 'mx-2'>Loading...</span>
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

    <div class="bus-loading" style = "padding: 10px 20px; background-color: #eee; border-radius: 20px;">
    <div class = "d-flex justify-content-center align-items-center">
    <div class="spinner-border text-danger" role="status" ></div>
      <span class = 'mx-2'>Loading...</span>
      </div>
    </div>

  </div>
  `;


  let food_html = `     
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

  <div class="bus-loading" style = "padding: 10px 20px; background-color: #eee; border-radius: 20px;">
  <div class = "d-flex justify-content-center align-items-center">
  <div class="spinner-border text-danger" role="status" ></div>
    <span class = 'mx-2'>Loading...</span>
    </div>
  </div>

  </div>

  <div class="food_Category">
    <div class="category">
    <h2 class = "Food_city_Name fw-bolder my-2" style='font-size: 28px'></h2>
      <button type="button" class="btn btn-secondary go_city_Container">上一頁</button>
      <div class="searchBox">
        <input class="search-food" type="text" placeholder="請搜尋你想找尋的地方">
        <i class="fas fa-list-alt" id='go_filter_food' data-view="show"></i>
      </div>
      <div class="filter_Container_Food">
        <div class="filter_City_List mb-3">
          <h2 class="filter_header">縣市分類</h2>
          <div class="city-List text-center">
            <span class = "badge bg-secondary" id="city_filter_food" is_filter="false" city_filter = 'Keelung'>基隆市</span>
            <span class = "badge bg-secondary" id="city_filter_food" is_filter="false" city_filter = 'HsinchuCounty'>新竹縣</span>
            <span class = "badge bg-secondary" id="city_filter_food" is_filter="false" city_filter = 'Hsinchu'>新竹市</span>
            <span class = "badge bg-secondary" id="city_filter_food" is_filter="false" city_filter = 'MiaoliCounty'>苗栗縣</span>
            <span class = "badge bg-secondary" id="city_filter_food" is_filter="false" city_filter = 'ChanghuaCounty'>彰化縣</span>
            <span class = "badge bg-secondary" id="city_filter_food" is_filter="false" city_filter = 'NantouCounty'>南投縣</span>
            <span class = "badge bg-secondary" id="city_filter_food" is_filter="false" city_filter = 'YunlinCounty'>雲林縣</span>
            <span class = "badge bg-secondary" id="city_filter_food" is_filter="false" city_filter = 'ChiayiCounty'>嘉義縣</span>
            <span class = "badge bg-secondary" id="city_filter_food" is_filter="false" city_filter = 'Chiayi'>嘉義市</span>
            <span class = "badge bg-secondary" id="city_filter_food" is_filter="false" city_filter = 'PingtungCounty'>屏東縣</span>
            <span class = "badge bg-secondary" id="city_filter_food" is_filter="false" city_filter = 'YilanCounty'>宜蘭縣</span>
            <span class = "badge bg-secondary" id="city_filter_food" is_filter="false" city_filter = 'HualienCounty'>花蓮縣</span>
            <span class = "badge bg-secondary" id="city_filter_food" is_filter="false" city_filter = 'TaitungCounty'>金門縣</span>
            <span class = "badge bg-secondary" id="city_filter_food" is_filter="false" city_filter = 'KinmenCounty'>臺東縣</span>
            <span class = "badge bg-secondary" id="city_filter_food" is_filter="false" city_filter = 'PenghuCounty'>澎湖縣</span>
            <span class = "badge bg-secondary" id="city_filter_food" is_filter="false" city_filter = 'LienchiangCounty'>連江縣</span>
          </div>
          <div class="item_Control">
              <button type="button" class="btn btn-primary confirm_food">確定</button>
          </div>
        </div>
        </div>
        
        <div class="Food-category-Items my-3">
        </div>
        
        <div id = 'food_Load' class="bus-loading" style = "padding: 10px 20px; background-color: #eee; border-radius: 20px;">
        <div class = "d-flex justify-content-center align-items-center">
        <div class="spinner-border text-danger" role="status" ></div>
          <span class = 'mx-2'>Loading...</span>
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
   <div class="bus-loading" style = "padding: 10px 20px; background-color: #eee; border-radius: 20px;">
  <div class = "d-flex justify-content-center align-items-center">
  <div class="spinner-border text-danger" role="status" ></div>
    <span class = 'mx-2'>Loading...</span>
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
</div>
  `;

  let bike_html = `
  <div class = 'bike-city-Category'>
    <div class="city_Bike master-city" id='Taipei' city_name_Tw='臺北市'>
        <i class="fas fa-biking"></i>
        <h2>台北市</h2>
    </div>
    <div class="city_Bike master-city" id='NewTaipei' city_name_Tw='新北市'>
        <i class="fas fa-biking"></i>
        <h2>新北市</h2>
    </div>
    <div class="city_Bike master-city" id='Taoyuan' city_name_Tw='桃園市'>
        <i class="fas fa-biking"></i>
        <h2>桃園市</h2>
    </div>

    <div class="city_Bike master-city" id='Tainan' city_name_Tw='臺南市'>
        <i class="fas fa-biking"></i>
        <h2>臺南市</h2>
    </div>
    <div class="city_Bike master-city" id='NewTaipei' city_name_Tw='新北市'>
        <i class="fas fa-biking"></i>
        <h2>新北市</h2>
    </div>
    <div class="city_Bike master-city" id='Kaohsiung' city_name_Tw='高雄市'>
        <i class="fas fa-biking"></i>
        <h2>高雄市</h2>
    </div>


    <div class="city_Bike N1_City"  id='Keelung' city_name_Tw='基隆市'>
        <i class="fas fa-biking"></i>
        <h2>基隆市</h2>
    </div>
    <div class="city_Bike N1_City" id='HsinchuCounty' city_name_Tw='新竹縣'>
        <i class="fas fa-biking"></i>
        <h2>新竹縣</h2>
    </div>
    <div class="city_Bike N1_City" id='MiaoliCounty' city_name_Tw='苗栗縣'>
        <i class="fas fa-biking"></i>
        <h2>苗栗縣</h2>
    </div>

    
    <div class="city_Bike N1_City" id='ChanghuaCounty' city_name_Tw='彰化縣'>
        <i class="fas fa-biking"></i>
        <h2>彰化縣</h2>
    </div>
    <div class="city_Bike N1_City" id='NantouCounty' city_name_Tw='南投縣'>
        <i class="fas fa-biking"></i>
        <h2>南投縣</h2>
    </div>
    <div class="city_Bike N1_City" id='YunlinCounty' city_name_Tw='雲林縣'>
        <i class="fas fa-biking"></i>
        <h2>雲林縣</h2>
    </div>

    <div class="city_Bike N2_City" id='ChiayiCounty' city_name_Tw='嘉義縣'>
        <i class="fas fa-biking"></i>
        <h2>嘉義縣</h2>
    </div>
    <div class="city_Bike N2_City" id='Chiayi' city_name_Tw='嘉義市'>
        <i class="fas fa-biking"></i>
        <h2>嘉義市</h2>
    </div>
    <div class="city_Bike N2_City" id='PingtungCounty' city_name_Tw='屏東縣'>
        <i class="fas fa-biking"></i>
        <h2>屏東縣</h2>
    </div>

    <div class="city_Bike N2_City" id='YilanCounty' city_name_Tw='宜蘭縣'>
        <i class="fas fa-biking"></i>
        <h2>宜蘭縣</h2>
    </div>
    <div class="city_Bike N2_City" id='HualienCounty' city_name_Tw='花蓮縣'>
        <i class="fas fa-biking"></i>
        <h2>花蓮縣</h2>
    </div>
    <div class="city_Bike N2_City" id='TaitungCounty' city_name_Tw='臺東縣'>
        <i class="fas fa-biking"></i>
        <h2>臺東縣</h2>
    </div>
    <div class="city_Bike N2_City" id='KinmenCounty' city_name_Tw='金門縣'>
        <i class="fas fa-biking"></i>
        <h2>金門縣</h2>
    </div>
    <div class="city_Bike N2_City" id='PenghuCounty' city_name_Tw='澎湖縣'>
        <i class="fas fa-biking"></i>
        <h2>澎湖縣</h2>
    </div>

  </div>


    <div class = 'bike-container'>
      <i class="fas fa-bicycle text-center" style='font-size: 60px;'></i>
      <h2 class='bike-city'></h2>
      <div class="searchBox">
      <input class="search-bike" type="text" placeholder="請搜尋你想找尋的地方">
      </div>
      <button type="button" class="btn btn-secondary go_Bike_Container p-2 m-2" style='width: auto;'>上一頁</button>

      <div class = 'route-Group'>

      </div>
    
    </div>
  `;


  var sidebar = L.control.sidebar({
    container: 'sidebar',
  })
    .addTo(map)
    .open('home');

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

  sidebar
    .addPanel({
      id: 'bus',
      tab: '<i class="fas fa-bus-alt"></i>',
      title: '公車',
      pane: bus_html,
    })

    .addPanel({
      id: 'train',
      tab: '<i class="fas fa-subway"></i>',
      title: '火車',
      pane: tra_html,
    })
    .addPanel({
      id: 'thsr',
      tab: '<img src="img/high-speed-train.svg" style="width:65%; height:65%;"></img>',
      title: '高鐵',
      pane: thsr_html,
    })

    .addPanel({
      id: 'mrt',
      tab: '<i class="fas fa-train"></i>',
      title: '捷運',
      pane: mrt_html,
    })
    .addPanel({
      id: 'bike',
      tab: '<i class="fas fa-biking"></i>',
      title: '自行車',
      pane: bike_html,
    })

    $('img[src="img/high-speed-train.svg"]').parent().addClass('d-flex justify-content-center align-items-center');





  /* ==========  火車/捷運票價 ======= */
  let mrt_FareInfo;
  function select_Route(route) {
    let select = 'OriginStationID,OriginStationName,DestinationStationID,DestinationStationName,TrainType,Fares,TravelTime,TravelDistance';
    $.ajax({
      url: `https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/${route}?$select=${select}&$format=JSON`,
      dataType: "json",
      contentType: 'json',
      headers: GetAuthorizationHeader(),
      success: function (result) {
        mrt_FareInfo = $.parseJSON(JSON.stringify(result));
        const select_box_Origin = $('div.Origin_Station').find('#Origin_StationName_List');
        const select_box_Destination = $('div.Destination_Station').find('#Destination_StationName_List');
        $('img.routing-img').attr('srcset', "img/mrt/" + route + ".jpg");
        let station_list = [];
        let select_item = ``;
        for (let index = 0; index < result.length; index++) {
          let station_Name = result[index]["OriginStationName"]['Zh_tw'];
          let station_id = result[index]["OriginStationID"];
          if (!station_list.includes(station_Name) && !station_list.includes(station_id)) {
            select_item = select_item + `
                <option>${station_id} ${station_Name}</option>
            `;
            station_list.push(station_Name);
            station_list.push(station_id);
          }
        }
        select_box_Origin.append(select_item);
        select_box_Destination.append(select_item);
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
    let select_val = this.value;
    const select_box_Origin = document.querySelector('#Origin_StationName_List');
    const select_box_Destination = document.querySelector('#Destination_StationName_List');
    select_box_Origin.length = 0;
    select_box_Destination.length = 0;
    $('div.bus-loading').show();
    setTimeout(function () {
      select_Route(select_val);
      $('div.bus-loading').hide();
    }, 1500);
  });


  $('button#go_Search_MRT').on('click', function () {
    $('span#spinner-MRT').removeAttr("hidden");
    $('button#go_Search_MRT').prop("disabled", true);
    $('div#mrt_result').html("載入中......");
    setTimeout(function () {
      $('div#mrt_result').removeClass('text-center');
      $('div#mrt_result').html("");
      let mrt_Result_Content = '';
      let origin_List = $('#Origin_StationName_List');
      let Destination_List = $('#Destination_StationName_List');
      mrt_Result_Content = mrt_Result_Content + `
      <h2>起站: ${origin_List.val()}</h2>
      <h2>迄站: ${Destination_List.val()}</h2>`;
      for (let index = 0; index < mrt_FareInfo.length; index++) {
        var station_Name_O = mrt_FareInfo[index]['OriginStationID'] + ' ' + mrt_FareInfo[index]['OriginStationName']['Zh_tw'];
        var station_Name_D = mrt_FareInfo[index]['DestinationStationID'] + ' ' + mrt_FareInfo[index]['DestinationStationName']['Zh_tw'];
        if (station_Name_O == origin_List.val() &&
          station_Name_D == Destination_List.val()) {
          var fares = mrt_FareInfo[index]['Fares'];
          var travel_Time = mrt_FareInfo[index]['TravelTime'];
          var travel_Distance = mrt_FareInfo[index]['TravelDistance'];
          if (travel_Time) {
            mrt_Result_Content = mrt_Result_Content + `<h2>到達時間約: ${travel_Time}分鐘</h2>`;
          }
          if (travel_Distance) {
            mrt_Result_Content = mrt_Result_Content + `<h2>路程距離: ${travel_Distance}公里</h2>`;
          }
          for (let i = 0; i < fares.length; i++) {
            if (fares[i]['TicketType'] == 1) {
              switch (fares[i]['FareClass']) {
                case 1:
                  mrt_Result_Content = mrt_Result_Content + `<h2>成人票: $${fares[i]['Price']}</h2>`;
                  break;
                case 2:
                  mrt_Result_Content = mrt_Result_Content + `<h2>學生票: $${fares[i]['Price']}</h2>`;
                  break;
                case 3:
                  mrt_Result_Content = mrt_Result_Content + `<h2>孩童票: $${fares[i]['Price']}</h2>`;
                  break;
                case 4:
                  mrt_Result_Content = mrt_Result_Content + `<h2>敬老票: $${fares[i]['Price']}</h2>`;
                  break;
                case 5:
                  mrt_Result_Content = mrt_Result_Content + `<h2>愛心票: $${fares[i]['Price']}</h2>`;
                  break;
                case 6:
                  mrt_Result_Content = mrt_Result_Content + `<h2>愛心孩童票: $${fares[i]['Price']}</h2>`;
                  break;
                case 7:
                  mrt_Result_Content = mrt_Result_Content + `<h2>愛心優待 / 愛心陪伴票: $${fares[i]['Price']}</h2>`;
                  break;
                case 8:
                  mrt_Result_Content = mrt_Result_Content + `<h2>團體票: $${fares[i]['Price']}</h2>`;
                  break;
              }
            }
          }
        }
      }

      $('div#mrt_result').append(mrt_Result_Content);
      $('span#spinner-MRT').prop("hidden", true);
      $('button#go_Search_MRT').prop("disabled", false);
    }, 1500);
  });



    let tra_Station_Info;
    let select = 'LocationCity,StationName,StationID';
    $.ajax({
      url: `https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/Station?$select=${select}&$format=JSON`,
      dataType: "json",
      contentType: 'json',
      headers: GetAuthorizationHeader(),
      success: function (result) {
        tra_Station_Info = $.parseJSON(JSON.stringify(result));
        let city_arr = [];
        let picker_Dom_O = $(`div.options-container[id='O_Station']`);
        let picker_Dom_D = $(`div.options-container[id='D_Station']`);
        for (let i = 0; i < result.length; i++) {
          let station_Name = result[i]['StationName']['Zh_tw'];
          let station_id = result[i]['StationID'];
          let city = result[i]['LocationCity'].substr(0, 2);
          if (!(city_arr.includes(city))) {
            city_arr.push(city);
            picker_Dom_O.append(`
                <div class = "city-options" city-name = "${city}" id='O_Station'>
                  <p class='city-option-Name'>${city}</p>
                </div>
            `);
            picker_Dom_D.append(`
                <div class = "city-options" city-name = "${city}" id='D_Station'>
                  <p class='city-option-Name'>${city}</p>
                </div>
            `);
          }

          $(`div[city-name="${city}"][id='O_Station']`).append(`
              <div class="option" style="display: block;">
              <input type="radio" class="radio" id="O_Station_${station_id}" name="category" />
              <label for="O_Station_${station_id}">${station_Name}</label>
              </div>        
          `);
          $(`div[city-name="${city}"][id='D_Station']`).append(`
              <div class="option" style="display: block;">
              <input type="radio" class="radio" id="D_Station_${station_id}" name="category" />
              <label for="D_Station_${station_id}">${station_Name}</label>
              </div>        
          `);
        }

        // https://www.youtube.com/watch?v=VZzWzRVXPcQ&ab_channel=GTCoding
        $('.selected').on('click', function () {
          let select_id = this.id == 'TRA_Origination_Selected' ? 'O_Station' : 'D_Station';
          $(`.options-container[id="${select_id}"]`).toggleClass('active');
          $(`.search-box[id="${select_id}"] input`).val = '';
          filterList("");
          if ($(`.options-container[id="${select_id}"]`).hasClass("active")) {
            $(`.search-box[id="${select_id}"] input`).focus();
          }
        });

        $('.city-options div.option').on('click', function () {
          let select_id = $(this).parent().parent().attr('id');
          let select = select_id == 'O_Station' ? 'TRA_Origination_Selected' : 'TRA_Destination_Selected';
          $(`.selected[id="${select}"]`).html($(this).find('label').text());
          $(`.options-container[id="${select_id}"]`).removeClass('active');
        });


        $('.search-box input').on("keyup", function (e) {
          let search_id = $(this).parent().attr('id');
          filterList(e.target.value, search_id);
        });

        const filterList = function (searchTerm, id) {
          let option_List = $(`.options-container[id="${id}"] div.option`);
          for (let i = 0; i < option_List.length; i++) {
            let label = option_List.eq(i).find('label').text().toLowerCase();
            if (label.indexOf(searchTerm) != -1) {
              option_List.eq(i).css('display', 'block');
            } else {
              option_List.eq(i).css('display', 'none');
            }
          }

          let city_Select = $(`div.options-container[id="${id}"]`).find('div.city-options');
          const city_Select_Length = city_Select.length;
          for (let i = 0; i < city_Select_Length; i++) {
            let select_city = city_Select.eq(i).attr('city-name');
            let station_City_Choose = $(`.options-container[id='${id}'] div[city-name='${select_city}']`);
            let find_option = station_City_Choose.find('div.option[style="display: block;"]');
            if (find_option.length == 0) {
              station_City_Choose.hide();
            } else {
              station_City_Choose.show();
            }
          }
        };
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });

  

  let train_Ticket_Search = function(index,O_id, D_id, Direction, train_Type){
    let return_Text = '';
  let trainType = '';
  let filter = `Direction eq ${Direction} AND TrainType eq ${train_Type}`;
  $.ajax({
    url: `https://ptx.transportdata.tw/MOTC/v3/Rail/TRA/ODFare/${O_id}/to/${D_id}?$filter=${filter}&$format=JSON`,
    dataType: 'json',
    headers: GetAuthorizationHeader(),
    contentType: 'json',
    success: function (result) {
      // TrainType (Int32): 車種簡碼 = ['1: 太魯閣', '2: 普悠瑪', '3: 自強', '4: 莒光', '5: 復興', '6: 區間', '7: 普快', '10: 區間快'] ,
      Object.keys(result['ODFares']).forEach(function (value, key) {
        switch (result['ODFares'][value]['TrainType']){
          case 1:
            trainType = '太魯閣' 
            break 
          case 2:
            trainType = '普悠瑪'
            break
          case 3:
            trainType = '自強'
            break
          case 4:
            trainType = '莒光'
            break
          case 5:
            trainType = '復興'
            break
          case 6:
            trainType = '區間'
            break
          case 7:
            trainType = '普快'
            break
          case 10:
            trainType = '區間快'
            break
        }
      // TicketType (Int32): 票種類型 = ['1: 一般票', '2: 來回票', '3: 電子票證', '4: 回數票', '5: 定期票(30天期)', '6: 定期票(60天期)', '7: 早鳥票'] ,
        Object.keys( result['ODFares'][value]['Fares']).forEach(function (index, key) {
          let fares = result['ODFares'][value]['Fares'];
          let ticketType = '';
          switch (fares[index]['TicketType']){
            case 1:
               ticketType = '一般票'; 
              break 
            case 2:
               ticketType = '來回票'; 
              break 
            case 3:
               ticketType = '電子票證'; 
              break 
            case 4:
               ticketType = '回數票'; 
              break 
            case 5:
               ticketType = '定期票(30天期)'; 
              break 
            case 6:
               ticketType = '定期票(60天期)'; 
              break 
            case 7:
               ticketType = '早鳥票'; 
              break 
          }
          let fareClass = '';
      // FareClass (Int32): 費率等級 = ['1: 成人', '2: 學生', '3: 孩童', '4: 敬老', '5: 愛心', '6: 愛心孩童', '7: 愛心優待/愛心陪伴', '8: 團體', '9: 軍警'] ,
          switch (fares[index]['FareClass']){
            case 1:
               fareClass = '成人'; 
              break 
            case 2:
               fareClass = '學生'; 
              break 
            case 3:
               fareClass = '孩童'; 
              break 
            case 4:
               fareClass = '敬老'; 
              break 
            case 5:
               fareClass = '愛心'; 
              break 
            case 6:
               fareClass = '愛心孩童'; 
              break 
            case 7:
               fareClass = '愛心優待/愛心陪伴'; 
              break 
            case 8:
               fareClass = '團體'; 
              break 
            case 9:
               fareClass = '軍警'; 
              break 
          }

          let cabinClass = '';
          // CabinClass (Int32): 艙等 = ['1: 標準座車廂', '2: 商務座車廂', '3: 自由座車廂'] ,
          switch (fares[index]['CabinClass']){
            case 1:
               cabinClass = '標準座車廂'; 
              break 
            case 2:
               cabinClass = '商務座車廂'; 
              break 
            case 3:
               cabinClass = '自由座車廂'; 
              break 
          }
       
          return_Text = return_Text + `
            <div class='fare_Item'>
              <h2>${fareClass}票</h2>
              <h2>$${fares[index]['Price']}</h2>
            </div>
          `;
        });
        
        console.log('-----------------------------------------------------------------------');
        $('div.single_Tra_Time').eq(index).append(`
          <div class='fare_Container'>
            ${return_Text}
          </div>
          <hr>
        `);
      });
      $('.fare_Container').hide();
    },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  }


  let tra_Result_Content = '';
  $('button#go_Time_Search_TRA').on('click', function () {
    $('span#spinner-TRA-Time').removeAttr("hidden");
    this.disabled = true;
    let tra_Result = $('div#tra_result');
    if(!tra_Result.hasClass('text-center')){
      tra_Result.addClass('text-center');
    }
    tra_Result.html("載入中......");
    setTimeout(function () {
      if ($('#TRA_Origination_Selected').text().trim() == '請選擇起站' || $('#TRA_Destination_Selected').text().trim() == '請選擇迄站') {
        tra_Result.html("");
        tra_Result.append("<h2> ❗ 請確實填入站點資訊 ❗</h2>");
      }
      else {
       
        for (let index = 0; index < tra_Station_Info.length; index++) {
          if (tra_Station_Info[index]['StationName']['Zh_tw'] == $('#TRA_Origination_Selected').text()) {
            var station_ID_O = tra_Station_Info[index]['StationID'];
          }
          if (tra_Station_Info[index]['StationName']['Zh_tw'] == $('#TRA_Destination_Selected').text()) {
            var station_ID_D = tra_Station_Info[index]['StationID'];
          }
        }
        const Today = new Date()
        const date = Today.getDate() + 1 > 10 ? Today.getDate() : '0' + Today.getDate();
        const month = Today.getMonth() + 1 > 10 ? Today.getMonth() + 1 : '0' + (Today.getMonth() + 1);
        const year = Today.getFullYear()
        const train_Date = year + '-' + month + '-' + date;
        
        tra_Result.html("");
        $.ajax({
          url: `https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/DailyTimetable/OD/${station_ID_O}/to/${station_ID_D}/${train_Date}?$format=JSON`,
          dataType: "json",
          headers: GetAuthorizationHeader(),
          success: function (result) {
            // console.log(result);
            if(result.length == 0){
              tra_Result.html('<h2><i class="fas fa-exclamation-triangle mx-2" style="color: red;"></i>查無資料</h2>');
              return;
            }
            tra_Result.removeClass('text-center');
            tra_Result.html("");
            tra_Result_Content = '';

            for (let index = 0; index < result.length; index++) {
              let train_No = result[index]['DailyTrainInfo']['TrainNo'];
              let startingStationName = result[index]['DailyTrainInfo']['StartingStationName']['Zh_tw'];
              let endingStationName = result[index]['DailyTrainInfo']['EndingStationName']['Zh_tw'];
              let trainTypeName = result[index]['DailyTrainInfo']['TrainTypeName']['Zh_tw'];
              let O_stationName = result[index]['OriginStopTime']['StationName']['Zh_tw'];
              let O_DepartureTime = result[index]['OriginStopTime']['DepartureTime'];
              let D_stationName = result[index]['DestinationStopTime']['StationName']['Zh_tw'];
              let D_ArrivalTime = result[index]['DestinationStopTime']['ArrivalTime'];

              _startTime = O_DepartureTime.split(":");
              _endTime = D_ArrivalTime.split(":");
              var startDate = new Date(0, 0, 0, _startTime[0], _startTime[1], 0);
              var EndDate = new Date(0, 0, 0, _endTime[0], _endTime[1], 0);
              EndDate.setHours(EndDate.getHours() - startDate.getHours());
              EndDate.setMinutes(EndDate.getMinutes() - startDate.getMinutes());
              resultTime = EndDate.getHours() + "小時" + EndDate.getMinutes() + "分鐘";
              let train_Type_Color = '';
              if (trainTypeName.indexOf('自強') != -1) { train_Type_Color = 'red' } else if (trainTypeName.indexOf('莒光') != -1) { train_Type_Color = '#e67e22' } else if (trainTypeName.indexOf('區間') != -1) { train_Type_Color = 'blue'; } else { train_Type_Color = 'black'; }

              tra_Result_Content = tra_Result_Content + `
              <div class = 'single_Tra_Time' data-trainType = '${trainTypeName}'>
                  <h2>日期: ${train_Date}</h2>
                  <h2><i class="fas fa-subway" style='color: ${train_Type_Color};'></i> ${trainTypeName}_No.${train_No}</h2>
                  <h2>(${startingStationName}  →  ${endingStationName})</hw>
                  <h2>起站: <i class="far fa-clock" title="上車時間" style='color: blue'></i> ${O_DepartureTime}   ${O_stationName}</h2>
                  <h2>迄站: <i class="far fa-clock" title="下車時間" style='color: blue'></i> ${D_ArrivalTime}   ${D_stationName}</h2>
                  <h2>需花費: ${resultTime}</h2>
                  <h2><span class='badge bg-secondary' style ='cursor:pointer;' id='ticket_Show' data-num=${index} onclick=ticket_toggle(${index})>票價顯示 / 隱藏</span></h2>
              </div>
              `;
            train_Ticket_Search(index, station_ID_O, station_ID_D, result[index]['DailyTrainInfo']['Direction'], result[index]['DailyTrainInfo']['TrainTypeCode']);
          }
            tra_Result.append(tra_Result_Content);
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
          }
        });
      }
      $('span#spinner-TRA-Time').prop("hidden", true);
      $('button#go_Time_Search_TRA').prop("disabled", false);
    }, 1500);
  });

  ticket_toggle = function(num){
    let ticket_Show = $(`#ticket_Show[data-num='${num}']`);
      if(ticket_Show.hasClass('bg-secondary')){
        ticket_Show.removeClass('bg-secondary');
        ticket_Show.addClass('bg-success');
        $('div.fare_Container').eq(num).show(1000);
      }else if(ticket_Show.hasClass('bg-success')){
        ticket_Show.removeClass('bg-success');
        ticket_Show.addClass('bg-secondary');
        $('div.fare_Container').eq(num).hide(1000);
      }
    }
  /* ========== 火車/捷運票價(End)=========== */


      /* ========== 高鐵=========== */
      let Thsr_Station_Info;
      let picker_Dom_O = $(`.options-container-thsr[id='O_Station']`);
      let picker_Dom_D = $(`.options-container-thsr[id='D_Station']`);
      select = `StationName,StationID`;
      $.ajax({
        url: `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/Station?$select=${select}&format=JSON`,
        dataType: 'json',
        contentType: 'json',
        headers: GetAuthorizationHeader(), 
        success: function (result) {
          Thsr_Station_Info = $.parseJSON(JSON.stringify(result));
          Object.keys(result).forEach(function (value, key) {
              let station_Name = result[value]['StationName']['Zh_tw'];
              let station_id = result[value]['StationID'];
              picker_Dom_O.append(`
              <div class="option" style="display: block;">
              <input type="radio" class="radio" id="O_Station_${station_id}" name="category" />
              <label for="O_Station_${station_id}">${station_Name}</label>
              </div>     
              `);
              picker_Dom_D.append(`
              <div class="option" style="display: block;">
              <input type="radio" class="radio" id="D_Station_${station_id}" name="category" />
              <label for="D_Station_${station_id}">${station_Name}</label>
              </div>    
              `);
        });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log(XMLHttpRequest);
          console.log(textStatus);
          console.log(errorThrown);
        }
      });
        // https://www.youtube.com/watch?v=VZzWzRVXPcQ&ab_channel=GTCoding
        $('.selected-thsr').on('click', function () {
          let select_id = this.id == 'THSR_Origination_Selected' ? 'O_Station' : 'D_Station';
          $(`.options-container-thsr[id="${select_id}"]`).toggleClass('active');
          $(`.search-box-thsr[id="${select_id}"] input`).val = '';
          filterList("");
          if ($(`.options-container-thsr[id="${select_id}"]`).hasClass("active")) {
            $(`.search-box-thsr[id="${select_id}"] input`).focus();
          }
        });
      
        picker_Dom_O.delegate('.option', 'click' ,function () {
          let select_id = $(this).parent().attr('id');
          let select = select_id == 'O_Station' ? 'THSR_Origination_Selected' : 'THSR_Destination_Selected';
          $(`.selected-thsr[id="${select}"]`).html($(this).find('label').text());
          $(`.options-container-thsr[id="${select_id}"]`).removeClass('active');
        });

        picker_Dom_D.on('click', '.option',function () {
          let select_id = $(this).parent().attr('id');
          let select = select_id == 'O_Station' ? 'THSR_Origination_Selected' : 'THSR_Destination_Selected';
          $(`.selected-thsr[id="${select}"]`).html($(this).find('label').text());
          $(`.options-container-thsr[id="${select_id}"]`).removeClass('active');
        });


        $('.search-box-thsr input').on("keyup", function (e) {
          let search_id = $(this).parent().attr('id');
          filterList(e.target.value, search_id);
        });

        const filterList = function (searchTerm, id) {
          let option_List = $(`.options-container-thsr[id="${id}"] div.option`);
          for (let i = 0; i < option_List.length; i++) {
            let label = option_List.eq(i).find('label').text().toLowerCase();
            if (label.indexOf(searchTerm) != -1) {
              option_List.eq(i).css('display', 'block');
            } else {
              option_List.eq(i).css('display', 'none');
            }
          }
        };

  // 高鐵票價
  
  let THSR_Ticket_Search = function(index,O_id, D_id, Direction){
  let return_Text = '';
  let filter = `Direction eq ${Direction}`;
  $.ajax({
    url: `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/ODFare/${O_id}/to/${D_id}?$filter=${filter}&$format=JSON`,
    dataType: 'json',
    headers: GetAuthorizationHeader(),
    contentType: 'json',
    success: function (result) {
      Object.keys(result[0]['Fares']).forEach(function (value, key) {
          return_Text = return_Text + `
            <div class='fare_Item'>
              <h2>${result[0]['Fares'][value]['TicketType']}</h2>
              <h2>$${result[0]['Fares'][value]['Price']}</h2>
            </div>
          `;
        });
        
        $('div.single_Thsr_Time').eq(index).append(`
          <div class='fare_THRS_Container'>
            ${return_Text}
          </div>
          <hr>
        `);
      $('.fare_THRS_Container').hide();
    },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  }


  // 高鐵時刻
  let thsr_Result_Content = '';
  $('button#go_Time_Search_THSR').on('click', function () {
    $('span#spinner-THSR-Time').removeAttr("hidden");
    this.disabled = true;
    let thsr_Result = $('div#thsr_result');
    if(!thsr_Result.hasClass('text-center')){
      thsr_Result.addClass('text-center');
    }
    thsr_Result.html("載入中......");
    setTimeout(function () {
      if ($('#THSR_Origination_Selected').text().trim() == '請選擇起站' || $('#THSR_Destination_Selected').text().trim() == '請選擇迄站') {
        thsr_Result.html("");
        thsr_Result.append("<h2> ❗ 請確實填入站點資訊 ❗</h2>");
      }
      else {
        for (let index = 0; index < Thsr_Station_Info.length; index++) {
          if (Thsr_Station_Info[index]['StationName']['Zh_tw'] == $('#THSR_Origination_Selected').text()) {
            var station_ID_O = Thsr_Station_Info[index]['StationID'];
          }
          if (Thsr_Station_Info[index]['StationName']['Zh_tw'] == $('#THSR_Destination_Selected').text()) {
            var station_ID_D = Thsr_Station_Info[index]['StationID'];
          }
        }
        const Today = new Date()
        const date = Today.getDate() + 1 > 10 ? Today.getDate() : '0' + Today.getDate();
        const month = Today.getMonth() + 1 > 10 ? Today.getMonth() + 1 : '0' + (Today.getMonth() + 1);
        const year = Today.getFullYear()
        const nowDate = year + '-' + month + '-' + date;
        thsr_Result.html("");
        $.ajax({
          url: `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/${station_ID_O}/to/${station_ID_D}/${nowDate}?&$format=JSON`,
          dataType: "json",
          headers: GetAuthorizationHeader(),
          success: function (result) {
            if(result.length == 0){
              thsr_Result.html('<h2><i class="fas fa-exclamation-triangle mx-2" style="color: red;"></i>查無資料</h2>');
              return;
            }
            thsr_Result.removeClass('text-center');
            thsr_Result.html("");
            thsr_Result_Content = '';
            for (let index = 0; index < result.length; index++) {
              let train_No = result[index]['DailyTrainInfo']['TrainNo'];
              let startingStationName = result[index]['DailyTrainInfo']['StartingStationName']['Zh_tw'];
              let endingStationName = result[index]['DailyTrainInfo']['EndingStationName']['Zh_tw'];
              let O_stationName = result[index]['OriginStopTime']['StationName']['Zh_tw'];
              let O_DepartureTime = result[index]['OriginStopTime']['DepartureTime'];
              let D_stationName = result[index]['DestinationStopTime']['StationName']['Zh_tw'];
              let D_ArrivalTime = result[index]['DestinationStopTime']['ArrivalTime'];
              _startTime = O_DepartureTime.split(":");
              _endTime = D_ArrivalTime.split(":");
              var startDate = new Date(0, 0, 0, _startTime[0], _startTime[1], 0);
              var EndDate = new Date(0, 0, 0, _endTime[0], _endTime[1], 0);
              EndDate.setHours(EndDate.getHours() - startDate.getHours());
              EndDate.setMinutes(EndDate.getMinutes() - startDate.getMinutes());
              resultTime = EndDate.getHours() + "小時" + EndDate.getMinutes() + "分鐘";
              thsr_Result_Content = thsr_Result_Content + `
              <div class = 'single_Thsr_Time' >
                  <h2>日期: ${nowDate}</h2>
                  <h2><i class="fas fa-subway"></i>  No. ${train_No}</h2>
                  <h2>(${startingStationName}  →  ${endingStationName})</hw>
                  <h2>起站: <i class="far fa-clock" title="上車時間" style='color: blue'></i> ${O_DepartureTime}   ${O_stationName}</h2>
                  <h2>迄站: <i class="far fa-clock" title="下車時間" style='color: blue'></i> ${D_ArrivalTime}   ${D_stationName}</h2>
                  <h2>需花費: ${resultTime}</h2>
                  <h2><span class='badge bg-secondary' style ='cursor:pointer;' id='ticket_Show_THSR' data-num=${index} onclick=ticket_toggle_THSR(${index})>票價顯示 / 隱藏</span></h2>
              </div>
              `;
            THSR_Ticket_Search(index, station_ID_O, station_ID_D, result[index]['DailyTrainInfo']['Direction']);
          }
            thsr_Result.append(thsr_Result_Content);
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
          }
        });
      }
      $('span#spinner-THSR-Time').prop("hidden", true);
      $('button#go_Time_Search_THSR').prop("disabled", false);
    }, 1500);
  });



  ticket_toggle_THSR = function(num){
    let ticket_Show = $(`#ticket_Show_THSR[data-num='${num}']`);
      if(ticket_Show.hasClass('bg-secondary')){
        ticket_Show.removeClass('bg-secondary');
        ticket_Show.addClass('bg-success');
        $('div.fare_THRS_Container').eq(num).show(1000);
      }else if(ticket_Show.hasClass('bg-success')){
        ticket_Show.removeClass('bg-success');
        ticket_Show.addClass('bg-secondary');
        $('div.fare_THRS_Container').eq(num).hide(1000);
      }
    }

/* ========== 高鐵(End)=========== */





  /* ========== 旅遊=========== */

  let travel_Info;
  // 旅遊
  $('.container-travel .city_container').on('click', function () {
    // 換個縣市，就清空
    let travel_Category = []
    $('.category-List').html('');
    $('.category-Items').html('');

    let city_name = $(this).attr('id');
    let city_name_TW = $(this).attr('city_name_Tw');
    $('div.bus-loading').show();

    // 設立一個 Loading動畫的時間 : 1.5s
    setTimeout(function () {
      // console.log(Route_Select);
      // 當開始跑Loading時，不能再有任何動作
      $('div.bus-loading').hide();
      $('.container-travel').hide();
      $('div.travel_Category').show();
      $('h2.Travel_city_Name').html(city_name_TW);
    }, 1500);

    // 如果點選的是 Other
    if ($(this).attr('id') == 'Other') {
      $('.filter_City_List').show();
    } else {
      $('.filter_City_List').hide();
    }

    // 預設篩選單先呈現出來，還有顏色
    $('div.filter_Container').show();
    $('i#go_filter').css('color', '#8c7ae6');


    if ($(this).attr('id') != 'Other') {
      $.ajax({
        url: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/' + city_name + '?$format=JSON',
        dataType: 'json',
        contentType: 'json',
        headers: GetAuthorizationHeader(), // 憑證 API token
        success: function (result) {
          // console.log(result);
          travel_Info = $.parseJSON(JSON.stringify(result));
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
          });

          let category_content = '';
          for (let i = 0; i < travel_Category.length; i++) {
            category_content = category_content + `
            <span class="badge bg-secondary category_item" data-category="${travel_Category[i]}" >${travel_Category[i]}</span>
            `;
          }
          $('.category-List').append(category_content);

          $('.category-Items').append(`
              <div class="travel-item text-center">
              <h2 class="view_Name ">
                  無查詢到資料
              </h2>
              </div>`);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log(XMLHttpRequest);
          console.log(textStatus);
          console.log(errorThrown);
        }
      });
    }
  });

  $('span#city_filter').on('click', function () {
    travel_Category = []
    $('.category-List').html('');
    $('.category-Items').html('');
    $('.city-List *').removeClass('bg-danger');
    $('.city-List *').addClass('bg-secondary');
    if ($(this).hasClass('bg-danger')) {
      $(this).removeClass('bg-danger');
      $(this).addClass('bg-secondary');
    } else {
      $(this).removeClass('bg-secondary');
      $(this).addClass('bg-danger');
    }
    let city_name = $(this).attr('city_filter');
    $.ajax({
      url: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/' + city_name + '?$format=JSON',
      dataType: 'json',
      contentType: 'json',
      headers: GetAuthorizationHeader(),
      success: function (result) {
        travel_Info = $.parseJSON(JSON.stringify(result));
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
        });
        let category_content = '';
        for (let i = 0; i < travel_Category.length; i++) {
          category_content = category_content + `
            <span class="badge bg-secondary category_item" data-category="${travel_Category[i]}" >${travel_Category[i]}</span>
            `;
        }
        $('.category-List').append(category_content);

        $('.category-Items').append(`
        <div class="travel-item text-center">
        <h2 class="view_Name ">
            無查詢到資料
        </h2>
        </div>`);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  });



  let filter_isClicked;
  $('i#go_filter').on('click', function () {
    if (filter_isClicked) {
      $(this).css('color', '#8c7ae6');
      filter_isClicked = false;
      $('div.filter_Container_Travel').show(1000);
    } else {
      $(this).css('color', '#000');
      filter_isClicked = true;
      $('div.filter_Container_Travel').hide(1000);
    }
  });

  $('button.confirm_items').on('click', function () {
    if (filter_isClicked) {
      $('i#go_filter').css('color', '#8c7ae6');
      filter_isClicked = false;
      $('div.filter_Container_Travel').show(1000);
    } else {
      $('i#go_filter').css('color', '#000');
      filter_isClicked = true;
      $('div.filter_Container_Travel').hide(1000);
    }
  });



  open_Info = function (info_number) {
    let travel_info_Image = travel_Info[info_number]['Picture']['PictureUrl1'] ? ` <img src = "${travel_Info[info_number]['Picture']['PictureUrl1']}" alt ="${travel_Info[info_number]['Name']}照片"></img>
    <p class="fw-bolder mt-3">圖片提供：${travel_Info[info_number]['Picture']['PictureDescription1']}</p>` : '<p class="fw-bolder mt-3">尚未提供圖片</p>';

    $('#open_InfoLabel').html(travel_Info[info_number]["Name"]);
    $('div#open_info_body').html('');
    $('div#open_info_body').append(`
      <div class = "travel_Image_Container d-flex align-items-center m-3" style="flex-direction: column">
      ${travel_info_Image}
      </div>
      <div class = "travel_Describe_Container">
      <p class = "mx-3">${travel_Info[info_number]['DescriptionDetail']}</p>
      </div>
        `);
  }

  $('.category').on('click', 'i#go_View_Pos', function () {
    $('.category-Items .travel-item').css('background', '#dcdde1');
    $(this).parent().parent().css('background', '#ffeaa7');
    let Lat = $(this).attr('pos-Lat');
    let Lng = $(this).attr('pos-Lng');
    let position = [Lat, Lng];
    let fly_Marker_Content = `
      <h2>${$(this).attr("view")}</h2>
      <p>地址：<a href = "https://www.google.com.tw/maps/place/${$(this).parent().text()}/@${Lat},${Lng},17z" target="_blank" style="color: #0984e3">${$(this).parent().text()}</a></p>
      <p>聯絡電話：${travel_Info[$(this).attr("data-number")]['Phone']}</p>
      ${travel_Info[$(this).attr("data-number")]['WebsiteUrl'] ? `<p><a href = "${travel_Info[$(this).attr("data-number")]["WebsiteUrl"]}" target="_blank" style="color: #0984e3">網站連結：${travel_Info[$(this).attr("data-number")]["WebsiteUrl"]}</a></p>` : '<p>網站連結：尚未公開</p>'}
      <div class="d-flex justify-content-center">
      <button type="button" class = "btn btn-info mb-2 fw-bolder" onclick="open_Info('${$(this).attr("data-number")}')" data-bs-toggle="modal"  data-bs-target="#open_Info">查看介紹</button>
      </div>
      `;
    fly_To_Marker(Lat, Lng, fly_Marker_Content);
  });


  $('.travel_Category .go_city_Container').on('click', function () {
    $('div.bus-loading').show();
    setTimeout(function () {
      $('div.filter_Container').hide();
      $('i#go_filter').css('color', '#000');
      filter_isClicked = false;
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
    if ($(this).hasClass('bg-success')) {
      $(this).removeClass('bg-success');
      $(this).addClass('bg-secondary');
    } else {
      $(this).removeClass('bg-secondary');
      $(this).addClass('bg-success');
    }
    for (let i = 0; i < $('.category-List').children().length; i++) {
      if ($('.category-List').children().eq(i).hasClass('bg-success')) {
        choose_Items.push($('.category-List').children().eq(i).text());
      }
    }
    if (choose_Items.length > 0) {
      if ($('input.search-value').val()) {
        Object.keys(travel_Info).forEach(function (value, key) {
          let is_Span_1 = travel_Info[value]['Class1'] ? `<span class = "badge bg-success">${travel_Info[value]['Class1']}</span>` : "";
          let is_Span_2 = travel_Info[value]['Class2'] && travel_Info[value]['Class2'] !== travel_Info[value]['Class1'] ? `<span class = "badge bg-success">${travel_Info[value]['Class2']}</span>` : "";
          let is_Span_3 = travel_Info[value]['Class3'] && travel_Info[value]['Class3'] !== travel_Info[value]['Class2'] ? `<span class = "badge bg-success">${travel_Info[value]['Class3']}</span>` : "";
          if (choose_Items.includes(travel_Info[value]['Class1'])
            || choose_Items.includes(travel_Info[value]['Class2'])
            || choose_Items.includes(travel_Info[value]['Class3'])
            && (travel_Info[value]['Name'].includes($('input.search-value').val())
              || travel_Info[value]['Address'].includes($('input.search-value').val()))) {
            $('.category-Items').append(`
            <div class="travel-item" travel-id="${travel_Info[value]['ID']}">
              <h2 class="view_Name">${travel_Info[value]['Name']}
              </h2>
                  <div class ="view_Span">
                      ${is_Span_1}
                      ${is_Span_2}
                      ${is_Span_3}
                  </div>
              <h3 class="view_address">${travel_Info[value]['Address']}
                <i class="fas fa-location-arrow" id="go_View_Pos" title="前往該座標位置"  data-number = "${value}" pos-Lat="${travel_Info[value]["Position"]["PositionLat"]}" pos-Lng="${travel_Info[value]["Position"]["PositionLon"]}" view="${travel_Info[value]['Name']}"></i>
              </h3>
              <h3 class="view_opentime">
                  <i class="far fa-clock" title="開放時間"></i>
                  ${travel_Info[value]['OpenTime'] != 'N/A' || travel_Info[value]['OpenTime'] ? travel_Info[value]['OpenTime'] : "未公開"}
              </h3>
              </div>`);
          }
        })
      }
      else {
        Object.keys(travel_Info).forEach(function (value, key) {
          let is_Span_1 = travel_Info[value]['Class1'] ? `<span class = "badge bg-success">${travel_Info[value]['Class1']}</span>` : "";
          let is_Span_2 = travel_Info[value]['Class2'] && travel_Info[value]['Class2'] !== travel_Info[value]['Class1'] ? `<span class = "badge bg-success">${travel_Info[value]['Class2']}</span>` : "";
          let is_Span_3 = travel_Info[value]['Class3'] && travel_Info[value]['Class3'] !== travel_Info[value]['Class2'] ? `<span class = "badge bg-success">${travel_Info[value]['Class3']}</span>` : "";
          if (choose_Items.includes(travel_Info[value]['Class1'])
            || choose_Items.includes(travel_Info[value]['Class2'])
            || choose_Items.includes(travel_Info[value]['Class3'])) {
            $('.category-Items').append(`
                <div class="travel-item" travel-id="${travel_Info[value]['ID']}">
                  <h2 class="view_Name">${travel_Info[value]['Name']}</h2>
                  <div class ="view_Span">
                      ${is_Span_1}
                      ${is_Span_2}
                      ${is_Span_3}
                  </div>
                  <h3 class="view_address">${travel_Info[value]['Address']}
                    <i class="fas fa-location-arrow" id="go_View_Pos" title="前往該座標位置" data-number = "${value}" pos-Lat="${travel_Info[value]["Position"]["PositionLat"]}" pos-Lng="${travel_Info[value]["Position"]["PositionLon"]}" view="${travel_Info[value]['Name']}"></i>
                  </h3>
                  <h3 class="view_opentime">
                      <i class="far fa-clock" title="開放時間"></i>
                      ${travel_Info[value]['OpenTime'] != 'N/A' || travel_Info[value]['OpenTime'] ? travel_Info[value]['OpenTime'] : "未公開"}
                  </h3>
                  </div>`);
          }
        })
      }
    } else {
      $('.category-Items').append(`
          <div class="travel-item text-center">
            <h2 class="view_Name ">
                無查詢到資料
            </h2>
            </div>`);
    }
  });

  // 全選按鈕
  $('button.all_choose_items').on('click', function () {
    $('.category-Items').html('');
    $('.category-List *').removeClass('bg-secondary');
    $('.category-List *').addClass('bg-success');
    Object.keys(travel_Info).forEach(function (value, key) {
      let is_Span_1 = travel_Info[value]['Class1'] ? `<span class = "badge bg-success">${travel_Info[value]['Class1']}</span>` : "";
      let is_Span_2 = travel_Info[value]['Class2'] && travel_Info[value]['Class2'] !== travel_Info[value]['Class1'] ? `<span class = "badge bg-success">${travel_Info[value]['Class2']}</span>` : "";
      let is_Span_3 = travel_Info[value]['Class3'] && travel_Info[value]['Class3'] !== travel_Info[value]['Class2'] ? `<span class = "badge bg-success">${travel_Info[value]['Class3']}</span>` : "";
      $('.category-Items').append(`
          <div class="travel-item" travel-id="${travel_Info[value]['ID']}">
            <h2 class="view_Name">${travel_Info[value]['Name']}</h2>
            <div class ="view_Span">
                ${is_Span_1}
                ${is_Span_2}
                ${is_Span_3}
            </div>
            <h3 class="view_address">${travel_Info[value]['Address']}
              <i class="fas fa-location-arrow" id="go_View_Pos" title="前往該座標位置"  data-number = "${value}" pos-Lat="${travel_Info[value]["Position"]["PositionLat"]}" pos-Lng="${travel_Info[value]["Position"]["PositionLon"]}" view="${travel_Info[value]['Name']}"></i>
            </h3>
            <h3 class="view_opentime">
                <i class="far fa-clock" title="開放時間"></i>
                ${travel_Info[value]['OpenTime'] != 'N/A' ? travel_Info[value]['OpenTime'] : "未公開"}
            </h3>
            </div>`);
    })

  });

  // 清除按鈕
  $('button.clear_items').on('click', function () {
    choose_Items = [];
    $('.category-Items').html('');
    $('.category-List *').removeClass('bg-success');
    $('.category-List *').addClass('bg-secondary');
    $('.category-Items').append(`
    <div class="travel-item text-center">
      <h2 class="view_Name ">
          無查詢到資料
      </h2>
      </div>`);
  });

  $('input.search-value').on('input', function () {
    let input_Val = $(this).val();
    if (input_Val) {
      $('.category-Items').html('');
      Object.keys(travel_Info).forEach(function (value, key) {
        let is_Span_1 = travel_Info[value]['Class1'] ? `<span class = "badge bg-success">${travel_Info[value]['Class1']}</span>` : "";
        let is_Span_2 = travel_Info[value]['Class2'] && travel_Info[value]['Class2'] !== travel_Info[value]['Class1'] ? `<span class = "badge bg-success">${travel_Info[value]['Class2']}</span>` : "";
        let is_Span_3 = travel_Info[value]['Class3'] && travel_Info[value]['Class3'] !== travel_Info[value]['Class2'] ? `<span class = "badge bg-success">${travel_Info[value]['Class3']}</span>` : "";
        if (travel_Info[value]['Name'].includes($('input.search-value').val()) || travel_Info[value]['Address'].includes($('input.search-value').val())) {
          $('.category-Items').append(`
          <div class="travel-item" travel-id="${travel_Info[value]['ID']}">
              <h2 class="view_Name">${travel_Info[value]['Name']}</h2>
              <div class ="view_Span">
                  ${is_Span_1}
                  ${is_Span_2}
                  ${is_Span_3}
              </div>
            <h3 class="view_address">${travel_Info[value]['Address']}
              <i class="fas fa-location-arrow" id="go_View_Pos" title="前往該座標位置"  data-number = "${value}" pos-Lat="${travel_Info[value]["Position"]["PositionLat"]}" pos-Lng="${travel_Info[value]["Position"]["PositionLon"]}" view="${travel_Info[value]['Name']}"></i>
            </h3>
            </div>`);
        }
      })
    } else {
      Object.keys(travel_Info).forEach(function (value, key) {
        let is_Span_1 = travel_Info[value]['Class1'] ? `<span class = "badge bg-success">${travel_Info[value]['Class1']}</span>` : "";
        let is_Span_2 = travel_Info[value]['Class2'] && travel_Info[value]['Class2'] !== travel_Info[value]['Class1'] ? `<span class = "badge bg-success">${travel_Info[value]['Class2']}</span>` : "";
        let is_Span_3 = travel_Info[value]['Class3'] && travel_Info[value]['Class3'] !== travel_Info[value]['Class2'] ? `<span class = "badge bg-success">${travel_Info[value]['Class3']}</span>` : "";
        $('.category-Items').append(`
            <div class="travel-item" travel-id="${travel_Info[value]['ID']}">
              <h2 class="view_Name">${travel_Info[value]['Name']}</h2>
              <div class ="view_Span">
                  ${is_Span_1}
                  ${is_Span_2}
                  ${is_Span_3}
              </div>
              <h3 class="view_address">${travel_Info[value]['Address']}
                <i class="fas fa-location-arrow" id="go_View_Pos" title="前往該座標位置"  data-number = "${value}" pos-Lat="${travel_Info[value]["Position"]["PositionLat"]}" pos-Lng="${travel_Info[value]["Position"]["PositionLon"]}" view="${travel_Info[value]['Name']}"></i>
              </h3>
              </div>`);
      })
    }
  });
  /* ========== 旅遊(End)=========== */



  /* ========== 美食=========== */
  let restaurant_Info;
  $('.container-food .city_container').on('click', function () {
    $('.Food-category-List').html('');
    $('.Food-category-Items').html('');

    let city_name = $(this).attr('id');
    let city_name_TW = $(this).attr('city_name_Tw');
    $('div.bus-loading').show();

    // 設立一個 Loading動畫的時間 : 1.5s
    setTimeout(function () {
      // 當開始跑Loading時，不能再有任何動作
      $('div.bus-loading').hide();
      $('.container-food').hide();
      $('div.food_Category').show();
      $('h2.Food_city_Name').html(city_name_TW);
    }, 1500);

    // 如果點選的是 Other
    if ($(this).attr('id') == 'Other') {
      $('.filter_Container_Food').show();
      $('#go_filter_food').show();
      return;
    } else {
      $('.filter_Container_Food').hide();
      $('#go_filter_food').hide();
    }

    // 預設篩選單先呈現出來，還有顏色
    $('div.filter_Container').show();
    $('i#go_filter_food').css('color', '#8c7ae6');

    if ($(this).attr('id') != 'Other') {
      let select = 'Name,Address,Description,Phone,OpenTime,WebsiteUrl,Position,Picture';
      $.ajax({
        url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/${city_name}/?$select=${select}&$format=JSON`,
        dataType: 'json',
        contentType: 'json',
        headers: GetAuthorizationHeader(), // 憑證 API token
        success: function (result) {
          restaurant_Info = $.parseJSON(JSON.stringify(result));
          let food_Items_Content = '';
          Object.keys(result).forEach(function (value, key) {
            food_Items_Content = food_Items_Content + `
              <div class="food-item">
              <h2 class="restaurant_Name">
                <span class='badge bg-warning mx-1'>
                  <i class="fas fa-utensils" style='color: green'></i>   
                </span>
              ${result[value]["Name"]}
              </h2>
                <h3 class="food_address my-1">
                    地址：${result[value]["Address"]}
                    <i class="fab fa-telegram-plane" id = 'go_Restaurant_Pos' data-num = '${value}' lat='${result[value]["Position"]["PositionLat"]}' 
                    lng = '${result[value]["Position"]["PositionLon"]}' style='color: blue; font-size:18px; cursor:pointer;'></i>
                </h3>
                <h3 class="view_opentime my-1">
                    <i class="far fa-clock" title="開放時間"></i>
                    ${result[value]['OpenTime'] != 'N/A' || result[value]['OpenTime'] ? result[value]['OpenTime'] : "未公開"}
                </h3>
              </div>
            `;
          });
          $('.Food-category-Items').append(food_Items_Content);

        },
        // 當Ajax請求失敗
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log(XMLHttpRequest);
          console.log(textStatus);
          console.log(errorThrown);
        }
      });
    }
  });
  let filter_isClicked_Food;
  $('i#go_filter_food').on('click', function () {
    if (filter_isClicked_Food) {
      $(this).css('color', '#8c7ae6');
      filter_isClicked_Food = false;
      $('div.filter_Container_Food').show(1000);
    } else {
      $(this).css('color', '#000');
      filter_isClicked_Food = true;
      $('div.filter_Container_Food').hide(1000);
    }
    console.log(filter_isClicked_Food);
  });


  $('span#city_filter_food').on('click', function () {
    $('.Food-category-Items').html('');
    $('.city-List *').removeClass('bg-danger');
    $('.city-List *').addClass('bg-secondary');
    if ($(this).hasClass('bg-danger')) {
      $(this).removeClass('bg-danger');
      $(this).addClass('bg-secondary');
    } else {
      $(this).removeClass('bg-secondary');
      $(this).addClass('bg-danger');
    }
    let city_name = $(this).attr('city_filter');
    let select = 'Name,Address,Description,Phone,OpenTime,WebsiteUrl,Position,Picture';
    $.ajax({
      url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/${city_name}?$select=${select}&$format=JSON`,
      dataType: 'json',
      contentType: 'json',
      headers: GetAuthorizationHeader(),
      success: function (result) {
        restaurant_Info = $.parseJSON(JSON.stringify(result));
        let food_Items_Content = '';
        Object.keys(result).forEach(function (value, key) {
          food_Items_Content = food_Items_Content + `
            <div class="food-item">
            <h2 class="restaurant_Name">
              <span class='badge bg-warning mx-1'>
                <i class="fas fa-utensils" style='color: green'></i>   
              </span>
            ${result[value]["Name"]}
            </h2>
            <h3 class="food_address my-1">
                地址：${result[value]["Address"]}
                <i class="fab fa-telegram-plane" id = 'go_Restaurant_Pos' data-num = '${value}' lat='${result[value]["Position"]["PositionLat"]}' 
                lng = '${result[value]["Position"]["PositionLon"]}' style='color: blue; font-size:18px; cursor:pointer;'></i>
            </h3>
            <h3 class="view_opentime my-1">
                <i class="far fa-clock" title="開放時間"></i>
                ${result[value]['OpenTime'] != 'N/A' || result[value]['OpenTime'] ? result[value]['OpenTime'] : "未公開"}
            </h3>

            </div>
          `;
        });
        $('.Food-category-Items').append(food_Items_Content);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  });

  $('.Food-category-Items').on('click', 'i#go_Restaurant_Pos', function () {
    $('.Food-category-Items .food-item').css('background', '#dcdde1');
    $(this).parent().parent().css('background', '#ffeaa7');
    let Lat = $(this).attr('lat');
    let Lng = $(this).attr('lng');
    let data_Num = $(this).attr('data-num');
    let web = restaurant_Info[data_Num]['WebsiteUrl'] != undefined ? `<a href = "${restaurant_Info[data_Num]['WebsiteUrl']}" target="_blank" style="color: #0984e3">${restaurant_Info[data_Num]['WebsiteUrl']}</a>` : `尚未公開`;
    let fly_Marker_Content = `
      <h2>${restaurant_Info[data_Num]['Name']}</h2>
      <p>地址： <a href = "https://www.google.com.tw/maps/place/${restaurant_Info[data_Num]['Address']}/@${Lat},${Lng},17z" target="_blank" style="color: #0984e3">${restaurant_Info[data_Num]['Address']}</a></p>
      <p>店家網站：${web}</p>
      <div class="d-flex justify-content-center">
      <button type="button" id='food_Modal' onclick='open_Info_Food(${data_Num})'  class = "btn btn-info mb-2 fw-bolder" data-bs-toggle="modal"  data-bs-target="#open_Info">查看介紹</button>
      </div>
      `;
    fly_To_Marker(Lat, Lng, fly_Marker_Content);
  });


  open_Info_Food = function (info_number) {
    console.log(restaurant_Info);

    $('#open_InfoLabel').html(restaurant_Info[info_number]["Name"]);
    $('div#open_info_body').html('');
    $('div#open_info_body').append(`
        <div class = "travel_Describe_Container" style= 'width: 100%;'>
        <p class = "mx-3">${restaurant_Info[info_number]['Description']}</p>
        </div>

        `);
  }



  $('input.search-food').on('input', function () {
    let input_Val = $(this).val();
    if (input_Val) {
      $('.Food-category-Items').html('');
      let food_Items_Content = '';
      Object.keys(restaurant_Info).forEach(function (value, key) {
        if (restaurant_Info[value]['Name'].includes($('input.search-food').val()) || restaurant_Info[value]['Address'].includes($('input.search-food').val())) {
          food_Items_Content = food_Items_Content + `
            <div class="food-item">
            <h2 class="restaurant_Name">
              <span class='badge bg-warning mx-1'>
                <i class="fas fa-utensils" style='color: green'></i>   
              </span>
            ${restaurant_Info[value]["Name"]}
            </h2>
            <h3 class="food_address my-1">
                地址：${restaurant_Info[value]["Address"]}
                <i class="fab fa-telegram-plane" id = 'go_Restaurant_Pos' data-num = '${value}' lat='${restaurant_Info[value]["Position"]["PositionLat"]}' 
                lng = '${restaurant_Info[value]["Position"]["PositionLon"]}' style='color: blue; font-size:18px; cursor:pointer;'></i>
            </h3>
            <h3 class="view_opentime my-1">
                <i class="far fa-clock" title="開放時間"></i>
                ${restaurant_Info[value]['OpenTime'] != 'N/A' || restaurant_Info[value]['OpenTime'] ? restaurant_Info[value]['OpenTime'] : "未公開"}
            </h3>

            </div>
          `;
        }
      });
      $('.Food-category-Items').append(food_Items_Content);

    } else {
      let food_Items_Content = '';
      Object.keys(restaurant_Info).forEach(function (value, key) {
        food_Items_Content = food_Items_Content + `
            <div class="food-item">
            <h2 class="restaurant_Name">
              <span class='badge bg-warning mx-1'>
                <i class="fas fa-utensils" style='color: green'></i>   
              </span>
            ${restaurant_Info[value]["Name"]}
            </h2>
            <h3 class="food_address my-1">
                地址：${restaurant_Info[value]["Address"]}
                <i class="fab fa-telegram-plane" id = 'go_Restaurant_Pos' data-num = '${value}' lat='${restaurant_Info[value]["Position"]["PositionLat"]}' 
                lng = '${restaurant_Info[value]["Position"]["PositionLon"]}' style='color: blue; font-size:18px; cursor:pointer;'></i>
            </h3>
            <h3 class="view_opentime my-1">
                <i class="far fa-clock" title="開放時間"></i>
                ${restaurant_Info[value]['OpenTime'] != 'N/A' || restaurant_Info[value]['OpenTime'] ? restaurant_Info[value]['OpenTime'] : "未公開"}
            </h3>

            </div>
          `;
      });
      $('.Food-category-Items').append(food_Items_Content);
    }
  });


  $('button.confirm_food').on('click', function () {
    if (filter_isClicked_Food) {
      $('i#go_filter_food').css('color', '#8c7ae6');
      filter_isClicked_Food = false;
      $('div.filter_Container_Food').show(1000);
    } else {
      $('i#go_filter_food').css('color', '#000');
      filter_isClicked_Food = true;
      $('div.filter_Container_Food').hide(1000);
    }
  });


  $('.food_Category .go_city_Container').on('click', function () {
    $('div#food_Load').show();
    // 設立一個 Loading動畫的時間 : 1.5s
    setTimeout(function () {
      // 篩選要清空
      $('div.filter_Container').hide();
      $('i#go_filter').css('color', '#000');
      filter_isClicked = false;

      $('div#food_Load').hide();
      $('div.food_Category').hide();
      $('.container-food').show();
    }, 1500);
  });


  /* ========== 美食(End)=========== */










  /* ==========  公車 =========== */

  // 取得目前公車位於哪個站點
  let get_CurrentBus_Stop = function (city, route_id, direct) {
    $('h2#stop_Name span#current_bus').html('');
    $.ajax({
      url: `https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeNearStop/City/${city}?$select=PlateNumb,StopName&$filter=RouteUID eq '${route_id}' AND Direction eq ${direct}&$format=JSON`,
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
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  }



  // 得到目前公車的座標
  let bus_Now_Pos = L.layerGroup().addTo(map);
  let get_CurrentBus_Pos = function (city, route_id, direct) {
    $.ajax({
      url: `https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeByFrequency/City/${city}?$select=BusPosition,PlateNumb&$filter=RouteUID eq '${route_id}' AND Direction eq ${direct}&$format=JSON`,
      dataType: 'json',
      contentType: 'json',
      headers: GetAuthorizationHeader(), // 憑證 API token
      success: function (result) {
        Object.keys(result).forEach(function (value, key) {
          let busNow_Lon = result[value]['BusPosition']['PositionLon'];
          let busNow_Lat = result[value]['BusPosition']['PositionLat'];
          L.marker(
            [busNow_Lat, busNow_Lon], {
            icon: L.AwesomeMarkers.icon({
              markerColor: 'purple',
              prefix: 'fa',
              icon: 'bus'
            })
          }).addTo(bus_Now_Pos).bindPopup(`
            <div>
              <h2>目前公車位置
                <span class = "badge bg-success">${result[value]['PlateNumb']}</span>
              </h2>
              <p>經度：${busNow_Lat}</p>
              <p>緯度：${busNow_Lon}</p>
            </div>
            `);
        });
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  }


  // 自動更新公車時刻表
  bus_update_Time = function (city_name, route_UID, direct) {
    let select = `Direction,PlateNumb,NextBusTime,EstimateTime,StopName`;
    let Tainan_Swith = direct == 0 ? '1' : '2';
    let filter = city_name == 'Tainan' ? `RouteUID eq '${route_UID}' AND (endswith(SubRouteUID,'${Tainan_Swith}') OR StopStatus ge 2)` : `RouteUID eq '${route_UID}' AND Direction eq ${direct}`;
    $.ajax({
      url: `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${city_name}/?$select=${select}&$filter=${filter}&$format=JSON`,
      dataType: 'json',
      contentType: 'json',
      headers: GetAuthorizationHeader(),
      success: function (result) {
        let estimateTime_Status;
        let is_Record = [];
        Object.keys(result).forEach(function (value, key) {
          // console.log(result[value]['StopName']['Zh_tw'] + ": " + parseInt(result[value]['EstimateTime'] / 60) + "分" );
          let stopName = result[value]['StopName']['Zh_tw'];
          if (total_Stops.includes(stopName)) {
            if (result[value]['EstimateTime'] != null) {
              is_Record.push(stopName);
              let estimateTime = result[value]['EstimateTime'];
              var indices = [];
              var idx = total_Stops.indexOf(stopName);
              while (idx != -1) {
                indices.push(idx);
                idx = total_Stops.indexOf(stopName, idx + 1);
              }
              if (indices.length > 1) {
                for (let i = 1; i < indices.length; i++) {
                  if (result[i]['EstimateTime'] < estimateTime) {
                    estimateTime = result[i]['EstimateTime'];
                  }
                }
              }
              if (parseInt(estimateTime / 60) == 0) {
                estimateTime_Status = "進站中";
                $(`span[data-stopName = "${stopName}"]`).removeClass("bg-secondary");
                $(`span[data-stopName = "${stopName}"]`).removeClass("bg-success");
                $(`span[data-stopName = "${stopName}"]`).addClass("bg-danger");
              } else if (parseInt(estimateTime / 60) <= 3) {
                estimateTime_Status = "即將進站";
                $(`span[data-stopName = "${stopName}"]`).removeClass("bg-secondary");
                $(`span[data-stopName = "${stopName}"]`).removeClass("bg-success");
                $(`span[data-stopName = "${stopName}"]`).addClass("bg-warning");
              } else {
                estimateTime_Status = parseInt(estimateTime / 60) + "分";
              }

            }
            else if (result[value]['StopStatus'] == 1) {
              estimateTime_Status = result[value]['NextBusTime'] ? result[value]['NextBusTime'].substr(result[value]['NextBusTime'].indexOf("T") + 1, 5) : "尚未發車";
              $(`span[data-stopName = "${stopName}"]`).removeClass("bg-success");
              $(`span[data-stopName = "${stopName}"]`).removeClass("bg-secondary");
              $(`span[data-stopName = "${stopName}"]`).addClass("bg-secondary ");
            }
            else if (result[value]['StopStatus'] == 2) {
              estimateTime_Status = "此站不停靠";
              $(`span[data-stopName = "${stopName}"]`).removeClass("bg-success");
              $(`span[data-stopName = "${stopName}"]`).removeClass("bg-secondary");
              $(`span[data-stopName = "${stopName}"]`).addClass("bg-secondary ");
            }
            else if (result[value]['StopStatus'] == 3) {
              if (is_Record.indexOf(stopName) != '-1') {
                return;
              }
              estimateTime_Status = "末班已駛";
              $(`span[data-stopName = "${stopName}"]`).removeClass("bg-secondary");
              $(`span[data-stopName = "${stopName}"]`).removeClass("bg-success");
              $(`span[data-stopName = "${stopName}"]`).addClass("bg-secondary ");
            }
            else if (result[value]['StopStatus'] == 4) {
              estimateTime_Status = "今日停駛";
              $(`span[data-stopName = "${stopName}"]`).removeClass("bg-secondary");
              $(`span[data-stopName = "${stopName}"]`).removeClass("bg-success");
              $(`span[data-stopName = "${stopName}"]`).addClass("bg-secondary ");
            }
            $(`span[data-stopName = "${stopName}"]`).html(`${estimateTime_Status}`);
          }
        });
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  };


  // 取得該路線的起站、迄站
  stop_Start_End = function (city_name, route_UID) {
    let select = `RouteUID,DepartureStopNameZh,DestinationStopNameZh`;
    let filter = `RouteUID eq '${route_UID}'`;
    $.ajax({
      url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city_name}/?$select=${select}&$filter=${filter}&$format=JSON`,
      dataType: 'json',
      contentType: 'json',
      headers: GetAuthorizationHeader(),
      success: function (result) {
        $(`button[data-direct = '0']`).html('往' + result[0]['DestinationStopNameZh']);
        $(`button[data-direct = '1']`).html('往' + result[0]['DepartureStopNameZh']);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  }



  let total_Stops = [];
  let total_Stops_id = [];
  let marker_BusStop_Arr = new L.layerGroup();
  let polyLine_Bus = new L.layerGroup();

  // 透過點擊來顯現公車內容
  click_bus_info = function (city, route, route_id, direct) {
    window.estimate_Bus = setTimeout(function () {
      clearInterval(window.update_busInfo);
      clearInterval(window.countDown);
      $(`div#r_${route_id}`).html('');
      $(`div#r_${route_id}`).append(`
            <div class="timer-container">
              <span class="timer badge rounded-pill bg-secondary" count-timer='${route_id}'></span>
              <button id="goToMap" class="btn btn-light m-1 fw-bolder border border-dark" title="導覽到該公車路線上">
                <i class="fas fa-map-marker-alt" style='font-size: 24px; color: red;'></i>
              </button> 
              <button id="redo_bus" class="btn btn-success m-1 fw-bolder">
                <i class="fas fa-redo"" style='font-size: 24px;'></i>
              </button> 
            </div>
            `);
      let update_Time = 15;
      function updateCountdown() {
        if (update_Time <= 0) {
          update_Time = 15;
        }
        update_Time--;
        $(`span[count-timer="${route_id}"]`).html('下次更新時間: ' + update_Time);
      }

      let is_show = $(`button[data-route="${route_id}"]`).hasClass('collapsed');
      marker_BusStop_Arr.clearLayers();
      map.removeLayer(polyLine_Bus);
      bus_Now_Pos.clearLayers();

      if (!is_show) {
        window.countDown = setInterval(updateCountdown, 1000);
        window.update_busInfo = setInterval(function () {
          click_bus_info(city, route, route_id, direct);
          get_CurrentBus_Stop(city, route_id, direct);
          get_CurrentBus_Pos(city, route_id, direct);
        }, update_Time * 1000);

        let select = `RouteUID,RouteName,Direction,Stops,SubRouteUID`;
        let filter = `RouteUID eq '${route_id}' AND Direction eq ${direct}`;
        $.ajax({
          url: `https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/${city}?$select=${select}&$filter=${filter}&$format=JSON`,
          dataType: 'json',
          contentType: 'json',
          headers: GetAuthorizationHeader(),
          success: function (result) {
            if (Object.keys(result).length > 0) {
              total_Stops = [];
              total_Stops_id = [];
              let bus_Route_UID;
              let maxLength = 0;
              let max_index = 0;
              Object.keys(result).forEach(function (value, key) {
                bus_Route_UID = result[value]['RouteUID'];
                let bus_Route_len = result[value]['Stops'].length;
                if (maxLength < bus_Route_len) {
                  maxLength = bus_Route_len;
                  max_index = value;
                }
              });

              let point_arr = [];
              for (let i = 0; i < maxLength; i++) {
                let stopName = result[max_index]['Stops'][i]['StopName']['Zh_tw'];
                let stopName_id = result[max_index]['Stops'][i]['StopID'];
                let busStop_lat = result[max_index]['Stops'][i]['StopPosition']['PositionLat'];
                let busStop_lon = result[max_index]['Stops'][i]['StopPosition']['PositionLon'];

                point_arr.push(new L.LatLng(busStop_lat, busStop_lon));
                var geojsonFeature = {
                  "type": "Feature",
                  "properties": {
                    "name": `${i + 1}. ${stopName}`,
                    'category': '公車',
                    "latitude": busStop_lat,
                    "longitude": busStop_lon,
                  },
                  "geometry": {
                    "type": "Point",
                    "coordinates": [busStop_lon, busStop_lat]
                  }
                };

                let color_Marker = direct == 0 ? 'cadetblue' : 'orange';
                L.geoJSON(geojsonFeature, {
                  onEachFeature: onEachFeature,
                  pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {
                      icon: L.AwesomeMarkers.icon({
                        markerColor: color_Marker,
                        prefix: 'fa',
                        icon: 'sign'
                      })
                    });
                  },
                }).addTo(marker_BusStop_Arr);

                if (!total_Stops.includes(stopName)) {
                  total_Stops.splice(i, 0, stopName);
                  total_Stops_id.splice(i, 0, stopName_id);
                }
              }

              marker_BusStop_Arr.addTo(map);
              polyLine_Bus = new L.Polyline(point_arr, {
                smoothFactor: 1,
                className: 'bus_polyline'
              }).addTo(map);

              $(`div#r_${route_id}`).append(`
                <div id='${bus_Route_UID}'>
                  <button id="bus_update_Direct" data-direct = '0' class="btn ${direct == 0 ? "btn-primary" : "btn-secondary"} m-1 fw-bolder"></button>
                  <button id="bus_update_Direct" data-direct = '1' class="btn ${direct == 1 ? "btn-warning" : "btn-secondary"} m-1 fw-bolder"></button>
                </div>
                `);

              let str_total_Stops = '';
              for (let i = 0; i < total_Stops.length; i++) {
                str_total_Stops = str_total_Stops +
                  `<h2 id = "stop_Name" data-stopName = "${total_Stops[i]}" data-stopID="${total_Stops_id[i]}">
                        <span class = "badge bg-success" data-stopName = "${total_Stops[i]}"></span>
                        ${total_Stops[i]}
                    </h2>`;
              }
              $(`div#${bus_Route_UID}`).append(str_total_Stops);



              bus_update_Time(city_name = city, routeUID = route_id, direct = direct);
              // setTimeout(function(){
              get_CurrentBus_Stop(city, route_id, direct);
              get_CurrentBus_Pos(city, route_id, direct);
              // }, 1500);

              // 到座標點的範圍內
              $('button#goToMap').on('click', function () {
                let start_Lat = result[max_index]['Stops'][0]['StopPosition']['PositionLat'];
                let start_Lng = result[max_index]['Stops'][0]['StopPosition']['PositionLon'];
                let end_Lat = result[max_index]['Stops'][maxLength - 1]['StopPosition']['PositionLat'];
                let end_Lng = result[max_index]['Stops'][maxLength - 1]['StopPosition']['PositionLon'];
                map.fitBounds([
                  [start_Lat, start_Lng],
                  [end_Lat, end_Lng]
                ]);
              });

              // 重新整理
              $(`div#r_${route_id}`).on('click', 'button#redo_bus', function () {
                clearTimeout(window.estimate_Bus);
                click_bus_info(city, route, route_id, direct);
              });
            } else {
              $(`div#r_${route_id}`).append(`
                <div>
                <button id="bus_update_Direct" data-direct = '0' class="btn ${direct == 0 ? "btn-primary" : "btn-secondary"} m-1 fw-bolder"></button>
                <button id="bus_update_Direct" data-direct = '1' class="btn ${direct == 1 ? "btn-primary" : "btn-secondary"} m-1 fw-bolder"></button>
                </div>    
                <!-- body -->
                <div class = "alert alert-warning fade show d-flex justify-content-center" role = "alert" >
                    <div id='home_result' class = "alert-body text-center">目前並未提供該路線的查詢</div>
                    <!--<p><button onclick="addUser()">add user</button></b>--!>
                </div>
                `);
            }
            // 顯示起站 / 迄站
            stop_Start_End(city, route_id);
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
          }
        });
      }
    }, 1000);
    // 透過點擊來更換公車路線
    $(`div#r_${route_id}`).on('click', 'button#bus_update_Direct', function () {
      let this_direct = $(this).attr('data-direct');
      clearTimeout(window.estimate_Bus);
      click_bus_info(city, route, route_id, this_direct);
    });
  };



  let route = [];
  let route_id = [];
  let route_start = [];
  let route_last = [];
  let master_City = ['Taipei', 'NewTaipei', 'Taoyuan', 'Taichung', 'Tainan', 'Kaohsiung'];
  // 取得各縣市公車的路線資訊
  let get_bus_info = function (city) {
    route = [];
    route_id = [];
    route_start = [];
    route_last = [];
    let select = `RouteUID,RouteName,DepartureStopNameZh,DestinationStopNameZh`;
    let orderBy = `RouteName/Zh_tw ASC`;
    $.ajax({
      url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city}?$select=${select}&$orderby=${orderBy}&$format=JSON`,
      dataType: 'json',
      contentType: 'json',
      headers: GetAuthorizationHeader(),
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
        if (!master_City.includes(city)) {
          $('div.list-route-group').html('');
          let list_BusRoute_Content ;
          for (let i = 0; i < route.length; i++) {
            list_BusRoute_Content = list_BusRoute_Content +
              `<div class="accordion-item" >
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c_${i}" aria-expanded="true" aria-controls="c_${i}" data-route="${route_id[i]}" onclick=click_bus_info('${city}','${route[i].replace(" ", "")}','${route_id[i]}',0)>
                  ${route[i]} (${route_start[i]} - ${route_last[i]})
                  </button>
                </h2>

                <div id="c_${i}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body" id='r_${route_id[i]}'>
                  </div>
                </div>
              </div>`;
          }
          $('.list-route-group').append(list_BusRoute_Content);
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  }


  let Route_Select = [];
  $('div.card').on('click', function () {
    let data_city = $(this).attr('data-city');
    let city_Name = $(this).children('p').text();
    $('div.bus-loading').show();
    $("div.card").prop("disabled", "disabled");
    $(".Bus-City-info *:not(.bus-loading):not(.bus-loading *)").addClass('bus-loading-mask');
    $(this).removeClass('bus-loading-mask');
    setTimeout(function () {
      if (data_city !== 'Other') {
        get_bus_info(data_city);
      }
      $('div.Bus-City-info').hide();
      $('h2#city_Name').text(city_Name);
      $('div.bus_Routes').removeClass('bus_Routes_active');
      $(`div[city_name_EN = '${data_city}']`).addClass('bus_Routes_active');
      $('.list-route-group').html('');
      for (let i = 0; i < $('.bus_Routes_active').children().length; i++) {
        Route_Select.push($('.bus_Routes_active').children().eq(i).attr('route_info')); // <span>
      }
      $(".Bus-City-info *").removeClass('bus-loading-mask');
      $("div.card").prop("disabled", "false");
      $('div.bus-loading').hide();
      $('div.singleCity').show();
    }, 1500);
  });

  // 路線選擇(無其他)
  $('.bus_Routes:not([city_name_EN="Other"]) span').on('click', function () {
    $('div.list-route-group').html('');
    $('.bus_Routes_active *').css('background-color', '#fff');
    $(this).css('background-color', '#686de0');

    for (let i = 0; i < route.length; i++) {
      let route_filter = $(this).attr('getroute-first') ? route[i].includes($(this).attr('route_info')) : route[i].substr(0, 1) == $(this).attr('route_info');
      if (route_filter) {
        $('.list-route-group').append(`
        <div class="accordion-item" >
          <h2 class="accordion-header" id="headingOne">
          <!-- replace(" ","")是因為一些路線名稱的問題，像是黃11 小黃公車 --!>
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c_${i}" aria-expanded="true" aria-controls="c_${i}" data-route="${route_id[i]}" onclick=click_bus_info('${$(this).parent().attr('city_name_EN')}','${route[i].replace(" ", "")}','${route_id[i]}',0)>
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
      else {
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
              <!-- replace(" ","")是因為一些路線名稱的問題，像是黃11 小黃公車 --!>
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c_${i}" aria-expanded="true" aria-controls="c_${i}" data-route="${route_id[i]}" onclick=click_bus_info('${$(this).parent().attr('city_name_EN')}','${route[i].replace(" ", "")}','${route_id[i]}',0)>
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

  // 回上一頁
  $('button.go_Bus_Total').on('click', function () {
    $('div.singleCity').hide(0);
    $('div.Bus-City-info').show(0);
    Route_Select = [];
    $('.list-route-group').html('');
    $('.bus_Routes_active *').css('background-color', '#fff');
  });


  $(".bus_Routes[city_name_EN='Other'] span").on('click', function () {
    $('.bus_Routes_active *').css('background-color', '#fff');
    $(this).css('background-color', '#686de0');
    get_bus_info($(this).attr('route_info'));
  });
  /* ==========  公車(End)  ========== */


let bike_Route_Info = '';
let bike_Route = [];
$('.bike-container').hide();
  $('.city_Bike').on('click', function(){
    $('.bike-city-Category').hide();
    $('.bike-city').html($(this).attr('city_name_Tw'));
    $('.bike-container').show();
    let select_City = $(this).attr('id');
    $.ajax({
    url: `https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/${select_City}?&$format=JSON`,
    dataType: 'json',
    contentType: 'json',
    headers: GetAuthorizationHeader(),
    success: function (result) {
      let bike_Route_Content = '';
      $('.route-Group').html();
      Object.keys(result).forEach(function (value, key) {
       bike_Route.push(result[value]['RouteName']);
        bike_Route_Info = $.parseJSON(JSON.stringify(result));
        let arrow = result[value]['City'] == '雙向' ? `<i class="fas fa-arrows-alt-v"></i>`: `<i class="fas fa-long-arrow-alt-down"></i>`;
        let span_info = result[value]['Town'] == undefined ?   '' : `<span class='badge bg-primary p-2 mx-1'>${result[value]['Town']}</span>`;
        bike_Route_Content = bike_Route_Content + `
            <div class='route-item'>
                <div class='route-item-header'>
                  <h2>${result[value]['RouteName']}</h2>
                  <div class='d-flex flex-row'>
                    <span class='badge bg-danger p-2'>${result[value]['City']}</span>
                    ${span_info}
                  </div>
                  <h3 style='font-size: 16px;'>路線長度: ${ result[value]['CyclingLength'] ? result[value]['CyclingLength']/1000 + '公里' : '未提供路線長度' }</h3>

                </div>
                <div class='route-item-body my-2'>
                    <div class = 'bike-Route-Direct'>
                    <p>
                      ${result[value]['RoadSectionStart'] == undefined ? '未提供路線起點': result[value]['RoadSectionStart']}
                    </p>
                      ${arrow}
                    <p>
                      ${result[value]['RoadSectionEnd']  == undefined ? '未提供路線終點': result[value]['RoadSectionEnd']}
                    </p>

                    <button id='show_bike_Route' type="button" class="btn btn-success my-2" data-num = '${value}'>顯現路線</button>
                    </div>
                </div>
            </div>
        `;
      });
      $('.route-Group').append(bike_Route_Content);

    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log(XMLHttpRequest);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });
  });
    
  $('.go_Bike_Container').on('click', function(){
    $('.bike-container').hide();
    $('.bike-city-Category').show();
    $('.route-Group').html('');
    bike_Route_Info = '';
    bike_Route = [];
  });


  let antPolyline;
  $('div.route-Group').delegate('button#show_bike_Route', 'click' ,function () {
    let num = $(this).attr('data-num');
    $(`.route-item`).css('background-color', '#ffffff');
    $(`.route-item:nth-child(${num + 1})`).css('background-color', '#ffbe76');

    let geometry = bike_Route_Info[num]['Geometry']
    geometry_Transit = geometry.replace('MULTILINESTRING', '').replaceAll('(', '').replaceAll(')', '').replaceAll(',', ' ').split(' ');
    let coordinate = [];
    let start_point;
    let end_point;
    for(let i = 1; i < geometry_Transit.length; i++){
      if(i % 2 == 0){
        if(i == 2){
          start_point = [parseFloat(geometry_Transit[i]) ,parseFloat(geometry_Transit[i-1])];
        }
        end_point = [parseFloat(geometry_Transit[i]) ,parseFloat(geometry_Transit[i-1])];
        coordinate.push([parseFloat(geometry_Transit[i]) ,parseFloat(geometry_Transit[i-1])]);
      }
    }
    if(antPolyline){
      map.removeLayer(antPolyline);
    }
         // Using the constructor...
           antPolyline = new L.Polyline.AntPath(coordinate, {
            use: L.polyline,
            fillColor: "red"
          }).addTo(map);


        map.fitBounds([
          start_point,
          end_point
        ]);
  });

  $('input.search-bike').on('keyup', function(){
    let this_Val = $(this).val();
    if(this_Val == ""){
      $('.route-Group .route-item').show();
    }else{
      $('.route-Group .route-item').hide();
      for(let i = 0 ; i < bike_Route.length; i++){
        let name = bike_Route[i];
        if( name.includes(this_Val)){
          $(`.route-item:nth-child(${i+1})`).show();
        }
      }
    }
  });




});

