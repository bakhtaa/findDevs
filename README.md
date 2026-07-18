#FIND DEVS APIS

##AUTH ROUTER
- POST /signup
- POST /login
- POST /logout



##profile ROUTER 
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password  //forgot password api

##Connection Router
-POST /sendConnectionRequest/interested/:userId
-POST /sendConnectionRequest/ignore/:userId
-POST /receiveConnectionRequest/accepted/:userId
-POST /receiveConnectionRequest/rejected/:userId



#Connection request Router
POST /request/send/:status/:userId




STATUS of connectionRequest: ignored, interested, accepted, rejected
![alt text](image.png)

##user connection ROUTER
GET /connections
GET /requests/received
GET /feed 
//gives you the profiles of all the users 
![alt text](image-2.png)
![alt text](image-3.png)
![alt text](image-4.png)
![alt text](image-5.png)

![alt text](image-6.png)

Plus il y a d'index, plus les lectures sont rapides, mais plus les écritures sont coûteuses.

![alt text](image-7.png)
![alt text](image-8.png)