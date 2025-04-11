# Airbean-gruppuppgift

## Om projektet

AirBean är ett företag som låter kunder beställa kaffe hem till dörren via drönare.
Vilken lyx! Om det nu bara fanns på riktigt.

Det här repot är resultatet av ett grupprojekt där vi skapade en backend-server
till ett fiktivt företag.

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



<br>

### Websockets:
En del av vår gruppuppgift var att diskutera om hur vi skulle kunna ha använt websockets i projektet.
Främst tänker vi att vi skulle ha en chatt-funktion där kunden kan prata med en kundservice.

Kunden skulle kunna få hjälp att ta bort beställningar som kunden inser att hen har skrivit in fel uppgifter för.
Hen skulle också kunna få hjälp att spåra paket som inte har anlänt än.
