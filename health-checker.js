const route = require('express').Router();
const {_uptime,_cpuLoad,_diskSpace} = require('./checkers')

const healthcheck = async(req,res)=>{
    const health = {};
    const {uptime,cpuload,diskspace} = req.query;
    if(uptime==='1'){
        health['uptime'] = {value:_uptime(),metric:'seconds'};
    }
    if(cpuload==='1'){
        health['cpuload'] = {value: await _cpuLoad(), metric: 'percentage'};
    }
    if(diskspace){
        const diskSpace = await _diskSpace();
        health['diskspace'] = {
            total: {value: diskSpace.total, metric: 'GB'},
            used: {value: diskSpace.used, metric: 'GB'},
            free: {value: diskSpace.free, metric: 'GB'}
        };
    }
    return res.status(200).json(health)
}

const configure = (config)=>{
    const {path} = config;
    route.get(path,healthcheck)
}

module.exports = {
    configure,
    route
}