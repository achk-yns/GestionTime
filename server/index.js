const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT_EXPRESS || 3000
const AgentRoute = require('./Routes/AgentRoute')
// DB 
require('./DbConnect')
const app  = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/agent',AgentRoute)


app.listen(PORT,()=>{
    console.log(`listening...PORT:${PORT}`);
})