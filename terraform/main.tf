terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_instance" "app" {
  ami           = var.ami
  instance_type = var.instance_type
  security_groups = [var.security_group_id]
  user_data = <<-EOF
              #!/bin/bash
              sudo yum update -y
              sudo yum install -y git docker
              sudo service docker start
              sudo usermod -a -G docker ec2-user
              curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              sudo chmod +x /usr/local/bin/docker-compose
              cd /home/ec2-user/ecommerce-ingestor
              docker-compose up -d
              EOF

  tags = {
    Name = var.app_name
  }
}

output "instance_public_ip" {
  value = aws_instance.app.public_ip
}

output "instance_id" {
  value = aws_instance.app.id
}
