variable "aws_region" {
  default     = "us-east-1"
}

variable "ami" {
  default     = "ami-0ac80df6eff0e70b5"
}

variable "instance_type" {
  default     = "t2.micro"
}

variable "environment" {
  type        = string
}

variable "app_name" {
  default     = "ecommerce-ingestor"
}
