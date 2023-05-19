# lw2-backend

- /user
  - `GET` /
    - Get user object for self
    - ```json
      { "token": "jwtToken" }
      ```
    - ```json
      { "id": "uuid", "username": "username", "permissionLevel": 3, "email": "email@email.email", "name": "name" }
      ```
  - `PATCH` /
    - Update self
    - ```json
      { "token": "jwtToken", ... }
      ```
    - ```json
      { "id": "uuid", "username": "username", "permissionLevel": 3, "email": "email@email.email", "name": "name" }
      ```
  - `POST` /
    - Create user
    - ```json
      { "username": "username", "pwHash": "hash", "email": "email@email.email", "name": "name" } 
      ```
    - ```json
      { "id": "uuid": "username": "username", "permissionLevel": 0, "email": "email@email.email", "name": "name" }
      ```
