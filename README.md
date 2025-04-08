# Airbean-gruppuppgift

## Om projektet

Den här sidan är resultatet av ett KYH grupprojekt där vi skapade en backend-server
till det fiktiva företaget AirBean.

https://williamwestergard.github.io/Airbean-Frontend/


#### Vi har använt oss av:
- express.js
- node.js
- sqlite3


## Instruktioner till REST API.
Url:  https://airbean-backend-k7pq.onrender.com
(Ingen nyckel behövs)

### Routes:

- /api/user/  --- __Skapa användare__
  - /api/user/:userid   ---  __Hitta eller radera användare__
  -  /api/user/history/:userId --- __Se användarens orderhistorik__


- /api/products --- __Se alla produkter i databasen__
  - /api/products/:id --- __Hitta individuella produkter__


- /api/order --- __Skapa beställning__
  - /api/order/:orderId --- __Hitta beställning eller lägg till produkt i beställningen__
  - /api/order/:orderId/product/:productId --- __Ta bort produkt från beställningen__

