$(function () {
  let get_bus_info = function (city) {
    route = [];
    // UI擷取所有縣市公車的路線總資訊
    $.ajax({
      url: 'https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeByFrequency/City/' + city + '?$format=JSON',
      // url: 'https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeByFrequency/City/Tainan?$format=JSON',
      dataType: 'json',
      headers: GetAuthorizationHeader(), // 憑證 API token
      success: function (result) {
        $('div#bus_result').append(`<h2>City= ${city}</h2><hr>`);
        // console.log(result);
        let bus_id_arr = [];
        let bus_name_arr = [];
        Object.keys(result).forEach(function (value, key) {
          let bus_Route_id = result[value]['RouteID'];
          let bus_Route_Name = result[value]['RouteName']['Zh_tw'];
          let bus_Route_Name_EN = result[value]['RouteName']['En'];
          if (bus_id_arr.includes(bus_Route_id) === false && bus_name_arr.includes(bus_Route_Name) === false) {
            bus_id_arr.push(bus_Route_id);
            bus_name_arr.push(bus_Route_Name);
            let bus_Route_Name_EN = result[value]['RouteName']['En'];
            $('div#bus_result').append(`<h2 class='my-3' style='text-align: left; font-weight: bolder;'>RouteID: ${bus_Route_id} ； RouteName: ${bus_Route_Name}； RouteName_EN: ${bus_Route_Name_EN}  </h2>`);
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
  }


  // get_bus_info('Tainan');
  // get_bus_info('Kaohsiung');
  get_bus_info('Taipei');

});