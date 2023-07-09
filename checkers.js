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



module.exports={
    _uptime,
    _cpuLoad,
    _memoryUsage,
    _diskSpace,
}