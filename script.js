// Настройки
const SERVER_IP = '185.97.255.17:1216'; // Deimos
const SERVER_URL = `https://${SERVER_IP}/status`;
const REFRESH_INTERVAL = 5000;

// Элементы
const playersCount = document.getElementById('players-current');
const serverStatus = document.getElementById('server-status');
const serverRound = document.getElementById('server-round');
const serverMap = document.getElementById('server-map');
const serverIp = document.getElementById('server-ip');
const serverPreset = document.getElementById('server-preset');


// Запрос к API
async function fetchServerStatus() {
  try {
    const response = await fetch(SERVER_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    // Обновляем интерфейс
    playersCount.textContent = `${data.players} из ${data.soft_max_players}` || 0;
    serverStatus.textContent = 'Онлайн';
    serverStatus.style.color = '#03da39';

    serverRound.textContent = data.round_id;
    serverMap.textContent = data.map;
    serverPreset.textContent = data.preset;
    serverIp.textContent = SERVER_IP;

  } catch (error) {
    console.error('Ошибка запроса:', error);
    playersCount.textContent = '—';
    serverRound.textContent = `—`;
    serverMap.textContent = `—`;
    serverPreset.textContent = `—`;
    serverIp.textContent = SERVER_IP;
    serverStatus.textContent = 'Недоступен';
    serverStatus.style.color = '#eb2e51';
  }
}

// Запуск и периодическое обновление
document.addEventListener('DOMContentLoaded', () => {
  fetchServerStatus(); // первый запрос
  setInterval(fetchServerStatus, REFRESH_INTERVAL);
});
