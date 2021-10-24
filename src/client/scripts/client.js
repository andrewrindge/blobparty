const socket = io();

chatBox = document.getElementById('chat')

chatBox.onkeydown = function(e){
    if (!e) e = window.event;
    var keyCode = e.code || e.key;
    if (keyCode == 'Enter' && chatBox.value){
        socket.emit("chat-message", chatBox.value)
        chatBox.value = ""
    }
}