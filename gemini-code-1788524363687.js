/* ГЛОБАЛЬНОЕ СОСТОЯНИЕ */
var BALANCE = 500;
var INVENTORY = [];

/* СПИСОК ПЕРСОНАЖЕЙ */
var WAIFUS = [
    { id: 'w1', name: 'Мейшо Дото', title: 'Девочка-лошадка', hp: '180', rarity: '★ SR', image: 'https://cdn.donmai.us/original/79/a8/79a8949b54afd26d495e1186697dd42a.png' },
    { id: 'w2', name: 'Марин Китагава', title: 'Эта фарфоровая кукла', hp: '220', rarity: '★★ SSR', image: 'https://img10.joyreactor.cc/pics/post/Anime-%D1%84%D1%8D%D0%BD%D0%B4%D0%BE%D0%BC%D1%8B-Sono-Bisque-Doll-wa-Koi-wo-Suru-7854927.jpeg' },
    { id: 'w3', name: 'Макима', title: 'Охотница на демонов', hp: '300', rarity: '★★★ UR', image: 'https://image.jannyai.com/bot-avatars/kxzFVkWZclGRu0rI-P4zg.webp' },
    { id: 'w4', name: 'Йоруичи Шихоуи', title: 'Богиня Скорости', hp: '280', rarity: '★★★ UR', image: 'https://i.pinimg.com/originals/2f/84/f9/2f84f9e5dca1b971cb9e00e03039e9ee.jpg' }
];

/* ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ */
function switchView(viewId) {
    var views = ['viewMenu', 'viewGacha', 'viewCollection'];
    views.forEach(function(v) {
        var el = document.getElementById(v);
        if (el) el.classList.add('hidden');
    });

    var target = document.getElementById(viewId);
    if (target) target.classList.remove('hidden');

    var btnBack = document.getElementById('btnBack');
    if (btnBack) {
        if (viewId === 'viewMenu') btnBack.classList.add('hidden');
        else btnBack.classList.remove('hidden');
    }
}

/* ОБНОВЛЕНИЕ БАЛАНСА И КОЛЛЕКЦИИ */
function updateUI() {
    var balEl = document.getElementById('globalBalance');
    if (balEl) balEl.innerText = BALANCE + ' $';

    var counter = document.getElementById('collectionCounter');
    var subCounter = document.getElementById('collectionSubCounter');
    if (counter) counter.innerText = INVENTORY.length + '/' + WAIFUS.length;
    if (subCounter) subCounter.innerText = INVENTORY.length + ' / ' + WAIFUS.length;

    renderCollection();
}

function renderCollection() {
    var grid = document.getElementById('collectionGrid');
    if (!grid) return;
    grid.innerHTML = '';

    WAIFUS.forEach(function(w) {
        var isUnlocked = INVENTORY.indexOf(w.id) !== -1;
        var card = document.createElement('div');
        card.className = 'poke-card ' + (isUnlocked ? '' : 'poke-card-locked');
        card.innerHTML = 
            '<div class="poke-card-inner">' +
                '<div class="flex justify-between items-center text-[10px] font-bold text-yellow-300 mb-1">' +
                    '<span>' + w.rarity + '</span>' +
                    '<span>HP ' + w.hp + '</span>' +
                '</div>' +
                '<div class="w-full h-32 bg-black/40 rounded-lg overflow-hidden mb-2 flex items-center justify-center">' +
                    (isUnlocked ? '<img src="' + w.image + '" class="w-full h-full object-cover">' : '<span class="text-3xl">❓</span>') +
                '</div>' +
                '<div class="text-center font-bold text-xs text-white truncate">' + (isUnlocked ? w.name : '???') + '</div>' +
            '</div>';
        grid.appendChild(card);
    });
}

/* КРУТКА ГАЧИ */
function spinGacha() {
    if (BALANCE < 100) {
        alert('Недостаточно денег!');
        return;
    }
    BALANCE -= 100;

    var randomWaifu = WAIFUS[Math.floor(Math.random() * WAIFUS.length)];
    if (INVENTORY.indexOf(randomWaifu.id) === -1) {
        INVENTORY.push(randomWaifu.id);
        alert('Вы выбили карту: ' + randomWaifu.name + '!');
    } else {
        alert('Выпал дубликат: ' + randomWaifu.name);
    }
    updateUI();
}

/* СНЯТИЕ ЭКРАНА ЗАГРУЗКИ */
window.onload = function() {
    var loader = document.getElementById('loadingOverlay');
    if (loader) {
        loader.style.display = 'none';
    }
    updateUI();
};