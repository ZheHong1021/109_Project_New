// 路線規劃
// https://ithelp.ithome.com.tw/articles/10237145

// Leaflet 路線規劃
// http://www.liedman.net/leaflet-routing-machine/

// Leaflet moveMarker GeoJSON
// https://www.youtube.com/watch?v=LWML4HkOAi0&ab_channel=Coder%27sGyan


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
    icon: 'subway'
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


  const tileLayers = L.layerGroup([tileLayer1]);

  // 使用 Plugin- Control.TileLoadingProgress，在縮放地圖時會有一個進度表動畫呈現縮放情況
  const tileLoadingProgress = new L.Control.TileLoadingProgress({
    leafletElt: tileLayers,
    position: 'bottomleft'
  });
  tileLoadingProgress.addTo(map);


  // 設立變數
  let circle = {
    robber: new L.layerGroup(),
    snatch: new L.layerGroup()
  };
  let markers = {
    train: new L.MarkerClusterGroup(),
    mrt: new L.MarkerClusterGroup(),
    lrt: new L.MarkerClusterGroup(),
    bus: new L.MarkerClusterGroup(),
    police: new L.MarkerClusterGroup(),
    monitor: new L.MarkerClusterGroup()
  }


  // leaflet-control-container (透過 L_Control_Add [function.js中] )
  // https://stackoverflow.com/questions/48291870/how-to-add-custom-ui-to-leaflet-map
  // L_Control_Add('leaflet-bar sideBar-control', '<i class="fas fa-arrows-alt-h"></i>', 'topleft');
  L_Control_Add(tag = 'a', class_name = 'goBackPosition js-goBackPosition', i_Control = '<i class="fas fa-crosshairs" style="color:rgb(82, 81, 81)" title="回到目前位置"></i>', position = 'topright');
  L_Control_Add('a', 'goBackTaiwan', '<i class="twicon-main-island" title="台灣"></i>', 'topright');



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




  // 把 Ajax用成函式，在其他功能的使用上可以透過呼叫來執行。
  var filter_Map_Data = function (func) {
    /* AJax  */
    $.ajax({
      url: "osm.php",
      data: {
        // check_val: checked_arr,
        action: func, // ajax到 OSM.php，並執行 Get_Transportation函式
      },
      dataType: 'json',
      type: 'post',
      headers: GetAuthorizationHeader(), // 憑證 API token
      success: function (result) {
        // console.log(result); // 確認 Ajax回傳的結果

        // 參考下方網址(Foreach)
        // https://stackoverflow.com/questions/32168394/how-do-i-loop-through-deeply-nested-json-object
        Object.keys(result).forEach(function (value, key) {
          result[value].forEach(function (v, k) {

            /* 將從 OSM.php中所擷取到的資料用變數存放 */
            var name = v.station_info.station_name;
            var station_address = v.station_info.station_address;
            var station_category = v.station_info.category;
            var station_weather = v.weather;
            var latitude = v.coordinates.latitude;
            var longitude = v.coordinates.longitude;

            /* 參考資料 */
            // https://leafletjs.com/examples/geojson/
            // 透過 geoJSON來將我們從 OSM.php中所抓取到的 json呈現在地圖座標
            var geojsonFeature = {
              // 型別Feature運用在一些函式(makePopupContent、onEachFeature)做使用
              "type": "Feature",

              // 將擷取到資料再運用 json方式存放在 geoJSON中，之後可以拿來做使用
              "properties": {
                "name": name,
                "address": station_address,
                "category": station_category,
                "T": station_weather.T,
                // "AT": station_weather.AT,
                "PoP6h": station_weather.PoP6h,
                // "Wx": station_weather.Wx,
                // "RH": station_weather.RH,
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
              filter: function (feature, layer) {
                return (feature.properties.category === "台鐵");
              }
            }).addTo(markers.train);

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
              filter: function (feature, layer) {
                return (feature.properties.category === "捷運");
              }
            }).addTo(markers.mrt);

            // 最後再將上述設定的內容加入到 map當中
            L.geoJSON(geojsonFeature, {
              // function.js中的onEachFeature函式，目的讓這些marker有 popup的效果
              onEachFeature: onEachFeature,
              // 用來顯示 marker icon
              pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                  icon: LRT_Marker
                });
              },
              filter: function (feature, layer) {
                return (feature.properties.category === "輕軌");
              }
            }).addTo(markers.lrt);


          })
          // foeEach(End)

        });
        // foeEach(End)
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
      }
    })

  };
  // 一開始進來時，就執行 Ajax (參數一: 在PHP中使用的函數； 參數二: 為目前搜尋欄輸入的值)
  filter_Map_Data('Get_Transportation');



  /* ==公車== */
  let show_Bus_Marker = function (city) {
    $.ajax({
      url: 'https://ptx.transportdata.tw/MOTC/v2/Bus/Station/City/' + city + '?$format=JSON',
      dataType: 'json',
      headers: GetAuthorizationHeader(), // 憑證 API token
      success: function (result) {
        console.log(city);
        Object.keys(result).forEach(function (value, key) {
          let latitude = result[value]['StationPosition']['PositionLat'];
          let longitude = result[value]['StationPosition']['PositionLon'];

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
          }).addTo(markers.bus);
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

  // 臺北市: Taipei  // 新北市: NewTaipei  // 高雄市: Kaohsiung  // 新竹市: Hsinchu
  // 新竹縣: HsinchuCounty  // 苗栗縣: MiaoliCounty  // 彰化縣: ChanghuaCounty
  // 南投縣: NantouCounty  // 雲林縣: YunlinCounty  // 嘉義縣: ChiayiCounty
  // 嘉義市: Chiayi  // 屏東縣: PingtungCounty  // 宜蘭縣: YilanCounty  // 花蓮縣: HualienCounty
  // 臺東縣: TaitungCounty  // 澎湖縣: PenghuCounty  // 臺南市: Tainan  // 金門縣: KinmenCounty
  let Bus_City_List = ["Taipei", "NewTaipei", "Kaohsiung", "Hsinchu", "HsinchuCounty", "MiaoliCounty", "ChanghuaCounty",
    "ChanghuaCounty", "NantouCounty", "YunlinCounty", "ChiayiCounty", "Chiayi", "PingtungCounty",
    "YilanCounty", "HualienCounty", "PenghuCounty", "Tainan", "KinmenCounty"
  ];
  for (let i = 0; i < Bus_City_List.length; i++) {
    show_Bus_Marker(Bus_City_List[i]);
  }



  /*  ====治安地圖====  */
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
      // console.log(result);

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

      // Leaflet-Group-Layers
      let overlayMaps = {
        "交通區域": {
          "火車站": markers.train,
          "捷運站": markers.mrt,
          "輕軌": markers.lrt,
          "公車": markers.bus
        },
        "安全區域": {
          "警察局": markers.police,
          "監視器": markers.monitor
        },
        "危險區域": {
          "強盜": circle.robber,
          "搶奪": circle.snatch
        }
      };
      // {}:為單選
      // overlayMaps為複選
      L.control.groupedLayers({}, overlayMaps, {
        // 將圖層拉開
        collapsed: false,
        position: 'topleft'
      }).addTo(map);
      L.control.scale().addTo(map);


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
  //   position: 'topright',
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