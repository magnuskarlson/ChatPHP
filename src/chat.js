/**author: magnus karlson */

const print = console.log
var lastMessageContent = ""
var lastMessageTimestamp = 0
var lastMessageSid = 0
var currentTheme = ""
var focused = true


window.onfocus = function() {
    focused = true
}
window.onblur = function() {
    focused = false
}

$(document).ready(function() {
    /**setting vars */
    currentTheme = getCookie('chat_theme')

    /**updating chat content */
    setInterval(updateChatContent, 250)
    setInterval(updateUsedWords, 1000);
    setTheme()

    /**setting last username */
    var name = getCookie('chat_username')
    if (name != '') {
        $('#chatUsername').val(name);
    }

    /**setting theme */
    $("[id*='changeTheme']").click(function() {
        var theme = $(this).attr('id').split('_')[1]
        if (currentTheme != theme) {
            currentTheme = theme
            setCookie('chat_theme', theme)
            setTheme()
        }
    })
})
$(document).on('click', "[id*='message']", function() {
    var id = $(this).attr('id').split('_')[1]
    $('#message_' + id + '').remove()
    $.ajax({
        url: 'ajax.php',
        type: "get",
        dataType: "html",
        data: {
            action: 'chat_remove_message',
            sid: id
        },
        success: function(msg) {
            suc('Message removed.')
        }
    })
})

$(document).on('keypress', function(e) {
    if (e.which != 13) {
        return
    }
    var username = $('#chatUsername').val(),
        message = $("#chatMessage").val()
    if (username.length < 3 || username.length > 20) {
        error("Entered name length must be between 3 to 30 chars!")
        return
    }
    if (message.length < 1 || message.length > 600) {
        error('Entered message length must be between 1 to 600 chars!');
        return
    }
    /**spam check */
    if (lastMessageContent == message || Date.now() - lastMessageTimestamp < 250) {
        error("Stop! Spamming isn't allowed!");
        return
    }
    lastMessageContent = message
    lastMessageTimestamp = Date.now()
    hideResponseTimeout()
    $('#chatMessage').val("")

    /**setting username cookie */
    var name = getCookie('chat_username')
    if (name != username) {
        setCookie('chat_username', username)
    }
    /**request to server */
    $.ajax({
        url: "ajax.php",
        type: "get",
        dataType: "html",
        data: {
            action: "chat_submit_message",
            username: username,
            message: message
        },
        success: function(msg) {

        }
    })
})

function setTheme() {
    if (currentTheme == '' || currentTheme == 'light') {
        $('body').css('background', 'white')
        $('input[type=text]').css('background', 'white')
        $('input[type=text]').css('color', 'black')
        $('.chatbox').css('color', 'black')
        $('#logo').css('color', 'black');
        $('p').css('color', 'black');
    }
    if (currentTheme == 'dark') {
        $('body').css('background', '#383838')
        $('input[type=text]').css('background', '#383838')
        $('input[type=text]').css('color', '#d4d4d4')
        $('.chatbox').css('color', '#d4d4d4')
        $('#logo').css('color', '#d4d4d4');
        $('p').css('color', '#d4d4d4');
    }
}

/**chat content solution */
function updateChatContent() {
    $.ajax({
        url: "ajax.php",
        type: "get",
        dataType: "json",
        data: {
            action: "chat_load_content"
        },
        success: function(msg) {
            if (lastMessageSid != msg['last']) {
                $('.chatbox').html(fixText(msg['content']))
                lastMessageSid = msg['last']
                if (!focused) {
                    var audio = new Audio('sounds/msn_alert.mp3')
                    audio.play()
                }
            }
        }
    })
}

function updateUsedWords() {
    $.ajax({
        url: "ajax.php",
        type: "get",
        dataType: "html",
        data: {
            action: "most_used_words"
        },
        success: function(msg) {
            $('#mostUsedWords').html(msg);
        }
    })
}

var map = {
    "<3": "\u2764\uFE0F",
    "</3": "\uD83D\uDC94",
    ":D": "\uD83D\uDE00",
    ":)": "\uD83D\uDE03",
    ";)": "\uD83D\uDE09",
    ":(": "\uD83D\uDE12",
    ":p": "\uD83D\uDE1B",
    ";p": "\uD83D\uDE1C",
    ":'(": "\uD83D\uDE22"
};

function escapeSpecialChars(regex) {
    return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
}

function fixText(text) {
    for (var i in map) {
        var regex = new RegExp(escapeSpecialChars(i), 'gim')
        text = text.replace(regex, map[i])
    }
    return text
}

/**response showing and hiding solution */
function suc(msg) {
    hideResponse()
    $('#response').html(msg)
    $('#response').css('display', 'inline-block')
    $('#response').css('background', '#d4edda')
    $('#response').css('color', '#155724')
}

function error(msg) {
    hideResponse()
    $('#response').html(msg)
    $('#response').css('display', 'inline-block')
    $('#response').css('background', '#eb5050')
    $('#response').css('color', '#ededed')
}

var lastResponse = -1

function hideResponse() {
    if (lastResponse != -1) {
        clearTimeout(lastResponse)
    }
    lastResponse = setTimeout(hideResponseTimeout, 5000)
}

function hideResponseTimeout() {
    lastResponse = -1
    $('#response').css('display', 'none')
}

/**cookies for local things */
function getCookie(key) {
    var name = key + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(key, value) {
    document.cookie = key + '=' + value;
}