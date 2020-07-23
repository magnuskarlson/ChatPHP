<?php
require_once 'config.php';
if ($db == null) {
    die("andmebaas puudu!");
}
?>
<html>

<head>
    <title>Perfect Chat</title>
    <meta charset="UTF-8">
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <link rel="shortcut icon" type="image/png" href="../imgs/icon.png" />
    <script src='src/chat.js'></script>
    <link rel="stylesheet" href="src/style.css">
</head>

<body>
    <div class='content' id='logo' style="font-family: 'graffiti', serif; font-size: 100px;">
        perfect chat
    </div>
    <div class='content'>
        <input type='button' value='Light' id='changeTheme_light' style='background: #e6e6e6; color: black;'>
        <input type='button' value='Dark' id='changeTheme_dark' style='background: black; color: #e6e6e6;'>
        <span id='response'></span>
        <div class='chatbox'></div>
        <input type='text' id='chatUsername' placeholder='Your name...'><br>
        <input type='text' id='chatMessage' placeholder='Your message...'><br>
        <p id='mostUsedWords'></p>
        <p style='font-size: 10px;'>©11/18/19 MK</p>
    </div>
</body>

</html>