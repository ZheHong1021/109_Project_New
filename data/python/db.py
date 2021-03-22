import pymysql.cursors


class DB:
    def __init__(self):
        self.config = {
            'host': '127.0.0.1',
            'port': 3306,
            'user': 'root',
            'password': '123456',
            'db': '109p2',
            'charset': 'utf8mb4',
            'cursorclass': pymysql.cursors.DictCursor,
        }

    def Connect(self):
        try:
            self.connection = pymysql.connect(**self.config)
            print("Connect Success")
        except Exception as e:
            print(e)

    def Truncate(self):
        with self.connection.cursor() as cursor:
            try:
                # 執行sql語句，插入記錄
                sql = 'TRUNCATE TABLE get_weather'
                cursor.execute(sql)
                # 沒有設定預設自動提交，需要主動提交，以儲存所執行的語句
                self.connection.commit()
                print("Truncate Success")
            except Exception as ex:
                print(ex)

    def Insert_Info(self, info):
        with self.connection.cursor() as cursor:
            try:
                # 執行sql語句，插入記錄
                sql = 'INSERT INTO get_weather (City, District, Geocode, Day, Time, T, TD, RH, WD, WS, BF, AT, Wx, Wx_n, PoP6h, PoP12h, get_day) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
                cursor.execute(sql, info)
                # 沒有設定預設自動提交，需要主動提交，以儲存所執行的語句
                self.connection.commit()
                # print("Insert Success")
            except Exception as ex:
                print(ex)

    def Close_DB(self):
        self.connection.close()
        print('Close Over')


# db = DB()
# db.Connect()
# db.Truncate()
# db.Insert_Info(('台南市', '松山區', '6300100', '2021/2/15', '18:00:00',
#                 20, 15, 74, '偏東風', 4, 3, 18, '晴', 1, 10, 10, '2021/2/15'))
# db.Close_DB()
