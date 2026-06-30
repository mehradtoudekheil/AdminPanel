# Shop Backend API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication
Protected endpoints require a Bearer token in the header:
```
Authorization: Bearer <accessToken>
```

Access tokens expire after **15 minutes**. Use the refresh token endpoint to get a new one without logging in again.

---

## 🔐 Auth

### Register
```
POST /auth/register
```
**Body:**
```json
{
  "name": "Mehrad",
  "email": "mehrad@test.com",
  "password": "Mehrad@123"
}
```
Password must contain a lowercase letter, an uppercase letter, a number, and a special character, min 8 chars.

### Login
```
POST /auth/login
```
**Body:**
```json
{
  "email": "mehrad@test.com",
  "password": "Mehrad@123"
}
```
**Returns:** `accessToken` (15m) and `refreshToken` (7d).

### Refresh Access Token
```
POST /auth/refresh
```
**Body:**
```json
{
  "refreshToken": "your_refresh_token"
}
```
**Returns:** a new `accessToken`.

### Logout
```
POST /auth/logout
🔒 requires token
```
Invalidates the stored refresh token.

---

## 👤 Profile

### Get profile
```
GET /profile
🔒 requires token
```
Regular users (`role: user`) also receive their order history in the response.

### Update profile
```
PUT /profile
🔒 requires token
Content-Type: multipart/form-data
```
**Body (form-data):**
```
name: Mehrad
firstName: مهراد
lastName: احمدی
phone: 09123456789
darkMode: true
address[street]: خیابان ولیعصر
address[city]: تهران
address[province]: تهران
address[postalCode]: 1234567890
avatar: (image file, optional)
```
All fields are optional — only sent fields get updated. Uploading a new avatar deletes the old one.

### Change password
```
PUT /profile/password
🔒 requires token
```
**Body:**
```json
{
  "currentPassword": "Mehrad@123",
  "newPassword": "Mehrad@1234"
}
```

---

## 👥 Users

### List users
```
GET /users
🔒 superadmin only
```
**Query params (optional):**
```
?page=1
?limit=10
?role=admin
?search=email_keyword
```

### Get single user
```
GET /users/:id
🔒 superadmin only
```

### Change user role
```
PUT /users/:id/role
🔒 superadmin only
```
**Body:**
```json
{ "role": "admin" }
```
Allowed values: `user` | `admin` | `superadmin`

### Delete user
```
DELETE /users/:id
🔒 superadmin only
```
Superadmin accounts cannot be deleted.

---

## 📂 Categories

### List all categories
```
GET /categories
```

### Get single category
```
GET /categories/:id
```

### Get subcategories
```
GET /categories/:id/children
```

### Create category
```
POST /categories
🔒 admin | superadmin
```
**Body:**
```json
{
  "name": "الکترونیک",
  "description": "محصولات الکترونیکی",
  "parent": "parent_category_id (optional)"
}
```

### Update category
```
PUT /categories/:id
🔒 admin | superadmin
```
**Body:**
```json
{
  "name": "الکترونیک",
  "description": "محصولات الکترونیکی",
  "isActive": true,
  "parent": "parent_category_id (optional)"
}
```

### Delete category
```
DELETE /categories/:id
🔒 admin | superadmin
```
Fails if the category still has subcategories.

---

## 📦 Products

### List products
```
GET /products
```
**Query params (optional):**
```
?category=category_id
?search=product_name
?minPrice=100000
?maxPrice=500000
?page=1
?limit=10
```

### Get single product
```
GET /products/:id
```

### Create product
```
POST /products
🔒 admin | superadmin
Content-Type: multipart/form-data
```
**Body (form-data):**
```
name: آیفون ۱۵           (required)
description: گوشی اپل
price: 500000             (required)
stock: 10                 (required)
category: category_id     (required)
images: (image files, up to 5, optional)
```

### Update product
```
PUT /products/:id
🔒 admin | superadmin
Content-Type: multipart/form-data
```
All fields optional — only sent fields get updated. Uploading new images deletes the old ones.

### Delete product
```
DELETE /products/:id
🔒 admin | superadmin
```
Also deletes all associated images from disk.

---

## 🛒 Orders

### List all orders
```
GET /orders
🔒 admin | superadmin
```
**Query params (optional):**
```
?page=1
?limit=10
?status=pending
```

### My orders
```
GET /orders/myorders
🔒 requires token
```
**Query params (optional):** `?page=1&limit=10`

### Get single order
```
GET /orders/:id
🔒 requires token
```
Regular users can only view their own orders.

### Create order
```
POST /orders
🔒 requires token
```
**Body:**
```json
{
  "items": [
    { "product": "product_id", "quantity": 2 }
  ],
  "shippingAddress": {
    "address": "خیابان ولیعصر",
    "city": "تهران",
    "postalCode": "1234567890"
  }
}
```
Stock is checked and decremented automatically.

### Update order status
```
PUT /orders/:id/status
🔒 admin | superadmin
```
**Body:**
```json
{ "status": "processing" }
```
Allowed values: `pending` | `processing` | `shipped` | `delivered` | `cancelled`

---

## 📊 Dashboard

### Get dashboard stats
```
GET /dashboard
🔒 admin | superadmin
```
**Returns:**
```json
{
  "overview": { "totalUsers": 0, "totalProducts": 0, "totalOrders": 0, "totalRevenue": 0 },
  "orders": { "byStatus": [], "monthlyOrders": 0, "monthlyRevenue": 0 },
  "products": { "lowStock": [], "inactiveCount": 0, "latest": [] },
  "users": { "byRole": [] }
}
```
- `lowStock`: active products with stock under 5
- `latest`: 5 most recently added products

---

## 📋 Logs

### Get error logs
```
GET /logs
🔒 superadmin only
```
Returns logged server errors (status 500), most recent first.

### Clear logs
```
DELETE /logs
🔒 superadmin only
```

---

## 📑 Pagination

Endpoints that support pagination (`products`, `orders`, `myorders`, `users`) return this shape:
```json
{
  "total": 42,
  "page": 1,
  "pages": 5,
  "products": [ ... ]
}
```
(the array key matches the resource: `products`, `orders`, or `users`)

---

## 📊 Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad request / validation error |
| 401 | Unauthorized (missing/invalid/expired token) |
| 403 | Forbidden (insufficient role) |
| 404 | Not found |
| 500 | Server error |

---

## 📖 Interactive Docs

Full interactive Swagger UI is available at:
```
http://localhost:8000/api-docs
```
