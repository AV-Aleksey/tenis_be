# Entities

## DDD Draft (этап 1: только список)

### Identity Context
- Aggregate Root: User
- Entity: Role

#### User (schema draft)
- `id`: uuid, pk
- `group`: text, not null default `global`
- `fullname`: text, not null
- `nickname`: text, not null
- `gender`: text, not null
- `age`: int, not null
- `avatar_url`: text, null
- `city`: text, not null
- `location`: text, not null
- `role_id`: int, not null default 3
- `status_id`: int, null
- `description`: text, null
- `onboarded`: boolean, not null default false
- `verify`: boolean, not null default false
- `rating`: int, not null, system
- `total_games`: int, not null default 0, system
- `phone`: text, not null
- `telegram`: text, not null
- `created_at`: timestamptz, not null
- `updated_at`: timestamptz, not null

#### Role (schema draft)
- `id`: int, pk
- `code`: text, not null, unique
- `title`: text, not null
Seed values:
- `1`, `admin`, `Администратор`
- `2`, `moderator`, `Модератор`
- `3`, `user`, `Пользователь`

#### UserStatus (schema draft)
- `id`: int, pk
- `title`: text, not null
- `order`: int, not null default 1
Seed values:
- `1`, `В активном поиске игры`
- `2`, `Временно не играю`

### Onboarding Context
- Aggregate Root: Survey

### Matchmaking Context
- Aggregate Root: Match

#### Match (schema draft)

- `id`: uuid, pk
- `creator_user_id`: uuid, not null
- `description`: text, null
- `location`: text, not null
- `is_team_challenge`: boolean, not null default false
- `status_id`: int, not null
- `match_date`: date, not null
- `match_time`: time, not null
- `player_1_id`: uuid, not null
- `player_2_id`: uuid, null
- `opponent_player_1_id`: uuid, null
- `opponent_player_2_id`: uuid, null
- `score_team1`: text, null
- `score_team2`: text, null
- `closed_by_user_id`: uuid, null
- `closed_at`: timestamptz, null
- `created_at`: timestamptz, not null
- `updated_at`: timestamptz, not null

#### MatchStatus (schema draft)
- `id`: int, pk
- `title`: text, not null
- `order`: int, not null default 1
Seed values:
- `1`, `Создано`
- `2`, `Запланировано`
- `3`, `Завершено`
- `4`, `Прервано`

Правила:
- В выборку завершённых матчей включаем только `status_id = 3`.
- `status_id = 4` используем для техзакрытия (погода, болезнь участника, авто-закрытие неподтверждённого матча).

### Notification Context
- Aggregate Root: Notification

#### Notification (schema draft)
- `id`: uuid, pk
- `user_id`: uuid, not null
- `type`: text, not null
- `title`: text, not null
- `message`: text, null
- `link_type`: text, not null
- `link_id`: uuid, not null
- `is_read`: boolean, not null default false
- `created_at`: timestamptz, not null
- `read_at`: timestamptz, null

