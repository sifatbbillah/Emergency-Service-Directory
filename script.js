const services = [
  { id: 1, icon: 'assets/emergency.png', name_bn: 'National Emergency', name_en: 'National Emergency Number', number: '999', category: 'All' },
  { id: 2, icon: './assets/police.png', name_bn: 'Police', name_en: 'Police Helpline Number', number: '999', category: 'Police' },
  { id: 3, icon: './assets/fire-service.png', name_bn: 'Fire Service', name_en: 'Fire Service Number', number: '999', category: 'Fire' },
  { id: 4, icon: './assets/ambulance.png', name_bn: 'Ambulance', name_en: 'Ambulance Service', number: '1994-999999', category: 'Health' },
  { id: 5, icon: './assets/emergency.png', name_bn: 'Women & Child Helpline', name_en: 'Women & Child Helpline', number: '109', category: 'Help' },
  { id: 6, icon: './assets/emergency.png', name_bn: 'Anti-Corruption', name_en: 'Anti-Corruption Helpline', number: '106', category: 'Govt.' },
  { id: 7, icon: './assets/emergency.png', name_bn: 'Electricity Outage', name_en: 'Electricity Helpline', number: '16216', category: 'Electricity' },
  { id: 8, icon: './assets/brac.png', name_bn: 'Brac', name_en: 'Brac Helpline', number: '16445', category: 'NGO' },
  { id: 9, icon: './assets/Bangladesh-Railway.png', name_bn: 'Bangladesh Railway', name_en: 'Bangladesh Railway Helpline', number: '163', category: 'Travel' }
];

let heartCount = 0;
let coinCount = 100;
let copyCount = 0;

const cardContainer = document.getElementById('cardContainer');
const historyList = document.getElementById('historyList');
const heartCountEl = document.getElementById('heartCount');
const coinCountEl = document.getElementById('coinCount');
const copyCountEl = document.getElementById('copyCount');
const clearBtn = document.getElementById('clearBtn');

function renderCards() {
  services.forEach(s => {
    const card = document.createElement('article');
    card.className = 'card bg-white p-4 shadow relative';

    card.innerHTML = `
      <div class="p-4 rounded-xl shadow-sm border bg-white">
        <!-- Header: Icon + Heart -->
        <div class="flex justify-between items-start mb-3">
          <div class="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
            <img src="${s.icon}" alt="${s.name_en}" class="w-6 h-6 object-contain" />
          </div>
          <button class="text-gray-400 hover:text-red-500" title="Add Heart" onclick="toggleHeart(this)">♡</button>
        </div>

        <!-- Title + Subtitle -->
        <h3 class="font-semibold text-base">${s.name_en}</h3>
        <p class="text-sm text-gray-500 mb-3">${s.name_bn}</p>

        <!-- Number -->
        <div class="text-3xl font-bold mb-2">${s.number}</div>
        <div class="mb-4">
          <span class="px-2 py-1 text-xs bg-gray-100 rounded">${s.category}</span>
        </div>

        <!-- Buttons -->
        <div class="flex gap-2">
          <button class="flex-1 border rounded-md py-2 text-sm hover:bg-gray-50" onclick="copyNumber('${s.number}')">📋 Copy</button>
          <button class="flex-1 bg-green-500 text-white rounded-md py-2 text-sm hover:bg-green-600" onclick="makeCall('${escapeHtml(s.name_en)}','${s.number}')">📞 Call</button>
        </div>
      </div>
    `;
    cardContainer.appendChild(card);
  });
}

function escapeHtml(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

function updateNavbar() {
  heartCountEl.innerText = heartCount;
  coinCountEl.innerText = coinCount;
  copyCountEl.innerText = copyCount;
}

// ❤️ Toggle Heart (new)
function toggleHeart(el) {
  if (el.textContent === "♡") {
    el.textContent = "💗";
    el.classList.add("text-pink-500");
    heartCount++;
  } else {
    el.textContent = "♡";
    el.classList.remove("text-pink-500");
    heartCount--;
  }
  updateNavbar();
  el.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.2)' }, { transform: 'scale(1)' }],
    { duration: 200 }
  );
}

function copyNumber(number) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(number).then(() => {
      copyCount++;
      updateNavbar();
      alert('Copied phone number: ' + number);
    }).catch(() => fallbackCopy(number));
  } else {
    fallbackCopy(number);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  copyCount++;
  updateNavbar();
  alert('Copied phone number: ' + text);
}

function makeCall(name, number) {
  if (coinCount < 20) {
    alert('Not enough coins to make a call. Each call costs 20 coins.');
    return;
  }
  coinCount -= 20;
  updateNavbar();
  const now = new Date();
  const timeStr = now.toLocaleString();
  alert('Calling ' + name + ' (' + number + ')...');
  addHistoryItem(name, number, timeStr);
}

function addHistoryItem(name, number, time) {
  const li = document.createElement('li');
  li.className = 'history-item';
  li.innerHTML = `
    <div>
      <div class="font-semibold">${name}</div>
      <div class="meta">${number}</div>
    </div>
    <div class="time">${time}</div>
  `;
  historyList.prepend(li);
}

function clearHistory() {
  historyList.innerHTML = '';
}

clearBtn.addEventListener('click', clearHistory);

renderCards();
updateNavbar();

// expose functions to window
window.toggleHeart = toggleHeart;
window.copyNumber = copyNumber;
window.makeCall = makeCall;
window.clearHistory = clearHistory;
