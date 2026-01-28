// Настройки
const SERVER_IP = '185.97.255.17:1216'; // Deimos
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/'; // Public proxy
const API_URL = `http://${SERVER_IP}/status`;
const SERVER_URL = PROXY_URL + API_URL;
const REFRESH_INTERVAL = 5000;

// Элементы
const playersCount = document.getElementById('players-current');
const serverStatus = document.getElementById('server-status');
const serverRound = document.getElementById('server-round');
const serverMap = document.getElementById('server-map');
const serverIp = document.getElementById('server-ip');
const serverPreset = document.getElementById('server-preset');

async function fetchServerStatus() {
  try {
    const response = await fetch(SERVER_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Origin': window.location.origin
      }
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    // Обновляем интерфейс
    playersCount.textContent = `${data.players} из ${data.soft_max_players}` || '—';
    serverRound.textContent = data.round_id || '—';
    serverMap.textContent = data.map || '—';
    serverPreset.textContent = data.preset || '—';
    serverIp.textContent = SERVER_IP;
    serverStatus.textContent = 'Онлайн';
    serverStatus.style.color = '#03da39';

  } catch (error) {
    console.error('Ошибка запроса:', error);
    updateOfflineState();
  }
}

function updateOfflineState() {
  playersCount.textContent = '—';
  serverRound.textContent = '—';
  serverMap.textContent = '—';
  serverPreset.textContent = '—';
  serverIp.textContent = SERVER_IP;
  serverStatus.textContent = 'Недоступен';
  serverStatus.style.color = '#eb2e51';
}

// Запуск
document.addEventListener('DOMContentLoaded', () => {
  fetchServerStatus();
  setInterval(fetchServerStatus, REFRESH_INTERVAL);
});
