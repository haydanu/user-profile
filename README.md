# User Profile REST-API

## How To

### Run Your Teminal

* Clone this repository
```sh
git clone https://github.com/herdanuyp/user-profile.git
```
```sh
npm install
```

* Run Your Server
```sh
nodemon server.js
```

* Open/Test this API using POSTMAN
```sh
http://localhost:3000/user

to get all user profile
```

```sh
http://localhost:3000/user/signup

to create new user

{
 "name": "your name",
 "phoneNumber": "your phone number",
 "email": "your email",
 "password": "your password"
}
```

```sh
http://localhost:3000/user/:userId/change

change your password

{
 "password": "your new password"
}
```

```sh
http://localhost:3000/user/:userId

to delete user
```


```sh
http://localhost:3000/user/:userId

to update user profile

{
 "name": "your name"
 "phoneNumber": "your phone number"
}
```

```sh
http://localhost:3000/user/login

to login

{
 "email": "your email"
 "password": "your new password"
}
```

## API Endpoints

| HTTP   | Routes                 | Description                     |
| ------ | ---------------------- | ------------------------------- |
| GET    | `/`                    | ...                             |
| GET    | `/user`                | get all user profile .          |
| POST   | `/user/signup`         | to sign up as a new user        |
| POST   | `/user/login`          | to login .                      |
| DELETE | `/user/:userId` .      | delete user                     |
| POST   | `/user/:userId/change` | to change password              |
| PUT    | `/user/:userId` .      | to update user profile          |
