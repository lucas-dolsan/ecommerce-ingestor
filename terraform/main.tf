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
