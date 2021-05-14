$(function () {

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

  let THRS_Marker = L.AwesomeMarkers.icon({
    markerColor: 'purple',
    prefix: 'fa',
    icon: 'subway',
  });

  let BUS_Marker = L.AwesomeMarkers.icon({
    markerColor: 'black',
    prefix: 'fa',
    icon: 'bus'
  });


     
  window.map = new L.Map('map');

  L.control.fullscreen({
    position: 'topleft', 
    title: 'Show me the fullscreen !', 
    titleCancel: 'Exit fullscreen mode', 
    content: null, 
    forceSeparateButton: true, 
    fullscreenElement: false 
  }).addTo(map);


  const tileLayer1 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    errorTileUrl: 'http://bpic.588ku.com/element_pic/16/12/07/706f7ff4f15725b17ba1d30d384e6468.jpg'
  }).addTo(map);

  
  const blueIcon = L.icon.pulse({
    iconSize: [20, 20],
    color: '#2e72f0',
    fillColor: '#2e72f0'
  })

  const error_Position = [22.620894, 120.311859];

  const blueMarker = L.marker(error_Position, {
    icon: blueIcon,
    title: '跟 <a> 的 title 一樣', // 跟 <a> 的 title 一樣
    opacity: 1.0
  }).addTo(map);

  map.locate({ setView: true, watch: false, maxZoom: 18, enableHighAccuracy: true });

  
  function errorHandler(e) {
    console.log("e", e);
    window.alert('無法判斷您的所在位置，無法使用此功能。預設地點將為 台北市動物園');
    map.setView(error_Position, 18); // 中心移到動物園
    moveTo(map); // 移動到指定座標（平滑 || 縮放 效果）
    panBy(map); // 移動 x, y 位置
  }
  map.on('locationerror', errorHandler);

  // 使用者提供位置
  function foundHandler(e) {
    // console.log("e", e);
    blueMarker.setLatLng(e.latlng); // 移動 marker
    moveTo(map); // 移動到指定座標（平滑 || 縮放 效果）
    panBy(map); // 移動 x, y 位置

    const goBackPosition = document.querySelector('.js-goBackPosition')
      goBackPosition.addEventListener('click', () => {
        map.setView(e.latlng,  17)
      })
  }

  map.on('locationfound', foundHandler);

  function moveTo(map) {
    const btnPanto = document.querySelectorAll('.js-panto');
    Array.prototype.forEach.call(btnPanto, pan => {
      pan.addEventListener('click', e => {
        e.preventDefault();
        let latLng = e.target.dataset.to.split(',');
        let name = e.target.textContent;
        let toggleFly = document.getElementById('flyTo').checked;
        const popup = L.popup();
        popup
          .setLatLng(latLng)
          .setContent(`${name}`)
          .openOn(map);
        toggleFly ? map.flyTo(latLng) : map.panTo(latLng);
      })
    })
  }

  // 移動 x, y 位置
  function panBy(map) {
    const btnPanby = document.querySelectorAll('.js-panby');
    Array.prototype.forEach.call(btnPanby, pan => {
      pan.addEventListener('click', e => {
        e.preventDefault();
        let times = e.target.dataset.times;
        let point = 50 * times;
        let points = [point, point];
        map.panBy(points);
      })
    })
  }





  let circle = {
    robber: new L.layerGroup(),
    snatch: new L.layerGroup()
  };
  let markers = {
    train: new L.MarkerClusterGroup(),
    thsr: new L.MarkerClusterGroup(),
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


  L_Control_Add(tag = 'a', class_name = 'goBackPosition js-goBackPosition', i_Control = '<i class="fas fa-crosshairs" style="color:rgb(82, 81, 81)" title="回到目前位置"></i>', position = 'topright');
  L_Control_Add('a', 'goBackTaiwan', '<i class="twicon-main-island" title="台灣"></i>', 'topright');
  L_Control_Add('a', 'goFiliter', '<i class="fas fa-filter"></i>', 'topright');
  


  const tileLayers = L.layerGroup([tileLayer1]);

  const tileLoadingProgress = new L.Control.TileLoadingProgress({
    leafletElt: tileLayers,
    position: 'bottomleft'
  });
  tileLoadingProgress.addTo(map);

  //   let weather_Result;
  //   $.ajax({
  //     url: "osm.php",
  //     data: {
  //       action: 'weather_Data', // ajax到 OSM.php，並執行 Get_Transportation函式
  //     },
  //     dataType: 'json',
  //     type: 'post',
  //     headers: GetAuthorizationHeader(),
  //     success: function (result) {
  //       weather_Result = $.parseJSON(JSON.stringify(result));
  //     },
  //     error: function (XMLHttpRequest, textStatus, errorThrown) {
  //       console.log(XMLHttpRequest);
  //       console.log(textStatus);
  //       console.log(errorThrown);
  //     }
  //   })

  // let get_Match_Weather;
  // let can_Get;
  // let match_Weather_Addr = function(addr){
  //   can_Get = false;
  //   get_Match_Weather = [];
  //   for(let i = 0 ; i < weather_Result.length ; i++){
  //     if(addr.includes(weather_Result[i]['City'])){
  //         if(addr.includes(weather_Result[i]['District'])){
  //           can_Get = true;
  //           get_Match_Weather.push(weather_Result[i]['PoP6h']);
  //           get_Match_Weather.push(weather_Result[i]['T']);
  //           get_Match_Weather.push(weather_Result[i]['AT']);
  //         }
  //     }
  //   }
  // }


  let select = `StationPosition,StationName,StationAddress`;
  $.ajax({
    url: `https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/Station?$select=${select}&$format=JSON`,
    dataType: 'json',
    contentType: 'json',
    headers: GetAuthorizationHeader(), 
    success: function (result) {
      Object.keys(result).forEach(function (value, key) {
        let latitude = result[value]['StationPosition']['PositionLat'];
        let longitude = result[value]['StationPosition']['PositionLon'];
        let name =  result[value]['StationName']['Zh_tw'];
        let address =  result[value]['StationAddress'];
        var geojsonFeature = {
          "type": "Feature",
          "properties": {
            "name": name,
            "address": address,
            'category': '台鐵',
            "latitude": latitude,
            "longitude": longitude,
          },
          "geometry": {
            "type": "Point",
            "coordinates": [longitude, latitude]
          }
        };
        L.geoJSON(geojsonFeature, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
              icon: TRA_Marker
            });
          },
        }).addTo(markers.train);
      });
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log(XMLHttpRequest);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });

  select = `StationPosition,StationName,StationAddress,StationID`;
  $.ajax({
    url: `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/Station?$select=${select}&format=JSON`,
    dataType: 'json',
    contentType: 'json',
    headers: GetAuthorizationHeader(), 
    success: function (result) {
      Object.keys(result).forEach(function (value, key) {
        let latitude = result[value]['StationPosition']['PositionLat'];
        let longitude = result[value]['StationPosition']['PositionLon'];
        let name =  result[value]['StationName']['Zh_tw'];
        let address =  result[value]['StationAddress'];
        var geojsonFeature = {
          "type": "Feature",
          "properties": {
            "name": name,
            "address": address,
            'category': '高鐵',
            "latitude": latitude,
            "longitude": longitude,
          },
          "geometry": {
            "type": "Point",
            "coordinates": [longitude, latitude]
          }
        };
        L.geoJSON(geojsonFeature, {
          onEachFeature: onEachFeature,
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
              icon: THRS_Marker
            });
          },
        }).addTo(markers.thsr);
      });
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log(XMLHttpRequest);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });



  let MRT_City_List = ["TRTC", "KRTC", "TYMC", "KLRT", "TMRT"];
  let show_MRT_Marker = function (city) {
    let select = 'StationPosition,StationName,StationAddress';
    $.ajax({
      url: `https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/Station/${city}?$select=${select}&$format=JSON`,
      dataType: 'json',
      contentType: 'json',
      headers: GetAuthorizationHeader(),
      success: function (result) {
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
            let name =  result[value]['StationName']['Zh_tw'];
            let address =  result[value]['StationAddress'];
            var geojsonFeature = {
              "type": "Feature",
              "properties": {
                "name": name,
                "address": address,
                'category': '捷運',
                "latitude": latitude,
                "longitude": longitude,
             
              },
              "geometry": {
                "type": "Point",
                "coordinates": [longitude, latitude]
              }
            };

            L.geoJSON(geojsonFeature, {
              onEachFeature: onEachFeature,
              pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                  icon: MRT_Marker
                });
              },
            }).addTo(marker);
          });
        }
      },
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



  let Bus_City_List = ["Taipei", "NewTaipei", "Kaohsiung", "Hsinchu",
    "HsinchuCounty", "MiaoliCounty", "ChanghuaCounty", "NantouCounty",
    "YunlinCounty", "ChiayiCounty", "Chiayi", "PingtungCounty",
    "YilanCounty", "HualienCounty", "TaitungCounty", "PenghuCounty",
    "Tainan", "KinmenCounty"
  ];
  let show_Bus_Marker = function (city) {
    let select = 'StationPosition,StationName';
    $.ajax({
      url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Station/City/${city}?$select=${select}&$format=JSON`,
      dataType: 'json',
      contentType: 'json',
      headers: GetAuthorizationHeader(),
      success: function (result) {
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

            if (city == "Tainan" && result[value]['StationName']['Zh_tw'] == "高雄國際航空站") {
              marker = markers.bus.Kaohsiung;
            }

            var geojsonFeature = {
              "type": "Feature",

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

            L.geoJSON(geojsonFeature, {
              onEachFeature: onEachFeature,
              pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                  icon: BUS_Marker
                });
              },
            }).addTo(marker);


          });
        }
      },
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
  $.ajax({
    url: "osm.php",
    data: {
      action: 'getdata', 
    },
    type: "post",
    dataType: "json",

    success: function (result) {

      for (var i = 0; i < result['markerPoint'].length; i++) {
        var info_SignName = result['sign'][i]['sign_name'];
        var info_Address = result['sign'][i]['sign_address'];
        var info_Date = result['sign'][i]['sign_date'];
        var info_Time = result['sign'][i]['sign_time'];
        var info_Department = result['sign'][i]['sign_department'];
        var info_Latitude = result['markerPoint'][i]['latitude'];
        var info_Longitude = result['markerPoint'][i]['longitude'];

        switch (result['sign'][i]['category']) {
          case "強盜地點":
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



      markers.train.addTo(map);
      var overlays = [{
          groupName: "火車",
          expanded: true,
          layers: {
            "全部": markers.train
          }
        },
        {
          groupName: "高鐵",
          layers: {
            "全部": markers.thsr
          }
        },
        {
          groupName: "捷運",
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
          layers: {
            "警察局": markers.police,
            "監視器": markers.monitor
          }
        },
        {
          groupName: "危險區域",
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
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log(XMLHttpRequest);
      console.log(textStatus);
      console.log(errorThrown);
    }

  });


  $('.goBackTaiwan').on('click', function () {
    map.fitBounds([
      [21.9705713974, 120.106188593],
      [25.2954588893, 121.951243931]
    ]);
  });






});