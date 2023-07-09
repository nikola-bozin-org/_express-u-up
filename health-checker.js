const route = require('express').Router();
const {_uptime} = require('./checkers')

const healthcheck = (req,res)=>{
    const health = {};
    const {uptime} = req.query;
    if(uptime){
        health['uptime'] = {value:_uptime(),metric:'seconds'};
    }
    return res.status(200).json(health)
}

const configure = (config)=>{
    const {path} = config;
    route.get(path,healthcheck)
    console.info(path)
}

module.exports = {
    configure,
    route
}