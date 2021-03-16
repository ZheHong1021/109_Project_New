$(function () {
  var userid = 0

  addUser = function () {
    sidebar.addPanel({
      id: 'user' + userid++,
      tab: '<i class="fa fa-user"></i>',
      title: 'User Profile ' + userid,
      pane: '<p>user ipsum dolor sit amet</p>',
    });
  }

  let mrt_html =
    `<div class="container">
    <div class="City">
      <label for="City_List" class="select_Label">縣市</label>
      <select class="form-select form-select-sm" id="City_List" aria-label="Default select example">
        <option selected value="KRTC">高雄捷運</option>
        <option value="KLRT">高雄輕軌</option>
        <option value="TRTC">台北捷運</option>
        <option value="TYMC">桃園捷運</option>
        <option value="TMRT">台中捷運</option>
      </select>
    </div>

    <div class="Origin_Station">
      <label for="Origin_StationName_List " class='select_Label'>起站</label>
      <select class="form-select form-select-sm" id="Origin_StationName_List" aria-label="Default select example">

      </select>
    </div>

    <div class="Destination_Station">
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
      <div id='mrt-result' class = "alert-body text-center">尚無查詢紀錄</div>
    </div>
    `;



  // create the sidebar instance and add it to the map
  var sidebar = L.control.sidebar({
      container: 'sidebar',
    })
    .addTo(map)
    .open('home');

  // add panels dynamically to the sidebar
  sidebar
    .addPanel({
      id: 'travel',
      tab: '<i class="fas fa-suitcase-rolling"></i>',
      title: '旅遊',
      pane: '<p>123</p>',
    })
  // add panels dynamically to the sidebar
  sidebar
    .addPanel({
      id: 'bus',
      tab: '<i class="fas fa-bus-alt"></i>',
      title: '公車',
      pane: '<p>123</p>',
    })
    // add panels dynamically to the sidebar
    .addPanel({
      id: 'train',
      tab: '<i class="fas fa-subway"></i>',
      title: '火車',
      pane: '<p>123</p>',
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
      pane: '<p><button onclick="addUser()">add user</button></b>',
      position: 'bottom'
    })
    // add panels dynamically to the sidebar
    .addPanel({
      id: 'user-config',
      tab: '<i class="fas fa-cog"></i>',
      title: '設定',
      pane: '<p><button onclick="addUser()">add user</button></b>',
      position: 'bottom'
    })

    // add a tab with a click callback, initially disabled
    .addPanel({
      id: 'mail',
      tab: '<i class="fa fa-envelope"></i>',
      title: 'Messages',
      button: function () {
        alert('opened via JS callback')
      },
      disabled: true,
    })

  // be notified when a panel is opened
  sidebar.on('content', function (ev) {
    switch (ev.id) {
      case 'autopan':
        sidebar.options.autopan = true;
        break;
      default:
        sidebar.options.autopan = false;
    }
  });


  $.ajax({
    url: "https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/Station?$format=JSON",
    dataType: "json",

    // 當成功從 php回傳 json結果(result)的話
    success: function (result) {
      console.log(result);
      let city_arr = [];
      for (let i = 0; i < result.length; i++) {
        // console.log(result[i]['LocationCity']);
        let city = result[i]['LocationCity'].substr(0, 2);
        if (!(city_arr.includes(city))) {
          city_arr.push(city);
          $('select.selectpicker').append($('<optgroup></optgroup>').prop('label', city));
        }
        $('optgroup[label=' + city + ']').append($('<option></option>').html(result[i]['StationName']['Zh_tw']));

      }
      // console.log(city_arr);
    },
    // 當Ajax請求失敗
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log(XMLHttpRequest);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });


});