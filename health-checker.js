const route = require('express').Router();
const {_uptime,_cpuLoad,_diskSpace,_memoryUsage} = require('./checkers')

const healthcheck = async(req,res)=>{
    const health = {};
    const {uptime,cpuload,diskspace,memoryusage} = req.body;
    if(uptime){
        health['uptime'] = {value:_uptime(),metric:'seconds'};
    }
    if(cpuload){
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
    if(memoryusage){
        const memoryUsage = _memoryUsage();
        health['memoryusage'] = {
            rss: {value: memoryUsage.rss, metric: 'MB'},
            heapTotal: {value: memoryUsage.heapTotal, metric: 'MB'},
            heapUsed: {value: memoryUsage.heapUsed, metric: 'MB'},
            external: {value: memoryUsage.external, metric: 'MB'}
        };
    }
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