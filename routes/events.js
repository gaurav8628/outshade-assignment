// routes for creating event

const express = require('express')
const router = express.Router();
const eventSchema = require('../models/events');
const auth = require('../middlewares/auth');


router.post('/create/event',auth,async (req,res) => {
     // console.log(req.body);
     try{
        await eventSchema.create(
            {
                creator: req.user.username,
                invitees: req.body.invitees,
                eventDate: Date.now()

            })
        return res.json({status:'ok'})
    }
    catch (err)
    {
        return res.json({status:'error', error:err})

    }
});


function compare( a, b ) {
    if ( a.eventDate < b.eventDate ){
      return -1;
    }
    if ( a.eventDate > b.eventDate ){
      return 1;
    }
    return 0;
  }


router.post("/list/events/invited", auth, async (req,res) => {
    
    const eventsCreated = await eventSchema.find({ creator: req.user.username})
        .then()
        .catch()
        {

        }

    var eventsNeedToAttend = [];
    const eventsInvited = await eventSchema.find();
    const pagesize = req.body.pagesize;
    const pagenumber = req.body.pagenumber;
    const comp = (pagenumber-1)*pagesize;
    var count=0;


    eventsInvited.map(async (events) => {
        console.log(events);
        await events.invitees.map(async (invites) => {
            if(invites.username === req.user.username)
            {
                if(count>=comp && count<(pagesize*pagenumber))
                eventsNeedToAttend.push(events);

                count++;
        
            } 
        })
    })

    await eventsNeedToAttend.sort(compare);

    
    return res.json({status:'ok', eventsInvited: eventsNeedToAttend})

})




router.post("/list/events/created", auth, async (req,res) => {
    const pagesize = req.body.pagesize;
    const pagenumber = req.body.pagenumber;
    
    const eventsCreated = await eventSchema.find({ creator: req.user.username})
        .skip((pagenumber-1) *pagesize)
        .limit(pagesize)
        .sort({eventDate:1});


    return res.json({status:'ok', eventsCreated: eventsCreated})

})

module.exports=router;