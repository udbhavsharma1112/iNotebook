const express = require("express");
const bcrypt=require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const JWT_SECRET="hello Udbhav $sharma$!!!";
const fetchuser = require('../middleware/fetchuser');



//ROUTE 1:  create new user using /api/auth/createuser ..... no login require




router.post('/createuser', [
    //to validate 
    body('email', 'enter valid email').isEmail(),
    body('password', 'enter atleast 5 char').isLength({ min: 5 }),
    body('name', 'enter valid name').isLength({ min: 3 })
], async (req, res) => {
let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });// to show all errors
    }
    // check weather user with this email already exist or not
    try{
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).json({ success,error: "sorry this email already exist" })
    //hashing the password
    const salt = await bcrypt.genSaltSync(10);
    const sacpassword = await bcrypt.hashSync(req.body.password, salt);
    
    //create new user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: sacpassword,
    });
        
        const data={
           user:{
               id:user.id
           }
        }
       const authdata= jwt.sign(data,JWT_SECRET);
       success=true;
        res.json({success,authdata})
        console.log(authdata)
    }catch(error){
        console.error(error.message)
        res.status(500).send('some error occur')
    }
})



//ROUTE 2:  authenticate new user using /api/auth/login ..... no login require





router.post('/login', [
    //to validate 
    body('email', 'enter valid email').isEmail(),
    body('password', 'enter password').exists(),
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });// to show all errors
    }

    const {email,password}= req.body;
    try{
        let user=await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({error:"enter correct creds"});

        }
        const passcmp=await bcrypt.compare(password,user.password);
        if(!passcmp){
            success=false;
            return res.status(400).json({success,error:"enter correct creds"});
        }
        const data={
            user:{
                id:user.id
            }
         }
        const authdata= jwt.sign(data,JWT_SECRET);
        success=true;
         res.send({success,authdata});
        
    } catch(error){
        console.error(error.message)
        res.status(500).send('internal error occur');
    }


})


//ROUTE 3: get logged in user detail using /api/auth/getuser ....login required


 router.post('/getuser',fetchuser,async (req, res) => {

    try {
        const userId=req.user.id;
        const user= await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
       console.error(error.message)
       res.status(500).send('internal error occur');
    }
})
module.exports = router