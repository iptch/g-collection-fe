import { EnvironmentConfig } from './environment-config';

export const environment: EnvironmentConfig = {
  production: true,
  redirectUri: 'http://localhost:4200',
  backendUri: 'https://g-collection.azurewebsites.net',
  msGraphUri: 'https://graph.microsoft.com/v1.0/me',
};
