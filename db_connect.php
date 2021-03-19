<?php
$server = 'localhost';
// $server = '163.18.42.31';
$dbname = '109p2';
$user = 'root';
$passwd = '123456';
// $passwd = 'haha45La';


try {
  $conn = new PDO("mysql:host=" . $server . ";dbname=" . $dbname, $user, $passwd);
  $conn->exec("SET CHARACTER SET utf8");
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  "Connection failed: " . $e->getMessage();
}
