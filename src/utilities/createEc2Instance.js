const { EC2Client, RunInstancesCommand, CreateTagsCommand } = require("@aws-sdk/client-ec2");

// to be moved to the environment variiables file
const REGION = "us-east-1"; 

// Create an EC2 client
const ec2Client = new EC2Client({ region: REGION });


const instanceParams = {
   ImageId: "ami-053a45fff0a704a47", 
   InstanceType: "t2.micro",        
   KeyName: "auth-aws",        
   MinCount: 1,
   MaxCount: 1,
};


const createInstance = async () => {
   try {
      // Run the instance
      const data = await ec2Client.send(new RunInstancesCommand(instanceParams));
      const instanceId = data.Instances[0].InstanceId;
      console.log("Created instance", instanceId);

      // Add tags to the instance (by the way this is optional)
      const tagParams = {
         Resources: [instanceId],
         Tags: [
            {
               Key: "Name",
               Value: "SDK Sample Instance",
            },
         ],
      };
      await ec2Client.send(new CreateTagsCommand(tagParams));
      console.log("Instance tagged successfully");
   } catch (err) {
      console.log("Error creating instance", err);
   }
};

//createInstance();

module.exports={createInstance};