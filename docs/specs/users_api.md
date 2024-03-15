# Api Users Documentation

### Base Url

The base URL for all API requests is:

Local :

```bash
http://localhost:8080
```

### Endpoints

**POST** `/v1/users/register`

Example :

**Endpoint**

```bash
http://localhost:8080/v1/users/register
```

**Request**

```bash
{
    "nama": "admin testing",
    "email": "admin@admin.com",
    "password" : "admin"
}
```

**Response**

```bash
{
    "message": "successfully",
    "data": {
        "user_id": "65f4ad7ef9b578d960bcf546",
        "name": "admin testing",
        "email": "admin@admin.com",
        "address": null,
        "phone_number": null
    }
}
```

### Endpoints

**POST** `/v1/users/login`

Example :

**Endpoint**

```bash
http://localhost:8080/v1/users/login
```

**Request**

```bash
{
    "email": "admin@admin.com",
    "password" : "admin"
}
```

**Response**

```bash
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY0YTg4ZDFlNGJjZjA0OGQ4ZTExZjYiLCJpYXQiOjE3MTA1MzI5MDQsImV4cCI6MTcxMDU3NjEwNH0.S1z0BN724tLUYdP9zxNuz1CfQJ9j1w-ggzgYJOBN930"
}
```

### Endpoints

**GET** `/v1/users/users`

Example :

**Endpoint**

```bash
http://localhost:8080/v1/users
```

**Response**

```bash
{
    "data": [
        {
            "user_id": "65f4ad7ef9b578d960bcf546",
            "name": "admin testing",
            "email": "admin@admin.com",
            "address": null,
            "phone_number": null
        }
    ]
}
```

### Endpoints

**GET** `/v1/users/{userId}`

Example :

**Endpoint**

```bash
http://localhost:8080/v1/users/{userId}
```

**Response**

```bash
{
    "user_id": "65f4ad7ef9b578d960bcf546",
    "name": "admin testing",
    "email": "admin@admin.com",
    "address": null,
    "phone_number": null
}
```

**PATCH** `/v1/users/{userId}/update`

Example :

**Endpoint**

```bash
http://localhost:8080/v1/users/{userId}/update
```

**Request**

```bash
{
    "alamat": "jakarta",
    "no_telp": "0882288822"
}
```

**Endpoint**

```bash
{
    "message": "successfully",
    "updated": {
        "user_id": "65f4ad7ef9b578d960bcf546",
        "name": "admin testing",
        "email": "admin@admin.com",
        "address": "jakarta",
        "phone_number": "0882288822"
    }
}
```

**DELETE** `/v1/users/{userId}/delete`

Example :

**Endpoint**

```bash
http://localhost:8080/v1/users/{userId}/delete
```

**Response**

```bash
{
    "message": "User deleted successfully"
}
```
