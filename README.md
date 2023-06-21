# lw2-backend

## Environment Variables

| Name           | Default Value            | Description                             |
| -------------- | ------------------------ | --------------------------------------- |
| `DATABASE_URL` | `postgresql://localhost` | PostgreSQL connection URL               |
| `DB_HOST`      | `::1`                    | PostgreSQL server host (IP or hostname) |
| `DB_PORT`      | `5432`                   | PostgreSQL server port                  |
| `DB_USER`      | `postgres`               | PostgreSQL connecting user              |
| `DB_PASS`      |                          | PostgreSQL connection password          |
| `DB_DATA`      | `postgres`               | PostgreSQL database name                |
| `JWT_SECRET`   |                          | JSONWebToken secret                     |
| `EX_PORT`      | `3000`                   | Express listening port                  |
| `CONSOLE_URL`  | `http://localhost`       | Address posted in console for API       |
| `LW2_VERSION`  | `0.0.0`                  | Project version                         |

## Table Schemas

### Users

| Name      | Type   | Flags                             | Description                                                  |
| --------- | ------ | --------------------------------- | ------------------------------------------------------------ |
| `id`      | `uuid` | `primary key` `not null` `unique` | v4 uuid assigned to the user                                 |
| `pw_hash` | `text` | `not null`                        | MD5 hash of password. Password is hashed client-side         |
| `email`   | `text` | `not null` `unique`               | Email address of user, will be used for signing in           |
| `flags`   | `int`  |                                   | Decimal representation of up to 32 configurable binary flags |

### Cases

| Name     | Type     | Flags                             | Description                                                  |
| -------- | -------- | --------------------------------- | ------------------------------------------------------------ |
| `id`     | `uuid`   | `primary key` `not null` `unique` | v4 UUID assigned to a case                                   |
| `name`   | `text`   | `not null`                        | `last, first` or `provider` of case                          |
| `number` | `text`   | `not null`                        | `123456` or `AB12345` of case                                |
| `iis`    | `text`   |                                   | `AB12345` of case when `number` is `123456`                  |
| `notes`  | `text[]` |                                   | Notes applying to all vols in case                           |
| `flags`  | `int`    |                                   | Decimal representation of up to 32 configurable binary flags |

### Vols

| Name     | Type     | Flags                             | Description                                                       |
| -------- | -------- | --------------------------------- | ----------------------------------------------------------------- |
| `id`     | `uuid`   | `primary key` `not null` `unique` | v4 UUID assigned to a volume                                      |
| `name`   | `text`   | `not null`                        | Volume name (CL01, SF01, PR01, etc)                               |
| `notes`  | `text[]` |                                   | Notes that apply to this volume such as prepped and scanned marks |
| `call`   | `text`   |                                   | Location of volume                                                |
| `box_id` | `uuid`   |                                   | ID of box if applicable                                           |
| `flags`  | `int`    |                                   | Decimal representation of up to 32 customizable binary flags      |

### Boxes

| Name       | Type     | Flags                             | Description               |
| ---------- | -------- | --------------------------------- | ------------------------- |
| `id`       | `uuid`   | `primary key` `not null` `unique` | v4 UUID assigned to box   |
| `call`     | `text`   | `not null`                        | Location of box           |
| `contains` | `uuid[]` |                                   | IDs of volumes inside box |

