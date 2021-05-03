$(function () {

  /*  定義變數  */
  // ==設立marker icon==
  // -----------------------------------
  // 【參數說明】
  // iconUrl: icon的路徑(必要參數)。
  // iconSize: icon圖片大小(單位-pixel)。
  // iconAnchor: icon尖端的座標(預設為 Null)。
  // PopupAnchor: popup出現的座標點相對於iconAnchor的座標 (預設 [0, 0] )
  // shadowUrl: 製作陰影圖片的路徑(預設為 Null)。
  // shadowSize: 陰影圖片的大小，單位為pixel(預設 Null)。
  var greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
  })
  var orangeIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    // iconUrl: 'subway-solid.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
  })
  var redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
  })

  var monitorIcon = new L.Icon({
    iconUrl: 'img/marker_Monitor.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: '',
    shadowSize: [41, 41]
  })

  var policeIcon = new L.Icon({
    iconUrl: 'img/police-station.png',
    iconSize: [35, 35],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
  })

  /* 透過 Plugin- AwesomeMarker，讓座標可以用 icon來呈現內容 */
  let TRA_Marker = L.AwesomeMarkers.icon({
    markerColor: 'red',
    prefix: 'fa',
    icon: 'subway',

  });

  let MRT_Marker = L.AwesomeMarkers.icon({
    markerColor: 'green',
    prefix: 'fa',
    icon: 'train'
  });

  let LRT_Marker = L.AwesomeMarkers.icon({
    markerColor: 'orange',
    prefix: 'fa',
    icon: 'tram'
  });

  let BUS_Marker = L.AwesomeMarkers.icon({
    markerColor: 'black',
    prefix: 'fa',
    icon: 'bus'
  });


  // 建立 map容器(空間)並設定到 id=map的div上，之後可以加入 '底圖'、'圖層'、'物件(icon)'
  /* 因為在函式中也要使用到 map變數，所以直接用全域變數來定義他 */
  window.map = new L.Map('map');



  // create a fullscreen button and add it to the map
  L.control.fullscreen({
    position: 'topleft', // change the position of the button can be topleft, topright, bottomright or bottomleft, defaut topleft
    title: 'Show me the fullscreen !', // change the title of the button, default Full Screen
    titleCancel: 'Exit fullscreen mode', // change the title of the button when fullscreen is on, default Exit Full Screen
    content: null, // change the content of the button, can be HTML, default null
    forceSeparateButton: true, // force seperate button to detach from zoom buttons, default false
    // forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
    fullscreenElement: false // Dom element to render in full screen, false by default, fallback to map._container
  }).addTo(map);




  // 匯入圖資(底圖)； tileLayer: 以圖磚的方式存取圖層，當網路或是電腦跑比較慢的時候就可以看出一塊一塊的圖片在讀取中。
  // 如果想換樣式-> 連結 : http://leaflet-extras.github.io/leaflet-providers/preview/index.html
  // {s} tile 連結的subdomain，預設為a, b或c其中一個
  // {z} 地圖的zoom等級
  // {y} 圖磚的y座標
  // {x} 圖磚的x座標
  const tileLayer1 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18, // 預設為14，限制縮放大小；最大限制到 19，最小到 0
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // 讀取地圖失敗時，會顯現後面連結的圖片
    errorTileUrl: 'http://bpic.588ku.com/element_pic/16/12/07/706f7ff4f15725b17ba1d30d384e6468.jpg'
  }).addTo(map);


  // const tileLayers = L.layerGroup([tileLayer1]);

  // // 使用 Plugin- Control.TileLoadingProgress，在縮放地圖時會有一個進度表動畫呈現縮放情況
  // const tileLoadingProgress = new L.Control.TileLoadingProgress({
  //   leafletElt: tileLayers,
  //   position: 'bottomleft'
  // });
  // tileLoadingProgress.addTo(map);

  // Geolocation.getCurrentPosition(參數1, 參數2, 參數3) 方法用來獲取設備當前的位置。
  // 參數1 - success: 一個回傳函式(callback function) 會被傳入一個Position 的物件。
  // 參數2 - error: 一個選擇性的錯誤回傳函式(callback function)，會被傳入一個 PositionError 的物件。
  // 參數3 - options: 一個選擇性的 PositionOptions 的物件。
  // 參數1為 function.js中的 showPosition函式；參數1為 function.js中的 showError函式

  navigator.geolocation.getCurrentPosition(showPosition, showError, {
    enableHighAccuracy: true,
    maximumAge: 5000,
    timeout: 3000

  });


  // 設立變數
  let circle = {
    robber: new L.layerGroup(),
    snatch: new L.layerGroup()
  };
  let markers = {
    train: new L.MarkerClusterGroup(),
    mrt: {
      TRTC: new L.MarkerClusterGroup(),
      KRTC: new L.MarkerClusterGroup(),
      TYMC: new L.MarkerClusterGroup(),
      KLRT: new L.MarkerClusterGroup(),
      TMRT: new L.MarkerClusterGroup(),

    },
    lrt: new L.MarkerClusterGroup(),
    bus: {
      Tapei: new L.MarkerClusterGroup(),
      NewTaipei: new L.MarkerClusterGroup(),
      Kaohsiung: new L.MarkerClusterGroup(),
      Hsinchu: new L.MarkerClusterGroup(),
      HsinchuCounty: new L.MarkerClusterGroup(),
      MiaoliCounty: new L.MarkerClusterGroup(),
      ChanghuaCounty: new L.MarkerClusterGroup(),
      NantouCounty: new L.MarkerClusterGroup(),
      YunlinCounty: new L.MarkerClusterGroup(),
      ChiayiCounty: new L.MarkerClusterGroup(),
      Chiayi: new L.MarkerClusterGroup(),
      PingtungCounty: new L.MarkerClusterGroup(),
      YilanCounty: new L.MarkerClusterGroup(),
      HualienCounty: new L.MarkerClusterGroup(),
      TaitungCounty: new L.MarkerClusterGroup(),
      PenghuCounty: new L.MarkerClusterGroup(),
      Tainan: new L.MarkerClusterGroup(),
      KinmenCounty: new L.MarkerClusterGroup(),
    },
    police: new L.MarkerClusterGroup(),
    monitor: new L.MarkerClusterGroup()
  }


  // leaflet-control-container (透過 L_Control_Add [function.js中] )
  // https://stackoverflow.com/questions/48291870/how-to-add-custom-ui-to-leaflet-map
  // L_Control_Add('leaflet-bar sideBar-control', '<i class="fas fa-arrows-alt-h"></i>', 'topleft');
  L_Control_Add(tag = 'a', class_name = 'goBackPosition js-goBackPosition', i_Control = '<i class="fas fa-crosshairs" style="color:rgb(82, 81, 81)" title="回到目前位置"></i>', position = 'topright');
  L_Control_Add('a', 'goBackTaiwan', '<i class="twicon-main-island" title="台灣"></i>', 'topright');
  L_Control_Add('a', 'goFiliter', '<i class="fas fa-filter"></i>', 'topright');
  // L_Control_Add(tag = 'div', class_name = 'searchbar', i_Control = '<input id="inputbox" size="20">', position = 'topleft');


  // let hereApiKey = 'Z5fDXqmwODPgSiAVnsdKhL03-f2VHP4YpfoeyYVNamI';
  // var tileLayer1 = L.tileLayer('https://{s}.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?lg=cht&ppi=72&pois&apiKey=' +
  //   hereApiKey, {
  //     attribution: '© 2020 HERE',
  //     subdomains: [1, 2, 3, 4]
  //   }).addTo(map); // Leaflet JS 預設使用 256px 大小的圖磚


  // var options = { // 定義 EasyAutocomplete 的選取項目來源
  //   url: function (phrase) {
  //     return 'https://autosuggest.search.hereapi.com/v1/autosuggest?' + // Autosuggest 的 API URL
  //       'q=' + phrase + // 接收使用者輸入的字串做搜尋
  //       '&limit=10' + // 最多限定五筆回傳
  //       '&lang=zh-TW' + // 限定台灣正體中文
  //       '&at=' + map.getCenter().lat + ',' + map.getCenter().lng + // 使用目前地圖的中心點作為搜尋起始點
  //       '&apikey=' + hereApiKey; // 您的 HERE API KEY
  //   },
  //   listLocation: 'items', // 使用回傳的 items 作為選取清單
  //   getValue: function (element) {
  //     if (element.mapView || element.position) {
  //       return element.title;
  //     } else {
  //       return '';
  //     }
  //   }, // 在選取清單中顯示 title
  //   list: {
  //     onClickEvent: function () { // 按下選取項目之後的動作
  //       var data = $("#inputbox").getSelectedItemData();
  //       if (data.mapView) { // 如果回傳的是地址，就進行這個動作
  //         var northWest = L.latLng(data.mapView.north, data.mapView.west), // 選取項目的西北角
  //           southEast = L.latLng(data.mapView.south, data.mapView.east); // 選取項目的東南角
  //         map.flyToBounds([northWest, southEast]); // 把地圖移動到選取項目
  //         getDataHubResults(data.position.lat, data.position.lng, data.title);
  //       } else if (data.position) { // 如果回傳的是興趣點，就進行這個動作
  //         map.flyTo(L.latLng(data.position), 16); // 把地圖移到選取項目的地點
  //         getDataHubResults(data.position.lat, data.position.lng, data.title);
  //       }
  //     }
  //   },
  //   requestDelay: 100, // 延遲 100 毫秒再送出請求
  //   placeholder: '搜尋地點' // 預設顯示的字串
  // };
  // $('#inputbox').easyAutocomplete(options); // 啟用 EasyAutocomplete 到 inpupbox 這個元件




  const tileLayers = L.layerGroup([tileLayer1]);

  // 使用 Plugin- Control.TileLoadingProgress，在縮放地圖時會有一個進度表動畫呈現縮放情況
  const tileLoadingProgress = new L.Control.TileLoadingProgress({
    leafletElt: tileLayers,
    position: 'bottomleft'
  });
  tileLoadingProgress.addTo(map);


  /* ==台鐵 Marker== */
  $.ajax({
    url: 'https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/Station?$format=JSON',
    dataType: 'json',
    contentType: 'json',
    headers: GetAuthorizationHeader(), // 憑證 API token
    success: function (result) {
      // console.log(city);

      Object.keys(result).forEach(function (value, key) {
        let latitude = result[value]['StationPosition']['PositionLat'];
        let longitude = result[value]['StationPosition']['PositionLon'];
        var geojsonFeature = {
          // 型別Feature運用在一些函式(makePopupContent、onEachFeature)做使用
          "type": "Feature",

          // 將擷取到資料再運用 json方式存放在 geoJSON中，之後可以拿來做使用
          "properties": {
            "name": result[value]['StationName']['Zh_tw'],
            "address": result[value]['StationAddress'],
            'category': '台鐵',
            "latitude": latitude,
            "longitude": longitude,

          },
          "geometry": {
            "type": "Point",
            "coordinates": [longitude, latitude]
          }
        };

        // 最後再將上述設定的內容加入到 map當中
        L.geoJSON(geojsonFeature, {
          // function.js中的onEachFeature函式，目的讓這些marker有 popup的效果
          onEachFeature: onEachFeature,
          // 用來顯示 marker icon
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
              icon: TRA_Marker
            });
          },
        }).addTo(markers.train);
      });
    },
    // 當Ajax請求失敗
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log(XMLHttpRequest);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });


  /* ==捷運 Marker== */
  // 臺北捷運:TRTC
  // 高雄捷運:KRTC
  // 桃園捷運:TYMC
  // 高雄輕軌:KLRT
  // 臺中捷運:TMRT
  let MRT_City_List = ["TRTC", "KRTC", "TYMC", "KLRT", "TMRT"];
  let show_MRT_Marker = function (city) {
    $.ajax({
      url: 'https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/Station/' + city + '?$format=JSON',
      dataType: 'json',
      contentType: 'json',
      headers: GetAuthorizationHeader(), // 憑證 API token
      success: function (result) {
        // console.log(city);
        if (MRT_City_List.includes(city)) {
          let marker;
          switch (city) {
            case "TRTC":
              marker = markers.mrt.TRTC;
              break;
            case "KRTC":
              marker = markers.mrt.KRTC;
              break;
            case "TYMC":
              marker = markers.mrt.TYMC;
              break;
            case "KLRT":
              marker = markers.mrt.KLRT;
              break;
            case "TMRT":
              marker = markers.mrt.TMRT;
              break;
          }
          Object.keys(result).forEach(function (value, key) {
            let latitude = result[value]['StationPosition']['PositionLat'];
            let longitude = result[value]['StationPosition']['PositionLon'];
            var geojsonFeature = {
              // 型別Feature運用在一些函式(makePopupContent、onEachFeature)做使用
              "type": "Feature",

              // 將擷取到資料再運用 json方式存放在 geoJSON中，之後可以拿來做使用
              "properties": {
                "name": result[value]['StationName']['Zh_tw'],
                "address": result[value]['StationAddress'],
                'category': '捷運',
                "latitude": latitude,
                "longitude": longitude,

              },
              "geometry": {
                "type": "Point",
                "coordinates": [longitude, latitude]
              }
            };

            // 最後再將上述設定的內容加入到 map當中
            L.geoJSON(geojsonFeature, {
              // function.js中的onEachFeature函式，目的讓這些marker有 popup的效果
              onEachFeature: onEachFeature,
              // 用來顯示 marker icon
              pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                  icon: MRT_Marker
                });
              },
            }).addTo(marker);
          });
        }
      },
      // 當Ajax請求失敗
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  };

  for (let i = 0; i < MRT_City_List.length; i++) {
    show_MRT_Marker(MRT_City_List[i]);
  }



  // 臺北市: Taipei  // 新北市: NewTaipei  // 高雄市: Kaohsiung  // 新竹市: Hsinchu
  // 新竹縣: HsinchuCounty  // 苗栗縣: MiaoliCounty  // 彰化縣: ChanghuaCounty  // 南投縣: NantouCounty
  // 雲林縣: YunlinCounty  // 嘉義縣: ChiayiCounty  // 嘉義市: Chiayi  // 屏東縣: PingtungCounty
  // 宜蘭縣: YilanCounty  // 花蓮縣: HualienCounty  // 臺東縣: TaitungCounty  // 澎湖縣: PenghuCounty
  // 臺南市: Tainan  // 金門縣: KinmenCounty
  let Bus_City_List = ["Taipei", "NewTaipei", "Kaohsiung", "Hsinchu",
    "HsinchuCounty", "MiaoliCounty", "ChanghuaCounty", "NantouCounty",
    "YunlinCounty", "ChiayiCounty", "Chiayi", "PingtungCounty",
    "YilanCounty", "HualienCounty", "TaitungCounty", "PenghuCounty",
    "Tainan", "KinmenCounty"
  ];
  /* ==公車 Marker== */
  let show_Bus_Marker = function (city) {
    $.ajax({
      url: 'https://ptx.transportdata.tw/MOTC/v2/Bus/Station/City/' + city + '?$format=JSON',
      dataType: 'json',
      contentType: 'json',
      headers: GetAuthorizationHeader(), // 憑證 API token
      success: function (result) {
        // console.log(city);
        if (Bus_City_List.includes(city)) {
          let marker;
          switch (city) {
            case "Taipei":
              marker = markers.bus.Tapei;
              break;
            case "NewTaipei":
              marker = markers.bus.NewTaipei;
              break;
            case "Kaohsiung":
              marker = markers.bus.Kaohsiung;
              break;
            case "Hsinchu":
              marker = markers.bus.Hsinchu;
              break;
            case "HsinchuCounty":
              marker = markers.bus.HsinchuCounty;
              break;
            case "MiaoliCounty":
              marker = markers.bus.MiaoliCounty;
              break;
            case "ChanghuaCounty":
              marker = markers.bus.ChanghuaCounty;
              break;
            case "NantouCounty":
              marker = markers.bus.NantouCounty;
              break;
            case "YunlinCounty":
              marker = markers.bus.YunlinCounty;
              break;
            case "ChiayiCounty":
              marker = markers.bus.ChiayiCounty;
              break;
            case "Chiayi":
              marker = markers.bus.Chiayi;
              break;
            case "PingtungCounty":
              marker = markers.bus.PingtungCounty;
              break;
            case "YilanCounty":
              marker = markers.bus.YilanCounty;
              break;
            case "HualienCounty":
              marker = markers.bus.HualienCounty;
              break;
            case "TaitungCounty":
              marker = markers.bus.TaitungCounty;
              break;
            case "PenghuCounty":
              marker = markers.bus.PenghuCounty;
              break;
            case "Tainan":
              marker = markers.bus.Tainan;
              break;
            case "KinmenCounty":
              marker = markers.bus.KinmenCounty;
              break;
          }
          Object.keys(result).forEach(function (value, key) {
            let latitude = result[value]['StationPosition']['PositionLat'];
            let longitude = result[value]['StationPosition']['PositionLon'];

            // PTX API問題，把高雄國際航空站放到台南市的API中了
            if (city == "Tainan" && result[value]['StationName']['Zh_tw'] == "高雄國際航空站") {
              marker = markers.bus.Kaohsiung;
            }

            var geojsonFeature = {
              // 型別Feature運用在一些函式(makePopupContent、onEachFeature)做使用
              "type": "Feature",

              // 將擷取到資料再運用 json方式存放在 geoJSON中，之後可以拿來做使用
              "properties": {
                "name": result[value]['StationName']['Zh_tw'],
                'category': '公車',
                "latitude": latitude,
                "longitude": longitude,

              },
              "geometry": {
                "type": "Point",
                "coordinates": [longitude, latitude]
              }
            };

            // 最後再將上述設定的內容加入到 map當中
            L.geoJSON(geojsonFeature, {
              // function.js中的onEachFeature函式，目的讓這些marker有 popup的效果
              onEachFeature: onEachFeature,
              // 用來顯示 marker icon
              pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                  icon: BUS_Marker
                });
              },
            }).addTo(marker);


          });
        }
      },
      // 當Ajax請求失敗
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  };

  for (let i = 0; i < Bus_City_List.length; i++) {
    show_Bus_Marker(Bus_City_List[i]);
  }




  /*  ====治安地圖 Marker====  */
  // Ajax開始
  $.ajax({
    url: "osm.php",
    data: {
      action: 'getdata', //(action)使用 php的function需post資料過去php作判別要使用哪個function
    },
    type: "post",
    dataType: "json",

    // 當成功從 php回傳 json結果(result)的話
    success: function (result) {

      // 透過迴圈一一將 result的資料融入到各個變數中
      for (var i = 0; i < result['markerPoint'].length; i++) {
        var info_SignName = result['sign'][i]['sign_name'];
        var info_Address = result['sign'][i]['sign_address'];
        var info_Date = result['sign'][i]['sign_date'];
        var info_Time = result['sign'][i]['sign_time'];
        var info_Department = result['sign'][i]['sign_department'];

        // 緯度
        var info_Latitude = result['markerPoint'][i]['latitude'];

        // 經度
        var info_Longitude = result['markerPoint'][i]['longitude'];

        // 透過 Switch來分類種類
        switch (result['sign'][i]['category']) {
          case "強盜地點":
            // Circle物件設定 BindPopup且一些屬性透過 addTo到 map中
            circle.robber.addLayer(L.circle([info_Latitude, info_Longitude], {
                color: 'blue',
                fillColor: '#0033ff',
                fillOpacity: 0.5,
                radius: 500
              })
              .bindPopup(
                '<h2>' + info_Address + '_' + info_SignName + '</h2>' +
                '<h3>日期：' + info_Date + '</h3>' +
                '<h3>時間：' + info_Time + '</h3>'))
            break;

          case "警察局地點":
            // markers群組 addLayer 物件marker設定BindPopup且一些屬性透過 addTo到 map中
            markers.police.addLayer(L.marker([info_Latitude, info_Longitude], {
                icon: policeIcon
              })
              .bindPopup(
                '<h2>' + info_SignName + '</h2>' +
                '<h3>部門:' + info_Department + '</h3>' +
                '<h3>' + info_Address + '</h3>' +
                '<h3>經度：' + info_Longitude + '</h3>' +
                '<h3>緯度：' + info_Latitude + '</h3>'))

            break;

          case "搶奪地點":
            circle.snatch.addLayer(L.circle([info_Latitude, info_Longitude], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 500
              })
              .bindPopup(
                '<h2>' + info_Address + '_' + info_SignName + '</h2>' +
                '<h3>日期：' + info_Date + '</h3>' +
                '<h3>時間：' + info_Time + '</h3>'))
            break;
          case "監視器地點":
            markers.monitor.addLayer(L.marker([info_Latitude, info_Longitude], {
                icon: monitorIcon
              })
              .bindPopup(
                '<h1>編號:' + info_SignName + '</h1>' +
                '<h2>部門:' + info_Department + '</h2>' +
                '<h2>地址:' + info_Address + '</h2>' +
                '<h3>經度：' + info_Longitude + '</h3>' +
                '<h3>緯度：' + info_Latitude + '</h3>'))
            break;
        }
      }



      // 地圖預設顯示火車座標
      markers.train.addTo(map);
      var overlays = [{
          groupName: "火車",
          expanded: true,
          layers: {
            "全部": markers.train
          }
        },
        {
          groupName: "捷運",
          // expanded: true,
          layers: {
            "臺北捷運": markers.mrt.TRTC,
            "高雄捷運": markers.mrt.KRTC,
            "高雄輕軌": markers.mrt.KLRT,
            "桃園捷運": markers.mrt.TYMC,
            "臺中捷運": markers.mrt.TMRT,
          }
        },
        {
          groupName: "公車",
          // expanded: true,
          layers: {
            "臺北市": markers.bus.Tapei,
            "新北市": markers.bus.NewTaipei,
            "高雄市": markers.bus.Kaohsiung,
            "新竹市": markers.bus.Hsinchu,
            "新竹縣": markers.bus.HsinchuCounty,
            "苗栗縣": markers.bus.MiaoliCounty,
            "彰化縣": markers.bus.ChanghuaCounty,
            "南投縣": markers.bus.NantouCounty,
            "雲林縣": markers.bus.YunlinCounty,
            "嘉義縣": markers.bus.ChiayiCounty,
            "嘉義市": markers.bus.Chiayi,
            "屏東縣": markers.bus.PingtungCounty,
            "宜蘭縣": markers.bus.YilanCounty,
            "花蓮縣": markers.bus.HualienCounty,
            "臺東縣": markers.bus.TaitungCounty,
            "澎湖縣": markers.bus.PenghuCounty,
            "臺南市": markers.bus.Tainan,
            "金門縣": markers.bus.KinmenCounty,
          }
        },
        {
          groupName: "安全區域",
          // expanded: true,
          layers: {
            "警察局": markers.police,
            "監視器": markers.monitor
          }
        },
        {
          groupName: "危險區域",
          // expanded: true,
          layers: {
            "強盜": circle.robber,
            "搶奪": circle.snatch
          }
        },
      ];
      var options = {
        container_width: "300px",
        container_maxHeight: "350px",
        group_maxHeight: "120px",
        exclusive: false,
        collapsed: false,
      };

      let layerControls = L.Control.styledLayerControl({}, overlays, options);
      map.addControl(layerControls);
      // 預設隱藏
      $('div.leaflet-control-layers').hide();
      $('a.goFiliter').click(function () {
        if ($('div.leaflet-control-layers').css('display') == 'none') {
          $('a.goFiliter').css('background-color', '#82ccdd');
          $('div.leaflet-control-layers').show(1000);
        } else {
          $('a.goFiliter').css('background-color', '#f5f6fa');
          $('div.leaflet-control-layers').hide(1000);
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



  // // 路徑規劃
  // let routing = L.Routing.control({
  //   waypoints: [
  //     L.latLng(22.751425, 120.33138),
  //     L.latLng(22.74819, 120.331169)
  //   ],
  //   position: 'topleft',
  //   geocoder: L.Control.Geocoder.nominatim(),
  //   routeWhileDragging: true,
  //   showAlternatives: true,
  //   reverseWaypoints: true,
  //   defaultMarkGeocode: false,
  //   show: false,
  // }).addTo(map);


  // // 開關 routing-machine
  // // 來源：https://gis.stackexchange.com/questions/324016/leaflet-routing-machine-show-option-doesnt-work
  // var itineraryShown = false;
  // var controlContainer = routing.getContainer();
  // var legendClickArea = document.createElement("DIV");

  // legendClickArea.classList.add('legendClickArea');
  // controlContainer.appendChild(legendClickArea);

  // var routing_img = document.createElement("img");
  // routing_img.src = 'img/route.png';
  // routing_img.title = '點擊規劃路徑';
  // legendClickArea.appendChild(routing_img);

  // legendClickArea.onclick = function () {
  //   if (itineraryShown)
  //     routing.hide();
  //   else {
  //     routing.show();
  //   }
  //   itineraryShown = !itineraryShown;
  // };


  // minutes
  let refresh_Time = 1;
  // 刷新地圖
  var timeoutID = window.setInterval(function () {
      map.invalidateSize();
      console.log('refresh');
    },
    refresh_Time * 60000);


  /*  點擊動畫事件  */
  $('.goBackTaiwan').on('click', function () {
    /*  這邊有BUG，如果地圖沒有半個 marker，會Error  */
    // console.log(markers.getBounds());
    // map.fitBounds(markers.getBounds()); //set view on the cluster extent
    // 各國家的Bounds座標位置：https://gist.github.com/graydon/11198540
    map.fitBounds([
      [21.9705713974, 120.106188593],
      [25.2954588893, 121.951243931]
    ]);
  });






});