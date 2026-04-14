# Elkino Gang — elkinogang.ru

Сайт фестиваля Elkino Gang с интернет-радио.

## Структура проекта

```
elkino-gang/
├── index.html                  # Главная страница
├── css/
│   ├── variables.css           # Дизайн-токены (цвета, шрифты, размеры)
│   ├── base.css                # Базовые стили, типографика, reset
│   ├── animations.css          # Анимации и @keyframes
│   └── components/
│       ├── nav.css             # Навигация
│       ├── hero.css            # Hero-секция
│       ├── event.css           # Афиша / тизер ивента
│       ├── radio.css           # Радио-секция
│       ├── sections.css        # Резиденты, архив, мерч, FAQ
│       └── footer-player.css   # Футер и sticky-плеер
├── js/
│   ├── particles.js            # Эффект частиц на hero
│   ├── faq.js                  # Аккордеон FAQ
│   └── radio.js                # Радиоплеер (Icecast)
├── assets/
│   ├── img/                    # Изображения (фото, лого)
│   └── fonts/                  # Локальные шрифты (если нужны)
└── README.md
```

## Стек

- **Сайт**: HTML / CSS / Vanilla JS
- **Хостинг**: VPS (Timeweb Cloud, Ubuntu 24.04)
- **Веб-сервер**: Nginx + Certbot (SSL)
- **Радио**: Icecast2 + Liquidsoap
- **Деплой**: GitHub → автопулл каждые 5 мин

## Деплой

```bash
git add . && git commit -m "описание" && git push
```

Сервер подтянет изменения автоматически через cron (каждые 5 мин).
Или вручную на сервере:

```bash
cd /var/www/elkinogang.ru && git pull origin main
```

## Дизайн-токены

| Токен | Значение | Назначение |
|-------|----------|------------|
| `--deep` | `#0A1F04` | Глубокий фон |
| `--dark` | `#0F2406` | Фон секций |
| `--forest` | `#1A3A0A` | Фон карточек |
| `--green` | `#3BD458` | Акцент (из лого) |
| `--dew` | `#E8F5E0` | Основной текст |
| `--font-heading` | Unbounded | Заголовки |
| `--font-body` | Inter | Основной текст |

## Радио

- Поток: `https://elkinogang.ru/radio`
- Статус: `https://elkinogang.ru/radio-status`
- Треки: `/var/www/radio/music/` на сервере
- Конфиг: `/etc/liquidsoap/radio.liq`

Добавить трек:
```bash
scp "трек.mp3" root@IP:/var/www/radio/music/
```
