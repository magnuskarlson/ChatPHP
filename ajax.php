<?php 
require_once 'config.php';
$action = $_REQUEST['action'];

function analyzeMessage($message){
    global $db;
    $a = explode(" ", $message);
    $a = array_count_values($a);
    foreach ($a as $word => $count){
        if(strlen($word) < 3){
            continue;
        }
        if(wordExsists($word)){
            $q = $db -> prepare("update chat_used_words set counter = counter + $count where word = :word");
            $q -> execute(array(":word" => $word));
        }else{
            $q = $db -> prepare("insert into chat_used_words(word, counter) values(:word, '$count')");
            $q -> execute(array(":word" => $word));
        }
    }
}
function wordExsists($word){
    global $db;
    $q = $db -> prepare("select COUNT(sid) from chat_used_words where word = :word");
    $q -> execute(array(":word" => $word));
    return  $q -> fetchColumn();
}
if($action == 'chat_load_content'){
    $q = $db -> query('select * from chat_content order by sid desc limit 30');
    $msg['content'] = '';
    $msg['last'] = 0;
    foreach($q as $r){
        //first message is the higest one
        if($msg['last'] == 0){
            $msg['last'] = $r['sid'];
        }
        $admin = 1;
        $removeBtn = $admin > 0 ? "X" : "";
        $msg['content'].= '<div id="message_'.$r['sid'].'" class = "chatline"><b>'.htmlentities($r['username']).'</b> '.htmlentities($r['message']).'</div>';
    }
    echo json_encode($msg);
}
if($action == 'chat_submit_message'){
    $username = $_REQUEST['username'];
    $message = $_REQUEST['message'];
    analyzeMessage($message);
    $q = $db -> prepare("insert into chat_content(username, message, date) values(:username, :message, UNIX_TIMESTAMP())");
    $q -> execute(array(":username" => $username, ":message" => $message));
    echo '';
}
if($action == 'chat_remove_message'){
    $sid = intval($_REQUEST['sid']);
    echo "$sid";
    $q = $db -> query('delete from chat_content where sid = '.$sid.'');
}
if($action == 'most_used_words'){
    $q = $db -> query('select * from chat_used_words order by counter desc limit 30')->fetchAll();
    $str = '';
    foreach($q as $r){
        $str .= $r['word'].': '.$r['counter'].', ';
    }
    echo substr($str, 0, -2);
}
exit;
?>