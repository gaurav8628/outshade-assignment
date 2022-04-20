// routes for authentication
const express = require('express')
const router = express.Router();
const userSchema = require('../models/user');
const eventSchema = require('../models/events');
const auth = require('../middlewares/auth');
const jwt = require('jsonwebtoken');

router.post('/register',async(req,res) => {
    console.log(req.body);
    const usercheck = await userSchema.findOne({email: req.body.email});
    if(usercheck)
    {
        res.json({message:'user already exist'});
    }

        await userSchema.create(
            {
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,

            });
            const user = await userSchema.findOne({email: req.body.email});
            
            const token = await jwt.sign({
                username:user.username,
                user_id: user._id,

            },'secret123')
            res.cookie('token',token,{expiresIn:'1hr'})
           
            
            return res.header('x-auth-token',token).json({status:'ok', user:token,id:user._id,message:'successfull registration and login'});

    
});
router.post('/login',async (req,res) => {
 // console.log(req.body)

 const user=await userSchema.findOne(
    {
        email:req.body.email,
        password: req.body.password,

    })
    if(user)
    {
        // creting a token
        const token = jwt.sign({
            username:user.username,
            user_id: user._id,

        },'secret123')
        // creating a cookie which will be helpfull when logging out the user
        res.cookie('token',token,{expiresIn:'1hr'})
        // user.login=true;
        //searching for the event created by the user from eventSchema ./models/userEvents.js
        const eventsCreated = await eventSchema.find({ creator: user.username})
        .then()
        .catch()
        {

        }
        // searching fro the events in which the current user is invited from eventSchema ./models.userEvents.js
        var eventsNeedToAttend = [];
        const eventsInvited = await eventSchema.find()
        eventsInvited.map(async (events) => {
            console.log(events);
            await events.invitees.map(async (invites) => {
                if(invites.username === user.username)
                {
                    eventsNeedToAttend.push(events);
            
                } 
            })
        })

        return res.json({status:'ok', user:token,message:'successfull login', eventsCreated: eventsCreated, eventsInvited: eventsNeedToAttend})
    }
    else
    {
        return res.json({status:"error", user:false,message:'email or password is wrong'})
    }
    
});
router.post('/update',auth,async (req,res) => {

    const user=await userSchema.findOne(
        {
            email:req.body.email,
            password: req.body.password1,

        })
        if(user)
        {
            user.password=req.body.password2;
            user.save(function(err){
                if(err) return res.json({staus:'failed', message:'unable to update password'})
                else return res.json({status:'ok', message:'password updated successfully'})
            })
        }
        else
        return res.json({staus:'failed', meassage:'enter correct username or password'})

});
router.post('/logout',auth,async (req,res) => {

    
    if(res.cookie)
    {
        // destroying the cookie for logging out the user
    res.clearCookie('token');
    res.json(
        {
            status:'ok',
            message:'logout successfull'
        }
    )
    }else {
        res.json({status:'ok',message:"please login first"});
    }

});



module.exports=router;