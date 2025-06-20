const userDataScript = `#!/bin/bash

#docker start test-backend-1
sudo yum update -y
sudo yum install -y curl jq

# Install Docker
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user  # Change to 'ubuntu' if using Ubuntu

# Install Docker Compose Manually
sudo curl -L "https://github.com/docker/compose/releases/download/\$(curl -s https://api.github.com/repos/docker/compose/releases/latest | jq -r .tag_name)/docker-compose-\$(uname -s)-\$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify Docker & Docker Compose installation
#docker --version
#docker-compose --version

#aws s3 cp s3://gpbucket522003/docker-compose.yml /home/ec2-user/

#cd /home/ec2-user

# Start Docker Compose
#docker-compose up -d
cat <<EOF > docker-compose.yml
services:
  frontend:
    image: ahmedkhamis10/template_frontend:1.3
    ports:
      - "80:80"
    depends_on:
      - backend
      - db
      - ai

  backend:
    image: ahmedkhamis10/template_backend
    ports:
      - "3000:3000"
    environment:
      - AI_API_URL=http://ai:8000
      - GOOGLE_CALLBACK_URL=http://backend:3000/auth/google/callback
      - DB_HOST=db
    depends_on:
      - db
      - ai
    container_name: backend

  ai:
    image: ahmedkhamis10/template_ai
    ports:
      - "8000:8000"

  db:
    image: postgres:13
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 123456789
      POSTGRES_DB: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
EOF

docker compose up -d
`;

module.exports = { userDataScript };
