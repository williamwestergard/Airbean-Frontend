# Airbean-gruppuppgift

## Om projektet

Den här sidan är resultatet av ett KYH grupprojekt där vi skapade en backend-server till det fiktiva företaget AirBean.

https://williamwestergard.github.io/Airbean-Frontend/

Vi har använt oss av:
- express.js
- node.js
- sqlite3


## Instruktioner till REST API.
Url:  https://airbean-backend-k7pq.onrender.com
(Ingen nyckel behövs)

**OBS:** Alla endpoints börjar med URL:en /api/


## POST /user
Skapar en användare med namn, adress, epost och användar-id.
```
{
  "id": "747fd956-6edc-4ddf-9bc7-305a9ff1826d",
  "name": "Homer",
  "email": "homerjsimpson@gmail.com",
  "address": "Springfield"
}
```

### GET /user/:userId
Hitta användare

### GET /user/history/:userId
Se användarens beställningshistorik

### DELETE /user/:userId
Ta bort användaren

<br>

## GET /products 
Hitta alla produkter

### GET /products/:id
Hitta individuella produkter

<br>

## POST /order 
Skapa beställning med beställnings-id där användaren och produkterna har lagts in. 
```
{
  "orderId": "b063cd3b-bff8-42e9-84c0-12f05242ef6d",
  "status": "pending",
  "totalPrice": 157,
  "createdAt": "2025-04-11T09:13:54.152Z"
}
```

### GET /order/:orderId
Hitta beställning

### PATCH /order/:orderId/product/productId
Lägg till produkt i beställningen

### DELETE /order/:orderId/product/productId
Ta bort produkt i beställningen
