/*---------------獲取設備當前的所在位置---------------*/
/* showPostion函式: 用來去抓取當前位置 */
function showPosition(position) {
  enableHighAccuracy: true;
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  // 把地圖設定經緯度及縮放等級
  map.setView([latitude, longitude], 18);

  const blueMarker = L.icon.pulse({
    iconSize: [20, 20],
    color: '#2e72f0',
    fillColor: '#2e72f0'
  })
  // 設定所在位置的icon
  const selfPos = L.marker([position.coords.latitude, position.coords.longitude], {
    icon: blueMarker
  }).bindPopup('目前位置')
  map.addLayer(selfPos)

  // 回到當前位置
  const goBackPosition = document.querySelector('.js-goBackPosition')
  goBackPosition.addEventListener('click', () => {
    map.setView([position.coords.latitude, position.coords.longitude], 17)
  })
}


/* ---- HTML5 ---- */
// showError(error): 當地圖讀取不到當前位置時，會直接指定到 position的座標位置
function showError(error) {
  var position = {
    coords: {
      latitude: '22.620894',
      longitude: '120.311859'
    },
    // zoom: 7
  }
  switch (error.code) {
    // 使用者拒絕開啟當前定位位置
    case error.PERMISSION_DENIED:
      alert('讀取不到您目前的位置')
      showPosition(position)
      break
      // 該定位位置讀取不到
    case error.POSITION_UNAVAILABLE:
      alert('讀取不到您目前的位置')
      showPosition(position)
      break
      // 讀取定位位置時間太長
    case error.TIMEOUT:
      alert('讀取位置逾時')
      showPosition(position)
      break
      // 未知的錯誤
    case error.UNKNOWN_ERROR:
      alert('Error')
      showPosition(position)
      break
  }
}



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
  let return_html = `<div>
      <h2>${station.properties.name} - ${station.properties.category}</h2>
      <p>${station.properties.address}</p>
    </div>
    `;
  switch (station.properties.category) {
    case "台鐵":
      var category = "火車站";
      break;
    case "捷運":
      var category = "捷運站";
      break;
    case "輕軌":
      var category = "輕軌站";
      break;
    case "公車":
      var category = "公車站";
      return_html = `<div>
      <h2>${station.properties.name} - ${station.properties.category}</h2>
      <p>經度：${station.properties.latitude}</p>
      <p>緯度：${station.properties.longitude}</p>
    </div>
    `
      break;
  }
  return return_html;
}

// <div>
//         <h2>${station.properties.name} - ${station.properties.category}</h2>
//         <p>${station.properties.address}</p>
//         <p>溫度: ${station.properties.T}°C</p>
//         <p>降雨機率: ${station.properties.PoP6h}%</p>
//     </div>
/* <p>溫度: ${station.properties.T}°C</p>
<p>體感溫度: ${station.properties.AT}°C</p>
<p>降雨機率: ${station.properties.PoP6h}%</p>
<p>天氣現象: ${station.properties.Wx}</p>
<p>相對溼度: ${station.properties.RH}%</p> */



/*---------------點擊事件---------------*/



// 移動到指定座標
function fly_To_Marker(lat, lng, feature) {
  map.flyTo([lat, lng], 16, {
    duration: 3 // 移動動畫時間
  });

  // 設立延遲，3000毫秒(3秒)，搭配上述的移動動畫，要在動畫結束之後才能顯性 popup內容
  setTimeout(function () {
    L.popup({
        closeButton: false, // 把 popup畫面框中右上角的 X 去除
        offset: L.point(0, -35) // 讓 popup 畫面框不要擋住 icon
      }).setLatLng([lat, lng]) // 設定飛往座標
      .setContent(makePopupContent(feature)) // 設定內容，運用上面有寫到的函式
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