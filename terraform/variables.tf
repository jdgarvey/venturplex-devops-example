variable "AWS_ACCESS_KEY" {}
variable "AWS_SECRET_KEY" {}

variable "region" {
  default = "us-east-1"
}

variable "root_domain_name" {
  default = "engenioussolutions.io"
}

variable "domain_name" {
  default = "shutterfly-devops.engenioussolutions.io"
}

variable "write_aws_auth_config" {
  description = "Whether or not to output an auth K8s config-map file."
  default = false
}

variable "write_kubeconfig" {
  description = "Whether or not to output a K8s config file."
  default = false
}
