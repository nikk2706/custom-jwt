const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secretKey = "secretkey";

app.listen(3000, () => {
    console.log("app is unning on 3000 port");
})


app.post("/login", (req, res) => {
    const user = {
        id: 1,
        username: "abc",
        email: "abc@gmail.com"
    }
    jwt.sign({ user }, secretKey, { expiresIn: '120s' }, (err, token) => {
        res.json({
            token
        })
    })
})

app.post("/profile", verifyToken, (req, res) => {
jwt.verify(req.token,secretKey,(err,authData)=>{
    if(err){
        res.send({
            res :"Invalid Token"
        })
    }else{
        res.json({
            message :"Profile Accessed",
            authData
        })
    }
})
})
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        res.send({
            result: 'Token is not valid'
        })
    }
}
app.get("/", (req, res) => {
    res.json({
        message: "Sample api"
    })
})