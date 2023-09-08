import { EnvironmentConfig } from './environment-config';

export const environment: EnvironmentConfig = {
  production: true,
  redirectUri: 'http://localhost:4200',
  backendUri: 'http://localhost:8000',
  msGraphUri: 'https://graph.microsoft.com/v1.0/me',
};
