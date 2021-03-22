-- MS_SQL用法: CHARINDEX(City, "高雄市鼓山區臨海二路17-1號B1")
-- MySQL用法:  instr("高雄市鼓山區臨海二路17-1號B1", City)

SELECT * FROM get_weather
            WHERE Day = '2021-2-18'
            AND TIME < '18:51:00'
            AND instr('臺南市', City) != 0
            AND instr('柳營區', District) != 0
			ORDER BY TIME DESC
            LIMIT 1


-- 將火車站站名資料的 __站弄掉 -> __火車站
UPDATE transportation_copy SET name = CONCAT(substr(name , 1, CHAR_LENGTH(name)-1), '火車站') WHERE C_id = 1