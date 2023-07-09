const si = require('systeminformation');

const _uptime =()=>{
    return process.uptime();
}
const _cpuLoad = async () => {
    const load = await si.currentLoad();
    return load.currentLoad;
}
const _diskSpace = async () => {
    const drives = await si.fsSize();
    const mainDrive = drives[0];
    
    const totalSpaceGB = mainDrive.size ? mainDrive.size / 1024 / 1024 / 1024 : 0;
    const usedSpaceGB = mainDrive.size ? (mainDrive.size - mainDrive.available) / 1024 / 1024 / 1024 : 0;
    const freeSpaceGB = mainDrive.size ? mainDrive.available / 1024 / 1024 / 1024 : 0;

    return {
        total: totalSpaceGB,
        used: usedSpaceGB,
        free: freeSpaceGB
    };
}
const _memoryUsage = () => {
    const memoryUsage = process.memoryUsage();
    const memoryUsageInMB = {
        rss: memoryUsage.rss / 1024 / 1024, // Resident Set Size
        heapTotal: memoryUsage.heapTotal / 1024 / 1024, // Heap Total
        heapUsed: memoryUsage.heapUsed / 1024 / 1024, // Heap Used
        external: memoryUsage.external / 1024 / 1024, // External memory
    };

    return memoryUsageInMB;
};


const _healthcheck = async(body)=>{
    const {uptime,cpuload,diskspace,memoryusage} = body;
    const health = {};
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
    return health;
}


module.exports={
    _healthcheck,
}