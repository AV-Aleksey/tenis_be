# Auth Module (Gateway, MVP)

## Назначение

`auth-gateway` отвечает только за аутентификацию, сессии и проверку доступа:
- регистрация и логин;
- выдача JWT токенов;
- завершение текущей сессии;

---

## REST endpoints (`/api/v1/auth`)

- `POST /auth/register` — быстрая регистрация (минимум полей), выдача `access`, синхронный вызов `profile.create(...)`.
- `POST /auth/login` — вход по `phone|telegram + password`, выдача `access`.
- `POST /auth/logout` — завершение текущей сессии.

---

## Service methods

- `register(dto)`
- `login(dto)`
- `logout(userId)`
- `validateCredentials(login, password)`
- `signAccessToken(payload)`
- `createProfile(authUserId, dto)`

---

## Ограничения модуля
- `auth-gateway` не содержит бизнес-логику `challenge`.
- `auth-gateway` не содержит логику файлов (`filestorage`).
- Онбординг-методы находятся в `profile`, не в `auth`.
- `auth-gateway` не отдает наружу внутренний `id` профиля.
