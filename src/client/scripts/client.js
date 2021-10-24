const socket = io();
const connectionsElement = document.getElementById('connections')

function addPlayer(id) {
    element = document.createElement('p')
    element.id = id
    element.textContent = id
    connectionsElement.appendChild(element)
}

socket.on('message', function(data) {
    console.log(data);
})

socket.on('joined', function(data) {
    addPlayer(data.id)
})

socket.on('players', function(data) {
    for (let id of data) {
        addPlayer(id)
    }
})

socket.on('playerDisconnect', function(data) {
    const element = document.getElementById(data)
    connectionsElement.removeChild(element)
})