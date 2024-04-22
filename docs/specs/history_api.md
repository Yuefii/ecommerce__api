# Api History Documentation

### Base Url

The base URL for all API requests is:

Local :

```bash
http://localhost:8080
```

### Endpoints

**POST** `/v1/users/{userId}/history`

Example :

**Endpoint**

```bash
http://localhost:8080/v1/users/6611835f983aec4ad5088832/history
```

**Request**

```bash
{
  "title": "webcams xioami",
  "category": "webcams"
}
```

**Response**

```bash
{
    "message": "successfully",
    "data": {
        "user_id": "6611835f983aec4ad5088832",
        "name": "testinguser",
        "email": "testinguser@gmail.com",
        "history": {
            "history_id": "6625da8985c5b6c382a404ab",
            "title": "webcams xioami",
            "category": "webcams"
        }
    }
}ss
```

### Endpoints

**GET** `/v1/users/:userId/history`

Example :

**Endpoint**

```bash
http://localhost:8080/v1/users/6611835f983aec4ad5088832/history
```

**Response**

```bash
{
    "data": [
        {
            "history_id": "6625cd26f668f15309d1e3c6",
            "title": "webcams xioami",
            "category": "webcams",
            "user": {
                "user_history_id": "6611835f983aec4ad5088832",
                "name": "testinguser",
                "email": "testinguser@gmail.com"
            }
        },
        ...
    ]
}
```

### Endpoints

**DELETE** `/v1/users/:historyId/history/delete`

Example :

**Endpoint**

```bash
http://localhost:8080/v1/users/6625cc6b678d4e4a1c360135/history/delete
```

**Response**

```bash
{
    "message": "history deleted successfully"
}
```
