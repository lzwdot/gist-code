import { registerAs } from '@nestjs/config';

export default registerAs('github', () => ({
  authorizationURL: 'https://github.com/login/oauth/authorize',
  clientID: process.env.GITHUB_CLIENT_ID || '',
  clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
  callbackURL: 'http://localhost:3000/signup',
}));
