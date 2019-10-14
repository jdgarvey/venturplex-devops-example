terraform {
  backend "remote" {
    organization = "venturplex"

    workspaces {
      name = "venturplex-devops-example"
    }
  }
}
