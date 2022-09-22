const ip = '192.168.0.141';
const port = '8000'
const start = document.querySelector('.button-start');
const delay = document.querySelector('.buttons-delay');
const stop = document.querySelector('.button-stop');
const reset = document.querySelector('.button-reset');
const log = document.querySelector('.button-log');
const serverVersion = document.querySelector('.server-version span');
const numberOfPlayers = document.querySelector('.number-player span');
const gameStatus = document.querySelector('.game-status span');
const table = document.querySelector('table');

start.addEventListener(
    'click',
    () =>{
        if(delay.classList.contains('hide')){
            delay.classList.remove('hide')
        }
        else delay.classList.add('hide')
    })

delay.addEventListener(
    'click',
    (event) => {
        if(event.target.classList.contains('button')){
            const delay = event.target.textContent;
            fetch(`http://${ip}:${port}/button?button=start&delay=${delay}`,
                {
                    mode: 'no-cors'
                })
        }
    }
)

stop.addEventListener(
    'click',
    () => {
        fetch(`http://${ip}:${port}/button?button=stop`,
            {
                mode: 'no-cors'
            })
    }
)

reset.addEventListener(
    'click',
    () => {
        fetch(`http://${ip}:${port}/button?button=reset`,
            {
                mode: 'no-cors'
            })
    }
)

log.addEventListener(
    'click',
    () => {
        fetch(`http://${ip}:${port}/button?button=log`,
            {
                mode: 'no-cors'
            })
    }
)

setInterval(
    () => {
    fetch('http://${ip}:${port}/data_user')
        .then(response => response.json())
        .then(data => {
            if(serverVersion.textContent !== (data.server_version).toString()){
                serverVersion.textContent = `${data.server_version}`;
            }
            if(gameStatus.textContent !== (data.game_status).toString()){
                gameStatus.textContent = `${data.game_status}`;
            }
            if(numberOfPlayers.textContent !== (data.number_player).toString()){
                numberOfPlayers.textContent =`${data.number_player}`;
                let template = `
                <tr>
                    <th>Номер</th>
                    <th>Объект управления</th>
                    <th>Команда</th>
                    <th>Подключение</th>
                    <th>Баллы</th>
                    <th>Заряды</th>
                    <th>Груз</th>
                    <th>Блокировка</th>
                </tr>`;
                for(let i = 0; i < data.number_player; i++){
                    template += `
                    <tr>
                        <td>${i}</td>
                        <td>${data.players[i].object}</td>
                        <td>${data.players[i].command_name}</td>
                        <td>${data.players[i].connecting}</td>
                        <td>${data.players[i].balls}</td>
                        <td>${data.players[i].bullet}</td>
                        <td>${data.players[i].cargo}</td>
                        <td>${data.players[i].blocking}</td>
                    </tr>`;
                }
                table.innerHTML = template;
            }
        })
}, 1000)

