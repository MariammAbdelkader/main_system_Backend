const {
  EC2Client,
  RunInstancesCommand,
  CreateTagsCommand,
} = require("@aws-sdk/client-ec2");
const { userDataScript } = require("../scripts/userDataScript");

// to be moved to the environment variiables file
const REGION = "us-west-2";

const ec2Client = new EC2Client({ region: REGION });

// EC2 Configurations

// Encode script to Base64 (AWS requires Base64 encoding for UserData)
const userDataBase64 = Buffer.from(userDataScript).toString("base64");

const instanceParams = {
  ImageId: "ami-0f94bc8eba5db7759", // Amazon Linux AMI
  InstanceType: "t2.micro",
  KeyName: "auth-aws",
  MinCount: 1,
  MaxCount: 1,
  IamInstanceProfile: {
    Arn: "arn:aws:iam::970547355263:instance-profile/ec2Role",
  },
  SecurityGroupIds: ["sg-04001e0f419cd5f77"],
  UserData: userDataBase64, // Attach User Data script
};

const createInstance = async () => {
  try {
    // Run the instance
    const command = new RunInstancesCommand(instanceParams);
    const data = await ec2Client.send(command);
    const instanceId = data.Instances[0].InstanceId;
    console.log("✅ EC2 Instance Created:", instanceId);

    // Add tags to the instance (btw this is optional)
    const tagParams = {
      Resources: [instanceId],
      Tags: [
        {
          Key: "Name",
          Value: "backend template Instance 3",
        },
      ],
    };
    await ec2Client.send(new CreateTagsCommand(tagParams));
    console.log("Instance tagged successfully");
  } catch (err) {
    console.log("Error creating instance", err);
  }
};
console.log("Creating EC2 instance...");

createInstance();

module.exports = { createInstance };
