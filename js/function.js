
/*---------------geoJSON設定---------------*/

// 來顯現 marker座標點
function onEachFeature(feature, layer) {
  // 再透過 makePopupContent將從JSON中的資料內容用在 Popup中
  layer.bindPopup(makePopupContent(feature), {

    // 將 popup右上角的 X給去除掉
    closeButton: false,

    // 不要讓 popup遮住marker的ICON
    offset: L.point(0, -8)
  });
}


// 利用 geoJSON將從 ajax的資料來 popup到 marker座標中來呈現資料
function makePopupContent(station) {
  let return_html =     
    `<div>
    <h2>${station.properties.name} - ${station.properties.category}</h2>
    <p>${station.properties.address}</p>
  `
  switch (station.properties.category) {
    case "公車":
      var category = "公車站";
      return_html =     
      `<div>
      <h2>${station.properties.name} - ${station.properties.category}</h2>
    </div>
    `
      break;
      case "自行車":
        let avaiable = station.properties.available == undefined ? '目前資料提供不全' :  station.properties.available ;
        return_html =     
        `<div>
        <h2>${station.properties.name} - ${station.properties.category}</h2>
        <p>${station.properties.address}</p>
          <p>自行車可容納數量: <span class='badge bg-success'>${station.properties.bikesCapacity}</span></p>
            <p>可租借的數量: <span class='badge bg-danger'>${avaiable}</span></p>
      </div>
      `
        break;
      case "bike_Route":
        return_html =     
        `<div>
        <h2>自行車路線 - ${station.properties.route_Name}</h2>
        </div>
      `
        break;
  }
  return return_html;
}


/*---------------點擊事件---------------*/


let fly_Marker;
function fly_To_Marker(lat, lng, content) {
  let go_Marker = L.AwesomeMarkers.icon({
    markerColor: 'red',
    prefix: 'fa',
    icon: 'crosshairs'
  });
  if (fly_Marker) {
    map.removeLayer(fly_Marker);
  }
  fly_Marker = L.marker([lat, lng], {
    icon: go_Marker
  }).bindPopup(content).openPopup().addTo(map);
  map.flyTo([lat, lng], 16, {
    duration: 3 // 移動動畫時間
  });
  // 設立延遲，3000毫秒(3秒)，搭配上述的移動動畫，要在動畫結束之後才能顯性 popup內容
  setTimeout(function () {
    L.popup({
        closeButton: false, // 把 popup畫面框中右上角的 X 去除
        offset: L.point(0, -35) // 讓 popup 畫面框不要擋住 icon
      }).setLatLng([lat, lng]) // 設定飛往座標
      .setContent(content) // 設定內容，運用上面有寫到的函式
      // .setContent(makePopupContent(feature)) // 設定內容，運用上面有寫到的函式
      .openOn(map) // 自動打開
  }, 3000);
}


// 增加地圖中的 Control
function L_Control_Add(tag, class_name, i_Content, position) {
  L.Control.MyControl = L.Control.extend({
    onAdd: function (map) {
      var el = L.DomUtil.create(tag, class_name);
      el.innerHTML = i_Content;
      return el;
    },
    onRemove: function (map) {
      // Nothing to do here
    }
  });
  L.control.myControl = function (opts) {
    return new L.Control.MyControl(opts);
  }
  L.control.myControl({
    position: position
  }).addTo(map);

}

// API KEY 驗證
// 來源：https://ithelp.ithome.com.tw/articles/10213895
let GetAuthorizationHeader = function () {
  var AppID = 'e32637236ea242abb50177076c6c00c6';
  var AppKey = 'qiXPXVC8HDrd4e0OCGH3X8l2tlY';

  var GMTString = new Date().toGMTString();
  var ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  var HMAC = ShaObj.getHMAC('B64');
  var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

  return {
    'Authorization': Authorization,
    'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/
  }; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
}