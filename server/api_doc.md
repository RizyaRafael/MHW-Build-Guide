## Models :

_Build_
```
- UserId: integer, required
- MonsterId: integer
- head: json
- chest: json
- legs: json
- waist: json
- gloves: json
- weapon: json
```

_Monster_
```
- name: string
- monsterId: string
- imageUrl: string
```

_User_
```
- username: string, required, unique
- email: string, required, unique
- password: string, required
- imageUrl: string
```

## Relationship :

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /login-google`
- `GET /allBuild`
- `GET /monster`
- `GET /monster/:monsterName`
- `GET /build/:monsterName`

Routes below need authentication:
- `GET /buildUser`
- `POST /build/:monsterName`
- `DELETE /delete/:buildId`

&nbsp;

## 1. POST /register

Request:

- body:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_
```json
{
  "email": "string",
  "username": "string"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Email already registered"
}
OR
{
  "message": "Email cant be empty"
}
OR
{
  "message": "Password cant be empty"
}
OR
{
  "message": "Username already registered"
}
OR
{
  "message": "Username cant be empty"
}
```

&nbsp;

## 2. POST /login

Request:

- body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_
```json
{
  "access_token": "<token>"
}
```

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid email or password"
}
```

&nbsp;

## 3. POST /login-google

Request:

- headers:
```json
{
  "google_token": "<token>"
}
```

_Response (200 - OK)_
```json
{
    "access_token" : "Bearer <token>"
}
```

&nbsp;

## 4. GET /allBuild

Description:
- Get all build


_Response (200 - Created)_
```json
{
  "UserId": "integer",
  "MonsterId": "integer",
  "head": {...},
  "chest": {...},
  "legs": {...},
  "waist": {...},
  "gloves": {...},
  "weapon": {...}
}
```

&nbsp;

## 5. GET /monster

Description:
- Get all monster.

_Response (200 - OK)_
```json
[
    {
      "name": "string",
      "monsterId": "integer",
      "imageUrl": "string"
    }...
]
```

&nbsp;

## 6. GET /monster/:monsterName

Description:
- Fetch detail monster by their name

Request:

- params:
```json
{
  "monsterName": "string"
}
```

- params:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_
```json
{
    "name": "string",
    "monsterId": "integer",
    "imageUrl": "string"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Id not found"
}
```

&nbsp;

## 7. PUT /build/:monsterName

Description:
- Fetch all build with the same monster name

Request:

- params:
```json
{
  "monsterName": "string"
}
```

_Response (200 - OK)_
```json
[
    {
    "UserId": "integer",
    "MonsterId": "integer",
    "head": {...},
    "chest": {...},
    "legs": {...},
    "waist": {...},
    "gloves": {...},
    "weapon": {...}
    }, ...
]
```

&nbsp;

## 8. GET /builderUser

Description:
- get build made by the user

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

- user:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_
```json
[
    {
    "UserId": "integer",
    "MonsterId": "integer",
    "head": {...},
    "chest": {...},
    "legs": {...},
    "waist": {...},
    "gloves": {...},
    "weapon": {...}
    }, ...
]
```

&nbsp;

## 9 POST /build/:monsterName

Description:
- create user build against a spesific monster and give result of chance winning against monster

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

- user:
```json
{
  "id": "integer"
}
```

- body:
```json
{
    "head": {...},
    "chest": {...},
    "legs": {...},
    "waist": {...},
    "gloves": {...},
    "weapon": {...}
}
```

_Response (200 - OK)_
```json
{
    "result": "string"
}
```

&nbsp;

## 10 DELETE /delete/:buildId`

Description:
- create user build against a spesific monster and give result of chance winning against monster

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

- params:
```json
{
  "id": "integer"
}
```


_Response (200 - OK)_
```json
{
    "result": "string"
}
```

_Response (404 - OK)_
```json
{
    "message": "id not found"
}
```

&nbsp;


## Global Errror

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
