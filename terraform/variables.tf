variable "aws_region" {
  default     = "us-east-1"
}

variable "ami" {
  default     = "ami-070f589e4b4a3fece"
}

variable "instance_type" {
  default     = "a1.micro"
}

variable "environment" {
  type        = string
}

variable "app_name" {
  default     = "ecommerce-ingestor"
}
