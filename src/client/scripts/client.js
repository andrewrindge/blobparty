const socket = io();
const connectionsElement = document.getElementById('connections')

function resetPlayersList() {
    connectionsElement.innerHTML = ""
}

function addPlayer(id, data) {
    element = document.createElement('p')
    element.id = id
    element.textContent = `${id}: ${JSON.stringify(data)}`
    connectionsElement.appendChild(element)
}

socket.on('message', function(data) {
    console.log(data);
})

socket.on('players', function(data) {
    resetPlayersList()
    for (const id in data) {
        addPlayer(id, data[id])
    }
})