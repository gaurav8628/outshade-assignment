const express = require('express');
const app=express();
const cors = require('cors')
const mongoose = require('mongoose');


// environment variable
port = process.env.PORT || 2000;


// routes
const authRoutes = require('./routes/user');
const eventRoutes = require ('./routes/events');

//middleware

app.use(express.json());
app.use(cors())



// db config

const connection_url="mongodb://localhost:27017/event-management"

mongoose.connect(
    connection_url,
    {
        // useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    ).then(() => {
        console.log('database connected');
    });



    app.use('/api/user',authRoutes);
    app.use('/api/event',eventRoutes);




app.listen(port,() => {
    console.log(`server is running on port ${port}`)
})
