# Api Products Documentation

### Base Url

The base URL for all API requests is:

Local :

```bash
http://localhost:8080
```

### Endpoints

**POST** `/v1/products`

Example :

**Endpoint**

```bash
http://localhost:8080/v1/products
```

**Request :**

```bash
{
  "nama": "REALME C53 NFC 8/256 & 6/128",
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  "price": 1769000,
  "brand": "REALME",
  "category": "Handphone",
  "quantity": 30,
  "images": [
    {
      "color": "Black",
      "colorCode": "#000000",
      "url": "https://down-id.img.susercontent.com/file/id-11134207-7qul5-li36onovrogpc8"
    },
    {
      "color": "Gold",
      "colorCode": "#FFD700",
      "url": "https://down-id.img.susercontent.com/file/id-11134207-7qula-li36onovrntk5f"
    }
  ]
}
```

**Response :**

```bash
{
    "message": "successfully",
    "data": {
        "product_id": "65f44cebfdd86ee042819d3b",
        "nama": "REALME C53 NFC 8/256 & 6/128",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        "price": 1769000,
        "brand": "REALME",
        "category": "Handphone",
        "quantity": 30,
        "images": [
            {
                "img_id": "65f44cebfdd86ee042819d3c",
                "color": "Black",
                "colorCode": "#000000",
                "img_url": "https://down-id.img.susercontent.com/file/id-11134207-7qul5-li36onovrogpc8"
            },
            {
                "img_id": "65f44cebfdd86ee042819d3d",
                "color": "Gold",
                "colorCode": "#FFD700",
                "img_url": "https://down-id.img.susercontent.com/file/id-11134207-7qula-li36onovrntk5f"
            }
        ]
    }
}
```

### Endpoints

**GET** `/v1/products`

Example :

**Endpoint**

```bash
http://localhost:8080/v1/products
```

**Response**

```bash
{
    "pagination": {
        "total_products": 4,
        "current_pages": 1,
        "total_pages": 1
    },
    "data": [
        {
            "product_id": "65f44cebfdd86ee042819d3b",
            "name": "REALME C53 NFC 8/256 & 6/128",
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            "price": 1769000,
            "brand": "REALME",
            "category": "Handphone",
            "quantity": 30,
            "images": [
                {
                    "img_id": "65f44cebfdd86ee042819d3c",
                    "color": "Black",
                    "colorCode": "#000000",
                    "img_url": "https://down-id.img.susercontent.com/file/id-11134207-7qul5-li36onovrogpc8"
                },
                {
                    "img_id": "65f44cebfdd86ee042819d3d",
                    "color": "Gold",
                    "colorCode": "#FFD700",
                    "img_url": "https://down-id.img.susercontent.com/file/id-11134207-7qula-li36onovrntk5f"
                }
                ......
            ],
            "review": []
        }
        ......
    ]
}
```

### Endpoints

**GET** `/v1/products/{productId}`

Example :

**Endpoint**

```bash
http://localhost:8080/v1/products/65f44cebfdd86ee042819d3b
```

**Response**

```bash
{
    "data": {
        "product_id": "65f44cebfdd86ee042819d3b",
        "name": "REALME C53 NFC 8/256 & 6/128",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        "price": 1769000,
        "brand": "REALME",
        "category": "Handphone",
        "quantity": 30,
        "images": [
            {
                "img_id": "65f44cebfdd86ee042819d3c",
                "color": "Black",
                "colorCode": "#000000",
                "img_url": "https://down-id.img.susercontent.com/file/id-11134207-7qul5-li36onovrogpc8"
            },
            {
                "img_id": "65f44cebfdd86ee042819d3d",
                "color": "Gold",
                "colorCode": "#FFD700",
                "img_url": "https://down-id.img.susercontent.com/file/id-11134207-7qula-li36onovrntk5f"
            }
        ],
        "review": []
    }
}
```

### Endpoints

**PATCH** `/v1/products/{productId}/update`

Example :

**Endpoint**

```bash
http://localhost:8080/v1/products/65f44cebfdd86ee042819d3b/update
```

**Request**

```bash
{
    "name": "REALME C53 NFC 8/256 & 6/128 Update",
    "images": [
        {
            "color": "Black",
            "colorCode": "#000000",
            "url": "https://down-id.img.susercontent.com/file/id-11134207-7qul5-li36onovrogpc83"
        }
    ]
}
```

**Response**

```bash
{
    "message": "successfully",
    "updated": {
        "product_id": "65f44cebfdd86ee042819d3b",
        "nama": "REALME C53 NFC 8/256 & 6/128",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        "price": 1769000,
        "brand": "REALME",
        "category": "Handphone",
        "quantity": 30,
        "images": [
            {
                "img_id": "65f450ebfdd86ee042819d3e",
                "color": "Black",
                "colorCode": "#000000",
                "img_url": "https://down-id.img.susercontent.com/file/id-11134207-7qul5-li36onovrogpc83"
            }
        ]
    }
}
```

### Endpoints

**DELETE** `/v1/products/{productId}/delete`

Example :

**Endpoint**

```bash
http://localhost:8080/v1/products/65f44cebfdd86ee042819d3b/delete
```

**Response**

```bash
{
    "message": "Product deleted successfully"
}
```

### Endpoints

**GET** `/v1/products/search`

Example :

**Endpoint**

```bash
http://localhost:8080/v1/products/search?keyword=realme
```

**Response**

```bash
{
    "data": [
        {
            "product_id": "65f5a138513f6bdec3e967d3",
            "name": "realme c53 nfc 8/256 & 6/128",
            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            "price": 1769000,
            "brand": "realme",
            "category": "handphone",
            "quantity": 30,
            "images": [
                {
                    "img_id": "65f5a138513f6bdec3e967d4",
                    "color": "Black",
                    "colorCode": "#000000",
                    "img_url": "https://down-id.img.susercontent.com/file/id-11134207-7qul5-li36onovrogpc8"
                },
                {
                    "img_id": "65f5a138513f6bdec3e967d5",
                    "color": "Gold",
                    "colorCode": "#FFD700",
                    "img_url": "https://down-id.img.susercontent.com/file/id-11134207-7qula-li36onovrntk5f"
                }
            ],
            "review": []
        }
    ]
}
```
