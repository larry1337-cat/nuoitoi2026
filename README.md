# 🌱 Nuôi Tôi — Feed Me Project

A single-page static site built with plain HTML, CSS, and JavaScript.

**Live demo:** [https://larry1337-cat.github.io/nuoitoi2026/](https://larry1337-cat.github.io/nuoitoi2026/)

---

## Features

- Live transaction feed that updates in real time
- Multi-language support via `i18n.js`
- Animated progress bar toward a configurable goal
- Fully responsive, mobile-first layout
- Timed live events that trigger after page load

---

## Project Structure

```
nuoitoi2026/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── data.js      # all configurable data
│       ├── app.js       # core logic
│       └── i18n.js      # translation strings
└── README.md
```

---

## Configuration

Everything you need to change is in `assets/js/data.js`.

### Payment info

```js
var siteConfig = {
    qrImage:       "https://...",       // QR code image URL
    bankLogo:      "https://...",       // Bank logo image URL
    accountNumber: "1999991503",        // Raw account number
    accountDisplay:"1999.99.1503",      // Formatted for display
    accountOwner:  "NGUYEN TAN LOC"
};
```

### Goal

```js
var goal = 1000000; // in VND
```

### Seed transactions

Static history shown on page load. Order is derived from `fixedHour`, `fixedMin`, and `baseDayOffset`.

```js
var seedData = [
    {
        name:          "SENDER NAME",
        amount:        2000,
        msg:           "Transaction note",
        fixedHour:     10,           // 24h format
        fixedMin:      14,
        type:          'receive',    // 'receive' or 'spend'
        baseDayOffset: 0             // 0 = today, 1 = yesterday, ...
    }
];
```

`baseDayOffset: 0` shifts to yesterday automatically if the fixed time hasn't passed yet today.

### Live events

Transactions that appear automatically after the page loads.

```js
var liveEvents = [
    {
        delay:  15000,          // ms after page load
        name:   "DONOR NAME",
        amount: 15000,
        msg:    "Message here",
        type:   'receive'
    }
];
```

---

## Getting Started

```bash
git clone https://github.com/larry1337-cat/nuoitoi2026.git
cd nuoitoi2026
open index.html
```

Or with a local server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

**Deploy to GitHub Pages:** push to `main`, then enable Pages under Settings → Pages (source: root).

---

## Tech Stack

| | |
|---|---|
| HTML / CSS / Vanilla JS | no build tools |
| [Tailwind CSS](https://tailwindcss.com/) (CDN) | styling |
| [Font Awesome 6](https://fontawesome.com/) | icons |
| Google Fonts | typography |

---

## License

[MIT](LICENSE)
