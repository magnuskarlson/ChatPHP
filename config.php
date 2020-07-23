<?php 
/**ANDMEBAASI KONFIGURATSIOON */
$database_host = '';
$database_user = '';
$database_pass = '';
$database_name = '';

try {
    $db = new PDO("mysql:host=$database_host;dbname=$database_name", $database_user, $database_pass);
    $db -> exec("set names utf8");
} catch (PDOException $e) {
    $db = null;
}
?>