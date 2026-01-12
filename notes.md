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
