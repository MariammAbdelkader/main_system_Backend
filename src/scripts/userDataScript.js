const userDataScript = `#!/bin/bash

docker start test-backend-1
#sudo yum update -y
#sudo yum install -y curl jq

# Install Docker
#sudo yum install -y docker
#sudo systemctl start docker
#sudo systemctl enable docker
#sudo usermod -aG docker ec2-user  # Change to 'ubuntu' if using Ubuntu

# Install Docker Compose Manually
#sudo curl -L "https://github.com/docker/compose/releases/download/\$(curl -s https://api.github.com/repos/docker/compose/releases/latest | jq -r .tag_name)/docker-compose-\$(uname -s)-\$(uname -m)" -o /usr/local/bin/docker-compose
#sudo chmod +x /usr/local/bin/docker-compose

# Verify Docker & Docker Compose installation
#docker --version
#docker-compose --version

#aws s3 cp s3://gpbucket522003/docker-compose.yml /home/ec2-user/

#cd /home/ec2-user

# Start Docker Compose
#docker-compose up -d
`;

module.exports = { userDataScript };
