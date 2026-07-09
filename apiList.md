#DEV TINDER APIS

##AUTH ROUTER
- POST /signup
- POST /login
- POST /logout



##profile ROUTER 
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

##Connection Router
-POST /sendConnectionRequest/interested/:userId
-POST /sendConnectionRequest/ignore/:userId
-POST /receiveConnectionRequest/accepted/:userId
-POST /receiveConnectionRequest/rejected/:userId

STATUS of connectionRequest: ignore, interested, accepted, rejected
![alt text](image.png)

##user connection ROUTER
GET /connections
GET /requests/received
GET /feed 
//gives you the profiles of all the users 
![alt text](image-2.png)
![alt text](image-3.png)
![alt text](image-4.png)
