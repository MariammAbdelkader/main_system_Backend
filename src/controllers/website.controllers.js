const { websiteCreation } = require("../services/website.services");
const { createInstance } = require("../utilities/createEc2Instance");

const createWebsite = async (req,res)=>{
     try {
    
        const confirmResponse = await createInstance(
        );
        res.status(200).json({ instance_ip: confirmResponse });
      } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
      }
}

module.exports={createWebsite}