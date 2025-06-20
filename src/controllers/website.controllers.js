const { websiteCreation } = require("../services/website.services");

const createWebsite = async (req,res)=>{
     try {
        const { username, code} = req.body;
    
        const confirmResponse = await websiteCreation(
        );
        res.status(200).json(confirmResponse);
      } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
      }
}

module.exports={createWebsite}