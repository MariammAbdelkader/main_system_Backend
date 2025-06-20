const { createInstance } = require("../utilities/createEc2Instance")

const websiteCreation = async ()=>{

    const instance_ip = await createInstance();
    return {instance_ip}


}
module.exports = {websiteCreation}