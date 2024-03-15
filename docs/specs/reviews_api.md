# Api Reviews Documentation

### Base Url

The base URL for all API requests is:

Local :

```bash
http://localhost:8080
```

### Endpoints

**POST** `/v1/products/{productId}/review`

Example :

**Endpoint**

```bash
http://localhost:8080/v1/products/65f452b58109904529f8e820/review
```

**Request**

```bash
{
  "userId": "65f4ad7ef9b578d960bcf546",
  "rating": 5,
  "comment": "Great product!"
}
```

**Response**

```bash
{
    "reviewId": "65f4af058b58b6115d458490",
    "userId": "65f4ad7ef9b578d960bcf546",
    "productId": "65f452b58109904529f8e820",
    "rating": 5,
    "comment": "Great product!",
    "createdAt": "2024-03-15T20:26:45.432Z",
    "users": {
        "userId": "65f4ad7ef9b578d960bcf546",
        "nama": "admin testing",
        "email": "admin@admin.com",
        "alamat": "jakarta",
        "no_telp": "0882288822"
    }
}
```

### Endpoints

**GET** `/v1/products/{productId}/review`

Example :

**Endpoint**

```bash
http://localhost:8080/v1/products/65f452b58109904529f8e820/review
```

**Response**

```bash
{
    "data": [
        {
            "review_id": "65f4af058b58b6115d458490",
            "product_id": "65f452b58109904529f8e820",
            "rating": 5,
            "comment": "Great product!",
            "createdAt": "2024-03-15T20:26:45.432Z",
            "users": {
                "user_id": "65f4ad7ef9b578d960bcf546",
                "name": "admin testing",
                "email": "admin@admin.com",
            }
        }
    ]
}
```

### Endpoints

**PATCH** `/v1/products/review/{reviewId}/update`

Example :

**Endpoint**

```bash
http://localhost:8080/v1/products/review/65f4af058b58b6115d458490/update
```

**Request**

```bash
{
    "rating": 4
}
```

**Response**

```bash
{
    "message": "successfully",
    "updated": {
        "review_id": "65f4af058b58b6115d458490",
        "product_id": "65f452b58109904529f8e820",
        "rating": 4,
        "comment": "Great product!",
        "createdAt": "2024-03-15T20:26:45.432Z"
    }
}
```

### Endpoints

**DELETE** `/v1/products/review/{reviewId}/delete`

Example :

**Endpoint**

```bash
http://localhost:8080/v1/products/review/65f4af058b58b6115d458490/update
```

**Response**

```bash
{
    "message": "review product deleted successfully"
}
```
