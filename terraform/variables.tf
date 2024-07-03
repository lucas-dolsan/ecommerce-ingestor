
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
  default     = "dev"
}

variable "app_name" {
  default     = "ecommerce-ingestor"
}

variable "vpc_id" {
  default     = "vpc-017dfafe202a84620"
}

variable "security_group_id" {
  default     = "sg-0c503285f91faa830"
}
