var lang = 'vi';
var total = 0;
var txList = [];

function toggleDropdown(e) {
    e.stopPropagation();
    document.getElementById('lang-menu').classList.toggle('active');
}

function closeDropdown(e) {
    var menu = document.getElementById('lang-menu');
    if (!menu.contains(e.target) && e.target.id !== 'lang-btn') {
        menu.classList.remove('active');
    }
}

function changeLanguage(code) {
    lang = code;
    document.getElementById('current-flag').innerText = langs[code].flag;
    document.getElementById('current-lang-name').innerText = langs[code].name;
    updateStaticText();
    renderTable();
    document.getElementById('lang-menu').classList.remove('active');
}

function updateStaticText() {
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        var key = el.getAttribute('data-i18n');
        if (t[lang][key]) el.innerText = t[lang][key];
    });
}

function resolveTime(item) {
    var now = new Date();
    var offset = item.baseDayOffset;
    if (offset === 0) {
        var isPast = now.getHours() > item.fixedHour ||
                     (now.getHours() === item.fixedHour && now.getMinutes() >= item.fixedMin);
        if (!isPast) offset = 1;
    }
    var d = new Date(now);
    d.setDate(now.getDate() - offset);
    d.setHours(item.fixedHour, item.fixedMin, 0, 0);
    return Object.assign({}, item, { dateObj: d });
}

function fmt(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function animateCount(from, to) {
    var el = document.getElementById('total-balance-display');
    var start = null;
    var dur = 1000;
    function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.innerHTML = fmt(Math.floor(p * (to - from) + from));
        if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

function updateBar(val) {
    var pct = Math.min((val / goal) * 100, 100).toFixed(1);
    document.getElementById('progress-bar').style.width = pct + '%';
    document.getElementById('progress-text').innerText = pct + '%';
}

function rowHTML(item, isNew) {
    var now = new Date();
    var hh = String(item.dateObj.getHours()).padStart(2, '0');
    var mm = String(item.dateObj.getMinutes()).padStart(2, '0');
    var dd = String(item.dateObj.getDate()).padStart(2, '0');
    var mo = String(item.dateObj.getMonth() + 1).padStart(2, '0');

    var dayLabel = '';
    var diff = Math.abs(now - item.dateObj);

    var timeCell;
    if (item.isDynamic && diff < 60000) {
        timeCell = hh + ':' + mm + ' <br><span class="text-xs text-green-600 font-bold">' + t[lang].just_now + '</span>';
    } else {
        if (now.getDate() === item.dateObj.getDate() && now.getMonth() === item.dateObj.getMonth()) {
            dayLabel = '<span class="text-green-600 font-bold">' + t[lang].today + '</span>';
        } else if (now.getDate() - item.dateObj.getDate() === 1) {
            dayLabel = t[lang].yesterday;
        } else {
            dayLabel = dd + '/' + mo;
        }
        timeCell = hh + ':' + mm + ' <br><span class="text-xs text-gray-400">' + dayLabel + '</span>';
    }

    var isSpend = item.type === 'spend';
    var color = isSpend ? 'text-red-500' : 'text-green-600';
    var sign  = isSpend ? '-' : '+';
    var rowBg = isNew ? 'new-row-highlight' : (isSpend ? 'hover:bg-red-50/50' : 'hover:bg-green-50/50');

    var nameHtml;
    if (item.name.indexOf('(') > -1) {
        var parts = item.name.split('(');
        nameHtml = '<span class="font-bold text-gray-800">' + parts[0] + '</span><br>'
                 + '<span class="text-xs text-gray-500 italic">(' + parts[1] + '</span>';
    } else {
        nameHtml = '<span class="font-bold text-gray-800">' + item.name + '</span>';
    }

    return '<tr class="' + rowBg + ' transition border-b border-gray-50 last:border-0 group">'
         + '<td class="p-4 text-gray-500 font-mono text-sm leading-tight whitespace-nowrap align-top">' + timeCell + '</td>'
         + '<td class="p-4 text-sm md:text-base uppercase tracking-tight align-top">' + nameHtml + '</td>'
         + '<td class="p-4 text-right font-bold ' + color + ' align-top">' + sign + ' ' + fmt(item.amount) + '</td>'
         + '<td class="p-4 italic text-gray-400 text-sm group-hover:text-gray-600 align-top">"' + item.msg + '"</td>'
         + '</tr>';
}

function renderTable() {
    var body = document.getElementById('history-body');
    body.innerHTML = '';
    txList.forEach(function(item) {
        var isNew = item.isDynamic && (Date.now() - item.dateObj.getTime() < 10000);
        body.innerHTML += rowHTML(item, isNew);
    });
}

function addTx(name, amount, msg, type) {
    var prev = total;
    total += type === 'receive' ? amount : -amount;
    animateCount(prev, total);
    updateBar(total);

    var item = { name: name, amount: amount, msg: msg, type: type, dateObj: new Date(), isDynamic: true };
    txList.unshift(item);
    renderTable();
    showPopup(item);
}

function showPopup(item) {
    var pop       = document.getElementById('messenger-pop');
    var colorBar  = document.getElementById('pop-color-bar');
    var avatarBg  = document.getElementById('pop-avatar-bg');
    var icon      = document.getElementById('pop-icon');
    var titleEl   = document.getElementById('pop-title');
    var timeEl    = document.getElementById('pop-time-text');
    var msgEl     = document.getElementById('pop-msg');

    timeEl.innerText = t[lang].just_now;

    if (item.type === 'spend') {
        colorBar.className = 'absolute left-0 top-0 bottom-0 w-1.5 bg-red-500';
        avatarBg.className = 'w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-xl text-red-600 shadow-sm border border-white';
        icon.className     = 'fa-solid fa-arrow-trend-down';
        titleEl.innerText  = t[lang].report_title;
        msgEl.innerHTML    = t[lang].withdrew + ' <span class="font-bold text-red-600">-' + fmt(item.amount) + 'đ</span>: ' + item.msg;
    } else {
        colorBar.className = 'absolute left-0 top-0 bottom-0 w-1.5 bg-green-500';
        avatarBg.className = 'w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl text-green-600 shadow-sm border border-white';
        icon.className     = 'fa-solid fa-coins animate-bounce';
        titleEl.innerText  = item.name.split('(')[0];
        msgEl.innerHTML    = t[lang].donated + ' <span class="font-bold text-green-600">+' + fmt(item.amount) + 'đ</span>: "' + item.msg + '"';
    }

    pop.classList.add('show');
    setTimeout(function() { pop.classList.remove('show'); }, 6000);
}

function copyToClipboard(text) {
    var msg = t[lang].toast_copied + text;
    navigator.clipboard.writeText(text).then(function() {
        showToast(msg);
    }).catch(function() {
        var el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        showToast(msg);
    });
}

function showToast(message) {
    var toast = document.getElementById('toast');
    document.getElementById('toast-message').innerText = message;
    toast.classList.remove('opacity-0', 'translate-y-10');
    setTimeout(function() {
        toast.classList.add('opacity-0', 'translate-y-10');
    }, 3000);
}

function boot() {
    document.getElementById('qr-image').src = siteConfig.qrImage;
    document.getElementById('bank-logo').src = siteConfig.bankLogo;
    document.getElementById('acc-number-display').innerText = siteConfig.accountDisplay;
    document.getElementById('account-owner-display').innerText = siteConfig.accountOwner;

    seedData.forEach(function(item) {
        txList.push(resolveTime(item));
    });
    txList.sort(function(a, b) { return b.dateObj - a.dateObj; });

    total = 0;
    txList.forEach(function(item) {
        total += item.type === 'receive' ? item.amount : -item.amount;
    });

    document.getElementById('total-balance-display').innerHTML = fmt(total);
    updateBar(total);
    renderTable();

    liveEvents.forEach(function(ev) {
        setTimeout(function() {
            addTx(ev.name, ev.amount, ev.msg, ev.type);
        }, ev.delay);
    });
}

window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('preloader').classList.add('hidden-loader');
        boot();
    }, 2200);
});
