const route = require('express').Router();
const {_healthcheck} = require('./checkers')

const healthcheck = async(req,res)=>{
    const health = await _healthcheck(req.body)
    return res.status(200).json(health)
}

const configure = (config)=>{
    const {path} = config;
    route.post(path,healthcheck)
}

module.exports = {
    configure,
    route
}