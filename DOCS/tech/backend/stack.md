## Backend Stack (MVP)

### 1) Фреймворк

- Фреймворк: `NestJS` (TypeScript, модульная архитектура).
- API: `REST` (JSON), префикс `api/v1`.

### 2) Данные

- БД: `PostgreSQL`.
- ORM: `Prisma`.
- Конфигурация: `.env` + `@nestjs/config`.

### 3) Валидация данных

- DTO + декораторы `class-validator`.
- Трансформация входа: `class-transformer`.
- Глобально включаем `ValidationPipe` с параметрами:
  - `whitelist: true`
  - `forbidNonWhitelisted: true`
  - `transform: true`

### 4) Авторизация и доступ

- Схема: `JWT` access + refresh.
- Библиотеки: `@nestjs/jwt`, `passport`, `passport-jwt`.
- Access token: `15 минут`.
- Refresh token: `30 дней`.
- Защита приватных эндпоинтов через `JwtAuthGuard`.

### 5) Работа с файлами

- Прием файлов: `Multer` через `@nestjs/platform-express`.
- Хранение: локально в MVP (папка `uploads/`), путь сохраняем в БД.
- Ограничения загрузки:
  - только `image/jpeg`, `image/png`, `image/webp`
  - лимит размера: `5MB`

### 6) TypeScript, линтер, форматирование

- TypeScript:
  - `strict: true`
  - `noImplicitAny: true`
- ESLint:
  - `@typescript-eslint/eslint-plugin` + `@typescript-eslint/parser`
- Prettier:
  - базовое форматирование проекта
- Минимальные npm-скрипты:
  - `lint`
  - `format`
  - `test`
- `build`

### 7) Версии

- Runtime: `Node.js 22 LTS`.
- Package manager: `npm`.
