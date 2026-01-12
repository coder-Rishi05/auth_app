# authentication and authorization

authentication : it means cheking users credibility like taking email and password and then user validation.

athorization : giving permission to perform action on database based on profile rank.


### process

browser : send request on server.   
                with some credential email and password

server hr baar bhool jaata hai ki hm kon han to hr kaam ke liye hr baar hmse validation mangega.

now we use cookies and session here.

browser proof ke liye validation bhejega
server string return krega on browser jo vhi save ho jaaegi
now jb browser dubara server pe request bhejega to vo string bhi saath me jaaegi.
now that browser request has that string to server us string ko read krke samaj jaaega baar baar validation nhi mangega.

jb hm first time login krte han to hamare browser me ek string save ho jaati hai and everytime jb hm kuch actions perform krte han server dubara khbi hmari identity nhi poochta

### concept

sabse pehle kuch cheeze seekhni hai alag alag 

- cookie kaise set krte han
- bcrypt kaise use krte han for password encryption and dicryption.
- jwt kya hai and jwt mein data kaise store kren and bahar nikale


cookie : server se browser pe koi data store krwa dena is cookie.

jb bhi kisi or route pe bhi jaaenge us route me automatically cookie bhi send hogi.

this is the diffrence b/t authorisation header and cookie

to read cookie we need `cookie parser`

```js
npm i cookie-parser

```

```js

const bcrypt = require("bcrypt");

const app = express();

app.use(cookieParser());

// setting the cookie 
app.get("/", (req, res) => {
  res.cookie("name", "rishi");
  res.send("done");
});

// reading the coolie

app.get("/read", (req, res) => {
  console.log(req.cookies);
  res.send("read page");
});


```

now i will create a big string and send it to client browser and with that i can check user validation.

- bcrypt

it is used for incryption and dcryption isme hm salt bnate han and hash bnate han

password : ise ese save nhi kr skte isko pehle encrypt krenge

ex: sdfsjifhsgfbluyhdfvqodvndebvljquov : this is one the string that bcrypt do

- To hash a password : encryption

```js

app.get("/",(req,res)=>{
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("myPassword", salt, function(err, hash) {
        console.log(hash)
    });
});
})


```

- We cant do decryption so we do compare.

sdfsjifhsgfbluyhdfvqodvndebvljquov : save it

```js

app.get("/",(req,res)=>{
    bcrypt.compare("myPassword","sdfsjifhsgfbluyhdfvqodvndebvljquov",function(err, result) {
    console.log(result)
});

})
```

```js
const cookieParser = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

// hash password
app.get("/", (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("myPassword", salt, function (err, hash) {
      console.log("hashpwd : ", hash);
    });
  });
  res.send("password hashed");
});

// check password

app.get("/check", (req, res) => {
  bcrypt.compare(
    "myPassword",
    "$2b$10$NJEXGDp82sOuTZ4gUb9qfORWcZLnyBHa.xrzd4wWzeZEhtX71.Nl6",
    function (err, result) {
      console.log(result); // return true and false 
    }
  );

  res.send("check pwd")

});

app.listen(3001, () => {
  console.log(`server running at : `, 3001);
});

//  $2b$10$NJEXGDp82sOuTZ4gUb9qfORWcZLnyBHa.xrzd4wWzeZEhtX71.Nl6

```

### jwt

it is made of 3 things

1. algorithm data
2. data
3. signature
