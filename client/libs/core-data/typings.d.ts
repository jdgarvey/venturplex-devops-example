declare var process: Process;

interface Process {
  env: Env
}

interface Env {
  ENDPOINT: string
}

interface GlobalEnvironment {
  process: process
}
