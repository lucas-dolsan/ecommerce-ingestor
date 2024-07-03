provider "aws" {
  region = var.aws_region
}

resource "aws_instance" "app" {
  ami           = var.ami
  instance_type = var.instance_type

  tags = {
    Name = var.app_name
  }
}

terraform {
  backend "local" {
    path = "terraform.tfstate"
  }
}
