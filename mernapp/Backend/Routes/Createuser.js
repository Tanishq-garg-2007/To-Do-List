const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const jwtsecret = "qwertyuioplkjhgfdsaxzcvbvnmvkd";

router.post("/createuser",async(req,res)=>{
    const salt = await bcrypt.genSalt(10);
    let secpass = await bcrypt.hash(req.body.password,salt);

    try {
        await User.create({
            name: req.body.name,
            password: secpass,
            email: req.body.email,
        }).then(()=>res.json({success:true}));
    }
    catch (error) {
        console.log('Error');
        res.json({success:false});
    }

})

router.post("/loginuser",async(req,res)=>{
    let email =  req.body.email;
    let userData = await User.findOne({ email });

        if (!userData) {
            return res.status(400).json({ error: "Invalid email. Please try again." });
        }

        const passcmp = await bcrypt.compare(req.body.password,userData.password);
        if(!passcmp){
            return res.status(400).json({error:"Try Login With Correct Email"});
        }

        const data = {
            user:{
                id:userData.id
            }
        }

        const authToken = jwt.sign(data,jwtsecret);
        return res.json({ success: true, authToken: authToken });

})
module.exports = router;