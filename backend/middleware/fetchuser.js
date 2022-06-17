const jwt = require('jsonwebtoken');
const JWT_SECRET="hello Udbhav $sharma$!!!";
const fetchuser = (req, res, next) => {

    //get the user from the jwt token and add id to req object
    const token=req.header('auth-token');
    if(!token){
    res.status(401).send({error: "please authenticate valid token"});
    }
    try {
        const uid=jwt.verify(token,JWT_SECRET);
        req.user=uid.user;
        next();
    } catch (error) {
        res.status(401).send({error: "please authenticate valid token"});
    }
   
}

module.exports= fetchuser