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
  <!-- body -->
    <div class = "alert alert-primary fade show d-flex justify-content-center" role = "alert" >
        <div id='mrt_result' class = "alert-body text-center">尚無功能，暫請等待</div>
      </div>
  `;
  let bus_html = `
  <!-- body -->
    <div class = "alert alert-primary fade show d-flex justify-content-center" role = "alert" >
        <div id='mrt_result' class = "alert-body text-center">尚無功能，暫請等待</div>
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

  // add a tab with a click callback, initially disabled
  // .addPanel({
  //   id: 'mail',
  //   tab: '<i class="fa fa-envelope"></i>',
  //   title: 'Messages',
  //   button: function () {
  //     alert('opened via JS callback')
  //   },
  //   disabled: true,
  // })


  // // 打開面板時收到通知
  // sidebar.on('content', function (ev) {
  //   switch (ev.id) {
  //     case 'autopan':
  //       sidebar.options.autopan = true;
  //       break;
  //     default:
  //       sidebar.options.autopan = false;
  //   }
  // });





});