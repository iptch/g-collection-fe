export interface EnvironmentConfig {
  production: boolean;
  scannerBypass: boolean; // For environments where QR-Code scanner does not work
  redirectUri: string;
  backendUri: string;
}
