$(function(){
    
  let results_Travel;
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
          results_Travel = $.parseJSON(JSON.stringify(result));
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
          // console.log(travel_Category);
          for (let i = 0; i < travel_Category.length; i++) {
            $('.category-List').append(`<span class="badge bg-secondary category_item" data-category="${travel_Category[i]}" >${travel_Category[i]}</span>`);
          }
          $('.category-Items').append(`
              <div class="travel-item text-center">
              <h2 class="view_Name ">
                  無查詢到資料
              </h2>
              </div>`);
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

  $('span#city_filter').on('click', function () {
    // 換個縣市，就清空
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

    // 其他縣市的寫法
    let city_name = $(this).attr('city_filter');
    // console.log(city_name);
    $.ajax({
      url: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/' + city_name + '?$format=JSON',
      dataType: 'json',
      contentType: 'json',
      headers: GetAuthorizationHeader(), // 憑證 API token
      success: function (result) {
        // console.log(result);
        results_Travel = $.parseJSON(JSON.stringify(result));
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
        // console.log(travel_Category);
        for (let i = 0; i < travel_Category.length; i++) {
          $('.category-List').append(`<span class="badge bg-secondary category_item" data-category="${travel_Category[i]}" >${travel_Category[i]}</span>`);
        }

        $('.category-Items').append(`
        <div class="travel-item text-center">
        <h2 class="view_Name ">
            無查詢到資料
        </h2>
        </div>`);
        
      },
      // 當Ajax請求失敗
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
    console.log(filter_isClicked);
  });

  $('button.confirm_items').on('click', function () {
    if (filter_isClicked) {
      $('i#go_filter').css('color', '#8c7ae6');
      filter_isClicked = false;
      $('div.filter_Container').show(1000);
    } else {
      $('i#go_filter').css('color', '#000');
      filter_isClicked = true;
      $('div.filter_Container').hide(1000);
    }
    console.log(filter_isClicked);
  });

  // 打開旅遊的介紹
  open_Info = function(info_number){
    let travel_info_Image = results_Travel[info_number]['Picture']['PictureUrl1'] ? ` <img src = "${results_Travel[info_number]['Picture']['PictureUrl1']}" alt ="${results_Travel[info_number]['Name']}照片"></img>
    <p class="fw-bolder mt-3">圖片提供：${results_Travel[info_number]['Picture']['PictureDescription1']}</p>` : '<p class="fw-bolder mt-3">尚未提供圖片</p>';
    
    // 先清空再加入
    // $('#travel_InfoLabel').html('hello');
    $('#travel_InfoLabel').html(results_Travel[info_number]["Name"]);
    $('div#travel_info_body').html('');
    $('div#travel_info_body').append(`
        <div class = "travel_Describe_Container">
        <p class = "mx-3">${results_Travel[info_number]['DescriptionDetail']}</p>
        </div>
        <div class = "travel_Image_Container d-flex align-items-center m-3" style="flex-direction: column">
          ${travel_info_Image}
       
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
      <p>聯絡電話：${results_Travel[$(this).attr("data-number")]['Phone']}</p>
      ${results_Travel[$(this).attr("data-number")]['WebsiteUrl'] ? `<p><a href = "${results_Travel[$(this).attr("data-number")]["WebsiteUrl"]}" target="_blank" style="color: #0984e3">網站連結：${results_Travel[$(this).attr("data-number")]["WebsiteUrl"]}</a></p>` : '<p>網站連結：尚未公開</p>'}
      <div class="d-flex justify-content-center">
      <button type="button" class = "btn btn-info mb-2 fw-bolder" onclick="open_Info('${$(this).attr("data-number")}')" data-bs-toggle="modal"  data-bs-target="#travel_Info">查看介紹</button>
      </div>
      `;
    console.log(position);
    fly_To_Marker(Lat, Lng, fly_Marker_Content);
  });


  $('.travel_Category .go_city_Container').on('click', function () {
    $('div.bus-loading').show();
    // 設立一個 Loading動畫的時間 : 1.5s
    setTimeout(function () {
      // 篩選要清空
      $('div.filter_Container').hide();
      $('i#go_filter').css('color', '#000');
      filter_isClicked = false;

      $('div.bus-loading').hide();
      $('div.travel_Category').hide();
      $('.container-travel').show();
    }, 1500);
  });


  // 定義用來選取的分類內容
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
      // 如果選取到的話，就將該文字內容 push到陣列中
      if ($('.category-List').children().eq(i).hasClass('bg-success')) {
        choose_Items.push($('.category-List').children().eq(i).text());
      }
    }
    if (choose_Items.length > 0) {

      // 如果搜尋欄有輸入的話就進行，反之沒有就進行下面的 【2】
      if ($('input.search-value').val()) {
        Object.keys(results_Travel).forEach(function (value, key) {  
          let is_Span_1 = results_Travel[value]['Class1'] ? `<span class = "badge bg-success">${results_Travel[value]['Class1']}</span>` : "";
          let is_Span_2 = results_Travel[value]['Class2'] && results_Travel[value]['Class2'] !== results_Travel[value]['Class1']? `<span class = "badge bg-success">${results_Travel[value]['Class2']}</span>` : "";
          let is_Span_3 = results_Travel[value]['Class3'] && results_Travel[value]['Class3'] !== results_Travel[value]['Class2']? `<span class = "badge bg-success">${results_Travel[value]['Class3']}</span>` : "";
      
          if ( choose_Items.includes(results_Travel[value]['Class1']) 
              || choose_Items.includes(results_Travel[value]['Class2']) 
              || choose_Items.includes(results_Travel[value]['Class3']) 
              && (results_Travel[value]['Name'].includes($('input.search-value').val()) 
              || results_Travel[value]['Address'].includes($('input.search-value').val()))) {
            $('.category-Items').append(`
            <div class="travel-item" travel-id="${results_Travel[value]['ID']}">
              <h2 class="view_Name">${results_Travel[value]['Name']}
              </h2>
                  <div class ="view_Span">
                      ${is_Span_1}
                      ${is_Span_2}
                      ${is_Span_3}
                  </div>
              <h3 class="view_address">${results_Travel[value]['Address']}
                <i class="fas fa-location-arrow" id="go_View_Pos" title="前往該座標位置"  data-number = "${value}" pos-Lat="${results_Travel[value]["Position"]["PositionLat"]}" pos-Lng="${results_Travel[value]["Position"]["PositionLon"]}" view="${results_Travel[value]['Name']}"></i>
              </h3>
              <h3 class="view_opentime">
                  <i class="far fa-clock" title="開放時間"></i>
                  ${results_Travel[value]['OpenTime'] != 'N/A' || results_Travel[value]['OpenTime']? results_Travel[value]['OpenTime'] : "未公開"}
              </h3>

              </div>`);
          }
        })
        // 【2】
          } else {
            Object.keys(results_Travel).forEach(function (value, key) {
              let is_Span_1 = results_Travel[value]['Class1'] ? `<span class = "badge bg-success">${results_Travel[value]['Class1']}</span>` : "";
              let is_Span_2 = results_Travel[value]['Class2'] && results_Travel[value]['Class2'] !== results_Travel[value]['Class1']? `<span class = "badge bg-success">${results_Travel[value]['Class2']}</span>` : "";
              let is_Span_3 = results_Travel[value]['Class3'] && results_Travel[value]['Class3'] !== results_Travel[value]['Class2']? `<span class = "badge bg-success">${results_Travel[value]['Class3']}</span>` : "";
              if (choose_Items.includes(results_Travel[value]['Class1']) 
              || choose_Items.includes(results_Travel[value]['Class2']) 
              || choose_Items.includes(results_Travel[value]['Class3']) ) {
                $('.category-Items').append(`
                <div class="travel-item" travel-id="${results_Travel[value]['ID']}">
                  <h2 class="view_Name">${results_Travel[value]['Name']}</h2>
                  <div class ="view_Span">
                      ${is_Span_1}
                      ${is_Span_2}
                      ${is_Span_3}
                  </div>
                  <h3 class="view_address">${results_Travel[value]['Address']}
                    <i class="fas fa-location-arrow" id="go_View_Pos" title="前往該座標位置" data-number = "${value}" pos-Lat="${results_Travel[value]["Position"]["PositionLat"]}" pos-Lng="${results_Travel[value]["Position"]["PositionLon"]}" view="${results_Travel[value]['Name']}"></i>
                  </h3>
                  <h3 class="view_opentime">
                      <i class="far fa-clock" title="開放時間"></i>
                      ${results_Travel[value]['OpenTime'] != 'N/A' || results_Travel[value]['OpenTime']  ? results_Travel[value]['OpenTime'] : "未公開"}
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
      
      Object.keys(results_Travel).forEach(function (value, key) {
        let is_Span_1 = results_Travel[value]['Class1'] ? `<span class = "badge bg-success">${results_Travel[value]['Class1']}</span>` : "";
        let is_Span_2 = results_Travel[value]['Class2'] && results_Travel[value]['Class2'] !== results_Travel[value]['Class1']? `<span class = "badge bg-success">${results_Travel[value]['Class2']}</span>` : "";
        let is_Span_3 = results_Travel[value]['Class3'] && results_Travel[value]['Class3'] !== results_Travel[value]['Class2']? `<span class = "badge bg-success">${results_Travel[value]['Class3']}</span>` : "";
          $('.category-Items').append(`
          <div class="travel-item" travel-id="${results_Travel[value]['ID']}">
            <h2 class="view_Name">${results_Travel[value]['Name']}</h2>
            <div class ="view_Span">
                ${is_Span_1}
                ${is_Span_2}
                ${is_Span_3}
            </div>
            <h3 class="view_address">${results_Travel[value]['Address']}
              <i class="fas fa-location-arrow" id="go_View_Pos" title="前往該座標位置"  data-number = "${value}" pos-Lat="${results_Travel[value]["Position"]["PositionLat"]}" pos-Lng="${results_Travel[value]["Position"]["PositionLon"]}" view="${results_Travel[value]['Name']}"></i>
            </h3>
            <h3 class="view_opentime">
                <i class="far fa-clock" title="開放時間"></i>
                ${results_Travel[value]['OpenTime'] != 'N/A' ? results_Travel[value]['OpenTime'] : "未公開"}
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
      Object.keys(results_Travel).forEach(function (value, key) {
        let is_Span_1 = results_Travel[value]['Class1'] ? `<span class = "badge bg-success">${results_Travel[value]['Class1']}</span>` : "";
        let is_Span_2 = results_Travel[value]['Class2'] && results_Travel[value]['Class2'] !== results_Travel[value]['Class1']? `<span class = "badge bg-success">${results_Travel[value]['Class2']}</span>` : "";
        let is_Span_3 = results_Travel[value]['Class3'] && results_Travel[value]['Class3'] !== results_Travel[value]['Class2']? `<span class = "badge bg-success">${results_Travel[value]['Class3']}</span>` : "";
        if (results_Travel[value]['Name'].includes($('input.search-value').val()) || results_Travel[value]['Address'].includes($('input.search-value').val())) {
          $('.category-Items').append(`
          <div class="travel-item" travel-id="${results_Travel[value]['ID']}">
              <h2 class="view_Name">${results_Travel[value]['Name']}</h2>
              <div class ="view_Span">
                  ${is_Span_1}
                  ${is_Span_2}
                  ${is_Span_3}
              </div>
            <h3 class="view_address">${results_Travel[value]['Address']}
              <i class="fas fa-location-arrow" id="go_View_Pos" title="前往該座標位置"  data-number = "${value}" pos-Lat="${results_Travel[value]["Position"]["PositionLat"]}" pos-Lng="${results_Travel[value]["Position"]["PositionLon"]}" view="${results_Travel[value]['Name']}"></i>
            </h3>
            </div>`);
        }
      })
    } else {
      Object.keys(results_Travel).forEach(function (value, key) {
        let is_Span_1 = results_Travel[value]['Class1'] ? `<span class = "badge bg-success">${results_Travel[value]['Class1']}</span>` : "";
        let is_Span_2 = results_Travel[value]['Class2'] && results_Travel[value]['Class2'] !== results_Travel[value]['Class1']? `<span class = "badge bg-success">${results_Travel[value]['Class2']}</span>` : "";
        let is_Span_3 = results_Travel[value]['Class3'] && results_Travel[value]['Class3'] !== results_Travel[value]['Class2']? `<span class = "badge bg-success">${results_Travel[value]['Class3']}</span>` : "";
        $('.category-Items').append(`
            <div class="travel-item" travel-id="${results_Travel[value]['ID']}">
              <h2 class="view_Name">${results_Travel[value]['Name']}</h2>
              <div class ="view_Span">
                  ${is_Span_1}
                  ${is_Span_2}
                  ${is_Span_3}
              </div>
              <h3 class="view_address">${results_Travel[value]['Address']}
                <i class="fas fa-location-arrow" id="go_View_Pos" title="前往該座標位置"  data-number = "${value}" pos-Lat="${results_Travel[value]["Position"]["PositionLat"]}" pos-Lng="${results_Travel[value]["Position"]["PositionLon"]}" view="${results_Travel[value]['Name']}"></i>
              </h3>
              </div>`);
      })
    }
  });


});