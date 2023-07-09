const express = require('express');
const {route,configure} = require('./health-checker')
const server = express();

const port = 9876;



server.use(express.json()); 
server.use(express.urlencoded({ extended: true })); 

configure({path:'/health'})
server.use(route)

const startServer = async()=>{
  server.listen(port, () => {
    console.log(`Server listening at PORT: ${port}`);
  });
}

startServer();