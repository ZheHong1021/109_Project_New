$(function(){
  let results_Food;
  // 旅遊
  $('.container-food .city_container').on('click', function () {
    // 換個縣市，就清空
    let food_Category = []
    $('.Food-category-List').html('');
    $('.Food-category-Items').html('');

    let city_name = $(this).attr('id');
    let city_name_TW = $(this).attr('city_name_Tw');
    $('div.bus-loading').show();

    // 設立一個 Loading動畫的時間 : 1.5s
    setTimeout(function () {
      // 當開始跑Loading時，不能再有任何動作
      $('div.bus-loading').hide();
      $('.container-food').hide();
      $('div.food_Category').show();
      $('h2.Food_city_Name').html(city_name_TW);
    }, 1500);

    // 如果點選的是 Other
    if ($(this).attr('id') == 'Other') {
      $('.filter_Container_Food .filter_City_List').show();
    } else {
      $('.filter_Container_Food .filter_City_List').hide();
    }

    // 預設篩選單先呈現出來，還有顏色
    $('div.filter_Container').show();

    $('i#go_filter').css('color', '#8c7ae6');

    if ($(this).attr('id') != 'Other') {
      $.ajax({
        url: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/' + city_name + '?$select=Name%2CPosition%2CPhone%2CAddress&$format=JSON',
        dataType: 'json',
        contentType: 'json',
        headers: GetAuthorizationHeader(), // 憑證 API token
        success: function (result) {
          console.log(result);
          results_Food = $.parseJSON(JSON.stringify(result));
          

          Object.keys(result).forEach(function (value, key) {

            $('.Food-category-Items').append(`
                <div class="food-item text-center">
                <h2 class="view_Name ">
                    ${result[value]["Name"]}
                </h2>
                </div>`);
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
  });

  let filter_isClicked_Food;
  $('i#go_filter').on('click', function () {
    if (filter_isClicked_Food) {
      $(this).css('color', '#8c7ae6');
      filter_isClicked_Food = false;
      $('div.filter_Container_Food').show(1000);
    } else {
      $(this).css('color', '#000');
      filter_isClicked_Food = true;
      $('div.filter_Container_Food').hide(1000);
    }
    console.log(filter_isClicked_Food);
  });


  $('.food_Category .go_city_Container').on('click', function () {
    $('div.bus-loading').show();
    // 設立一個 Loading動畫的時間 : 1.5s
    setTimeout(function () {
      // 篩選要清空
      $('div.filter_Container').hide();
      $('i#go_filter').css('color', '#000');
      filter_isClicked = false;

      $('div.bus-loading').hide();
      $('div.food_Category').hide();
      $('.container-food').show();
    }, 1500);
  });


  
   



});