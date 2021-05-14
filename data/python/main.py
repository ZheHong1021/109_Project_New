# 【import packages】
# [Manage XML Data]
import pymysql.cursors
import pandas as pd
import numpy as np
from bs4 import BeautifulSoup
# [Set Time & Path]
import datetime
import os
from db import DB

# [Connect SQL]
# import pyodbc
import pymysql

# [connect API]
import urllib.request    # 存取網頁裡的檔案
import zipfile  # 讀取所下載的zip檔


# set dir
today = str(datetime.date.today())  # 抓取今日時間
cwb_data = "cwb_weather_data"       # 要建立的資料夾
if not os.path.exists(cwb_data):
    os.mkdir(cwb_data)

# Api_Key
Authorization = "CWB-91F9C668-524E-4E12-9D13-DEF7CE296A3B"  # 金鑰_id
# res_JSON = "http://opendata.cwb.gov.tw/opendataapi?dataid=F-D0047-093&authorizationkey=" + Authorization
# res_XML = "http://opendata.cwb.gov.tw/opendataapi?dataid=F-D0047-093&authorizationkey=CWB-3FB0188A-5506-41BE-B42A-3785B42C3823"
res_XML = "http://opendata.cwb.gov.tw/opendataapi?dataid=F-D0047-093&authorizationkey=" + Authorization
urllib.request.urlretrieve(res_XML, "F-D0047-093.zip")
f = zipfile.ZipFile('F-D0047-093.zip')


# 使用類似html網頁爬蟲的方式，抓取資料並用 List整理
file = ['63_72hr_CH.xml', '64_72hr_CH.xml', '65_72hr_CH.xml', '66_72hr_CH.xml', '67_72hr_CH.xml', '68_72hr_CH.xml',
        '09007_72hr_CH.xml', '09020_72hr_CH.xml', '10002_72hr_CH.xml', '10004_72hr_CH.xml', '10005_72hr_CH.xml',
        '10007_72hr_CH.xml', '10008_72hr_CH.xml', '10009_72hr_CH.xml', '10010_72hr_CH.xml', '10013_72hr_CH.xml',
        '10014_72hr_CH.xml', '10015_72hr_CH.xml', '10016_72hr_CH.xml', '10017_72hr_CH.xml', '10018_72hr_CH.xml',
        '10020_72hr_CH.xml']

CITY = []   # 縣市
DISTRICT = []  # 鄉鎮區
GEOCODE = []  # 區域代號
DAY = []      # 日期
TIME = []     # 時間
T = []        # weather[0]: 溫度
TD = []       # weather[1]: 露點溫度
RH = []       # weather[2]: 相對濕度
PoP6h = []    # weather[3]: 6小時降雨機率
PoP12h = []   # weather[4]: 12小時降雨機率
WD = []       # weather[5]: 風向
WS = []       # weather[6]: 風速
BF = []       # weather[6]: 蒲福風級
CI = []       # weather[7]: 舒適度指數
AT = []       # weather[8]: 體感溫度
Wx = []       # weather[9]: 天氣現象
Wx_n = []     # weather[9]: 天氣現象(代號，01:晴、 04:多雲、 07:陰、 08:短暫雨)
get_day = []
# weather[10]: 天氣預報綜合描述(我們不需要用到)

for filename in file:
    try:
        data = f.read(filename).decode('utf8')
        # print(data)
        soup = BeautifulSoup(data, features="xml")
        city = soup.locationsName.text   # 捕捉縣市
        print("city= " + city)
        a = soup.find_all("location")  # 捕捉該縣市的鄉鎮區數量
        for i in range(0, len(a)):
            location = a[i]
            district = location.find_all("locationName")[0].text  # 將鄉鎮區的名稱捕捉下來
            # print(district)
            geocode = location.geocode.text  # geocode

            # 進入到 weatherElement，再一一抓取其底下的資料
            weather = location.find_all("weatherElement")

            # 抓取 Weather[x]的Description(不用理他)
            """
                for x in range(len(weather)):
                #     print("Weather[" + str(x) + "]")
                #     print(weather[x].find_all("description"))
                # print("--------------")
                """
            # 每一個鄉鎮區都有 24 items(每3小時捕捉，72小時就捕捉 24次)
            time = weather[1].find_all('dataTime')

            for j in range(0, len(time)):
                # 這邊抓取到每個時段的日期及時間，而資料中有個 "T"字串，我們不需要則用 split去除
                x = time[j].text.split("T")  # 此時的 x為一個 List
                # print(time[j].text)  # 2021-02-15T06:00:00+08:00
                # print(x)             # ['2021-02-15', '06:00:00+08:00']
                DAY.append(x[0])     # 捕捉日期 2021-02-15

                # 這邊抓取到每個時段的時間，而資料中有個 "+"字串，我們不需要則用 split去除
                time_1 = x[1].split("+")
                # print(x[1])          # 06:00:00+08:00
                # print(time_1)        # ['06:00:00', '08:00']
                TIME.append(time_1[0])  # 捕捉時間 06:00:00

                """接著陸續將剛剛捕捉到資料匯入到各個List中"""
                CITY.append(city)
                DISTRICT.append(district)
                GEOCODE.append(geocode)
                get_day.append(today)

            # 抓取溫度
            for t in weather[0].find_all("value"):
                T.append(t.text)
            # 抓取露點溫度
            for td in weather[1].find_all("value"):
                TD.append(td.text)
            # 抓取相對溼度
            for rh in weather[2].find_all("value"):
                RH.append(rh.text)
            # 抓取風向
            for wd in weather[5].find_all("value"):
                WD.append(wd.text)

            # 抓取風速及蒲福風級
            ws = weather[6].find_all("value")
            for k in range(0, len(ws), 2):
                WS.append(ws[k].text)
                BF.append(ws[k+1].text)

            # 抓取體感溫度
            for at in weather[8].find_all("value"):
                AT.append(at.text)

            # 抓取天氣現象及其代號(01:晴、 04:多雲、 07:陰、 08:短暫雨)
            wx = weather[9].find_all("value")
            for w in range(0, len(wx), 2):
                Wx.append(wx[w].text)
                Wx_n.append(wx[w+1].text)

            # 抓取 6小時降雨機率
            rain1 = weather[3].find_all("value")
            for l in range(0, len(rain1)):
                pop6 = rain1[l].text
                """這邊因為要配合其他資料每三個小時抓一次的關係，所以要用append兩次( 6 / 3 ) """
                PoP6h.append(pop6)
                PoP6h.append(pop6)

            # 抓取 12小時降雨機率
            rain2 = weather[4].find_all("value")
            for m in range(0, len(rain2)):
                pop12 = rain2[m].text
                """這邊因為要配合其他資料每三個小時抓一次的關係，所以要用append四次( 12 / 3 ) """
                PoP12h.append(pop12)
                PoP12h.append(pop12)
                PoP12h.append(pop12)
                PoP12h.append(pop12)
        print("----------------------")
    except:
        print("Some Error")
        break
# 關閉
f.close()


data = {"CITY": CITY, "DISTRICT": DISTRICT, "GEOCODE": GEOCODE, "DAY": DAY, "TIME": TIME, "T": T, "TD": TD, "RH": RH,
        "WD": WD, "WS": WS, "BF": BF, "AT": AT, "Wx": Wx, "Wx_n": Wx_n, "PoP6h": PoP6h, "PoP12h": PoP12h, "get_day": get_day}
df = pd.DataFrame(data, columns=["CITY", "DISTRICT", "GEOCODE", "DAY", "TIME", "T",
                                 "TD", "RH", "WD", "WS", "BF", "AT", "Wx", "Wx_n", "PoP6h", "PoP12h", "get_day"])

# # 【建立路徑存檔】
file_path = os.getcwd()
save_name = "taiwan_cwb" + today + ".csv"
save_name = file_path + "/" + cwb_data + "/" + save_name
df.to_csv(save_name, index=False, encoding="utf_8_sig")


# # 【匯入資料庫】
listdata = df.values.tolist()
# 護轎 db.py的類別 DB，在使用其底下的類別函式
db = DB()
db.Connect()
db.Truncate()

# 共 8332筆資料，跑完約 15MIN
for d in listdata:
    db.Insert_Info((d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7],
                    d[8], d[9], d[10], d[11], d[12], d[13], d[14], d[15], d[16]))

# db.Insert_Info(('台北市', '松山區', '6300100', '2021/2/15', '18:00:00',
#                 20, 15, 74, '偏東風', 4, 3, 18, '晴', 1, 10, 10, '2021/2/15'))

db.Close_DB()
