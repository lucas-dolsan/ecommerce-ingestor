variable "aws_region" {
  default     = "us-west-2"
}

variable "ami" {
  default     = "ami-0c55b159cbfafe1f0"
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
