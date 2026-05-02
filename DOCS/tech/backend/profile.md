# Profile Module (MVP)

## Назначение

`profile` хранит и обновляет данные игрока:
- базовый профиль;
- рейтинг и счетчики игр (system fields);
- публичное представление профиля для списка игроков.
- пользовательский `slug` как внешний идентификатор.

---

## REST endpoints (`/api/v1/profile`)

- `GET /profile/:id` — получить профиль игрока.
- `PATCH /profile/:id` — обновить редактируемые поля профиля.
- `DELETE /profile/:id` — удалить профиль пользователя.
- `POST /profile/list` — массовое получение профилей по `id[]` в сжатом формате для списков.
- `PATCH /profile/slug` — установить или изменить свой `slug`.

`POST /profile/list`:
- body: `{ ids: string[] }`
- в будущем: в body будет добавлен блок `filters` (набор полей определим позже).
- response item: `{ id, fullname, avatar_url, phone, telegram }`

---

## Service methods

- `create(dto)`
- `getById(profileId)`
- `updateById(profileId, dto)`
- `deleteById(profileId)`
- `getCompactListByIds(ids)`
- `setSlug(profileId, slug)`
- `incrementTotalGames(profileId, delta)`
- `updateRating(profileId, newRating)`

---

## Редактируемые и системные поля

Редактируемые пользователем:
- `slug`
- `fullname`
- `nickname`
- `gender`
- `age`
- `avatar_url`
- `city`
- `location`
- `description`
- `status_id`

Системные (только backend):
- `auth_user_id`
- `rating`
- `total_games`
- `verify`
- `role_id`

---

## Ограничения

- `profile` не выдает токены и не выполняет логин.
- `profile` не содержит бизнес-логику матчей (`challenge`).
- изменение `rating` и `total_games` выполняется только системными методами.
- создание профиля выполняется синхронным вызовом из `auth-gateway`.
