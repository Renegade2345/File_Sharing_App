// os module provided by default 
const os = require("os")
const { Interface } = require("readline")

exports.getNetworkIpAddress=()=>{
    const networkInterfaces = os.networkInterfaces()
    

    const connectedNetworkInterface = Object.values(networkInterfaces).flatMap((interface)=>interface).find((iface)=>iface.family === "IPv4")
    if (connectedNetworkInterface){
        return connectedNetworkInterface.address
    }else{
        return null
    }
}