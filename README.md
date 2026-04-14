# Elkino Gang — elkinogang.ru

Статический лендинг фестиваля Elkino Gang с интернет-радио. Без сборщиков: открывается через Live Server или как `file://` (модули ES6 — для `file://` в некоторых браузерах может понадобиться локальный HTTP).

## Структура проекта

```
elkino-gang/
├── index.html
├── README.md
├── css/
│   ├── main.css          # Точка входа (@import остальных)
│   ├── reset.css         # Минимальный сброс
│   ├── variables.css     # Цвета, шрифты, отступы, радиусы (CSS variables)
│   ├── base.css          # Типографика документа, утилиты
│   ├── layout.css        # Секции, сетка футера, sticky-плеер, брейкпоинты
│   └── components.css    # Блоки интерфейса + @keyframes
├── js/
│   ├── main.js           # Подключает модули после DOMContentLoaded
│   └── modules/
│       ├── particles.js  # Частицы в hero
│       ├── faq.js        # Аккордеон FAQ + aria-expanded
│       └── radio.js      # Поток + /radio-status, кнопки data-radio-toggle
└── assets/
    ├── images/           # og.jpg и прочие изображения (см. ниже)
    ├── icons/
    └── fonts/            # Локальные шрифты при отказе от Google Fonts
```

## Как запускать локально

1. **Live Server** (VS Code / Cursor): открыть корень репозитория, «Open with Live Server» на `index.html`.
2. **Python**: из корня проекта  
   `python3 -m http.server 8080`  
   затем в браузере `http://127.0.0.1:8080/`.

Модули `import` требуют **origin** (http/https), не открывайте `index.html` двойным кликом, если радио/модули не работают — используйте локальный сервер.

## Open Graph

В `index.html` указано `og:image`: `https://elkinogang.ru/assets/images/og.jpg`. Положите превью 1200×630 (или близко) в `assets/images/og.jpg` на сервере, чтобы превью корректно подтягивалось в соцсетях.

## Радио (прод)

- Поток: `https://elkinogang.ru/radio`
- Статус: `https://elkinogang.ru/radio-status` (JSON Icecast; локально путь `/radio-status` отдаёт тот же бэкенд при прокси)

## Деплой

```bash
git add . && git commit -m "Описание изменений" && git push
```

Дальше — по вашему процессу (cron `git pull` на VPS и т.д.).

## Стили и именование

- Дизайн-токены в `css/variables.css` (`--color-*`, `--section-padding`, …).
- Крупные блоки по смыслу BEM: `site-nav`, `site-nav__link`, `hero__title`, `site-footer__inner`, модификатор `resident-avatar--dashed`.
- Один `<link rel="stylesheet" href="css/main.css">` в разметке.
