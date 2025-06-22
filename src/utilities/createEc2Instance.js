const {
  EC2Client,
  RunInstancesCommand,
  CreateTagsCommand,
  DescribeInstancesCommand,
  waitUntilInstanceStatusOk,
} = require("@aws-sdk/client-ec2");
const { userDataScript } = require("../scripts/userDataScript");
const { v4: uuidv4 } = require("uuid");
// to be moved to the environment variiables file
const REGION = "us-west-2";

const ec2Client = new EC2Client({ region: REGION });

// EC2 Configurations

// Encode script to Base64 (AWS requires Base64 encoding for UserData)
const userDataBase64 = Buffer.from(userDataScript).toString("base64");

const instanceParams = {
  ImageId: "ami-01ded080677687aee", // Amazon Linux AMI
  InstanceType: "t2.micro",
  KeyName: "auth-aws",
  MinCount: 1,
  MaxCount: 1,
  IamInstanceProfile: {
    Arn: "arn:aws:iam::970547355263:instance-profile/ec2Role",
  },
  SecurityGroupIds: ["sg-04001e0f419cd5f77"],
  // UserData: userDataBase64, Attach User Data script
};

const createInstance = async () => {
  try {
    // Run the instance
    const token = uuidv4();
    console.log("🔑 clientToken:", token);
    const command = new RunInstancesCommand({
      ...instanceParams, // ✅ Spread the original params
      ClientToken: token, // ✅ Add fresh client token
    });
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
    console.log(
      "⏳ Waiting for instance to be 'running' and pass status checks..."
    );
    await waitUntilInstanceStatusOk(
      { client: ec2Client, maxWaitTime: 300 }, // wait up to 5 minutes
      { InstanceIds: [instanceId] }
    );
    console.log("✅ Instance is running and passed status checks");

    // Fetch Public IP
    const describeCommand = new DescribeInstancesCommand({
      InstanceIds: [instanceId],
    });
    const describeData = await ec2Client.send(describeCommand);
    const publicIp = describeData.Reservations[0].Instances[0].PublicIpAddress;
    console.log("🌐 Public IP Address:", publicIp);
    return publicIp;
  } catch (err) {
    console.log("Error creating instance", err);
  }
};
//console.log("Creating EC2 instance...");

//createInstance();

module.exports = { createInstance };
