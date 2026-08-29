# TravelTrucks — Camper Rental App

Фронтенд вебзастосунку для компанії **TravelTrucks**, яка займається орендою кемперів. Користувач може переглянути каталог кемперів, відфільтрувати їх за локацією, типом кузова, двигуном і трансмісією, переглянути детальну інформацію про обраний кемпер і залишити заявку на бронювання.

🔗 **Демо:** [traveltrucks-ashy.vercel.app](https://traveltrucks-ashy.vercel.app)

## Зміст

- [Основні функції](#основні-функції)
- [Технології](#технології)
- [Встановлення та запуск](#встановлення-та-запуск)
- [Структура проєкту](#структура-проєкту)
- [API](#api)
- [Автор](#автор)

## Основні функції

- **Домашня сторінка** — банер із закликом до дії, перехід у каталог
- **Каталог кемперів**:
  - список кемперів із пагінацією у форматі Load More (довантаження по 4 картки)
  - фільтрація за локацією (текстове поле), типом кузова, типом двигуна та типом трансмісії — з урахуванням активних фільтрів під час довантаження
  - стан "нічого не знайдено" з можливістю скинути фільтри
- **Сторінка кемпера**:
  - галерея зображень
  - повна інформація про кемпер (характеристики, обладнання)
  - відгуки користувачів із рейтингом за п'ятизірковою шкалою
  - форма бронювання з валідацією та відправкою на бекенд
- Лоадери під час усіх асинхронних запитів

## Технології

- [Next.js](https://nextjs.org/) (App Router) + [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query](https://tanstack.com/query) — `useInfiniteQuery` для пагінації каталогу
- [Axios](https://axios-http.com/) — HTTP-клієнт
- CSS Modules — стилізація
- [React Icons](https://react-icons.github.io/react-icons/) — іконки
- Деплой — [Vercel](https://vercel.com/)

## Встановлення та запуск

1. Клонуйте репозиторій:

```bash
   git clone https://github.com/Andrii-Mitko/travel_trucks.git
   cd travel_trucks
```

2. Встановіть залежності:

```bash
   npm install
```

3. Запустіть проєкт у режимі розробки:

```bash
   npm run dev
```

4. Відкрийте [http://localhost:3000](http://localhost:3000) у браузері.

Для продакшн-збірки:

```bash
npm run build
npm start
```

## API

Проєкт використовує бекенд [campers-api.goit.study](https://campers-api.goit.study):

- `GET /campers` — список кемперів із фільтрацією та пагінацією
- `GET /campers/filters` — доступні значення фільтрів
- `GET /campers/{camperId}` — детальна інформація про кемпер
- `GET /campers/{camperId}/reviews` — відгуки на кемпер
- `POST /campers/{camperId}/booking-requests` — створення заявки на бронювання

## Автор

**Andrii Mitko**
GitHub: [@Andrii-Mitko](https://github.com/Andrii-Mitko)
Портфоліо: [andrii-mitko-brand](https://github.com/Andrii-Mitko/andrii-mitko-brand)
