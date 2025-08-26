// script.js - dynamic card rendering and interactions

const services = [
  { id: 1, emoji: '🚨', name_bn: 'জাতীয় জরুরি নম্বর', name_en: 'National Emergency Number', number: '999', category: 'All' },
  { id: 2, emoji: '👮‍♂️', name_bn: 'পুলিশ হেল্পলাইন', name_en: 'Police Helpline Number', number: '999', category: 'Police' },
  { id: 3, emoji: '🔥', name_bn: 'ফায়ার সার্ভিস নম্বর', name_en: 'Fire Service Number', number: '999', category: 'Fire' },
  { id: 4, emoji: '🚑', name_bn: 'অ্যাম্বুল্যান্স সার্ভিস', name_en: 'Ambulance Service', number: '1994-999999', category: 'Health' },
  { id: 5, emoji: '👩‍👧', name_bn: 'মহিলা ও শিশু হেল্পলাইন', name_en: 'Women & Child Helpline', number: '109', category: 'Help' },
  { id: 6, emoji: '⚖️', name_bn: 'দুর্নীতিবিরোধী হেল্পলাইন', name_en: 'Anti-Corruption Helpline', number: '106', category: 'Govt' },
  { id: 7, emoji: '💡', name_bn: 'বিদ্যুৎ হেল্পলাইন', name_en: 'Electricity Helpline', number: '16216', category: 'Electricity' },
  { id: 8, emoji: '🏥', name_bn: 'ব্র্যাক হেল্পলাইন', name_en: 'Brac Helpline', number: '16445', category: 'NGO' },
  { id: 9, emoji: '🚆', name_bn: 'বাংলাদেশ রেলওয়ে হেল্পলাইন', name_en: 'Bangladesh Railway Helpline', number: '163', category: 'Travel' }
];

// counts
let heartCount = 0;
let coinCount = 100;
let copyCount = 0;

// DOM refs
const cardContainer = document.getElementById('cardContainer');
const historyList = document.getElementById('historyList');
const heartCountEl = document.getElementById('heartCount');
const coinCountEl = document.getElementById('coinCount');
const copyCountEl = document.getElementById('copyCount');
const clearBtn = document.getElementById('clearBtn');

// render cards
function renderCards() {
  services.forEach(s => {
    const card = document.createElement('article');
    card.className = 'card bg-white p-4 shadow relative';

    card.innerHTML = `
      <button class="card-like" title="Add Heart" onclick="addHeart(this)">💗</button>
      <div class="flex items-center gap-3 mb-3">
        <div class="w-12 h-12 bg-green-50 text-2xl rounded p-2 flex items-center justify-center">${s.emoji}</div>
        <div>
          <h3 class="font-semibold">${s.name_bn}</h3>
          <p class="text-xs text-gray-500">${s.name_en}</p>
        </div>
      </div>
      <div class="text-2xl font-bold mb-2">${s.number}</div>
      <div class="mb-3"><span class="badge badge-sm">${s.category}</span></div>
      <div class="flex gap-2">
        <button class="btn btn-sm btn-outline flex-1" onclick="copyNumber('${s.number}')">📋 Copy</button>
        <button class="btn btn-sm btn-success flex-1" onclick="makeCall('${escapeHtml(s.name_en)}','${s.number}')">📞 Call</button>
      </div>
    `;

    cardContainer.appendChild(card);
  });
}

// helper to escape quotes in template
function escapeHtml(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

function updateNavbar() {
  heartCountEl.innerText = heartCount;
  coinCountEl.innerText = coinCount;
  copyCountEl.innerText = copyCount;
}

// heart action - increments count (each click increases count)
function addHeart(el) {
  heartCount++;
  updateNavbar();
  el.classList.add('liked');
  // small animation
  el.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }], { duration: 220 });
}

// copy function with fallback
function copyNumber(number) {
  if (!number) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(number).then(() => {
      copyCount++;
      updateNavbar();
      alert('Copied phone number: ' + number);
    }).catch(err => {
      fallbackCopy(number);
    });
  } else {
    fallbackCopy(number);
  }
}

function fallbackCopy(text) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    copyCount++;
    updateNavbar();
    alert('Copied phone number: ' + text);
  } catch (e) {
    alert('Unable to copy to clipboard');
  }
}

// call function
function makeCall(name, number) {
  if (coinCount < 20) {
    alert('Not enough coins to make a call. Each call costs 20 coins.');
    return;
  }
  coinCount -= 20;
  updateNavbar();
  const now = new Date();
  const timeStr = now.toLocaleString(); // local date + time
  alert('Calling ' + name + ' (' + number + ')...');
  addHistoryItem(name, number, timeStr);
}

// add item to history (prepend newest first)
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
  // prepend so newest is on top
  if (historyList.firstChild) {
    historyList.insertBefore(li, historyList.firstChild);
  } else {
    historyList.appendChild(li);
  }
}

// clear history
function clearHistory() {
  historyList.innerHTML = '';
}

// attach clear btn
clearBtn.addEventListener('click', () => {
  clearHistory();
});

// init
renderCards();
updateNavbar();

// expose some functions to global scope (so inline onclick works)
window.addHeart = addHeart;
window.copyNumber = copyNumber;
window.makeCall = makeCall;
window.clearHistory = clearHistory;
