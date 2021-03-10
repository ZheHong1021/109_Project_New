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
          <select id="Origin_StationName_List">
            <option>青埔捷運站</option>
          </select>
          <select id="Destination_StationName_List">
            <option>巨蛋捷運站</option>
          </select>
          <button id = "go_Search">查詢</button>
        </div>
        <div class="result"></div>`;



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





});