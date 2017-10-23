interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: '',
  domain: 'huddle.auth0.com',
  callbackURL: 'http://localhost:3000/new-user'
};
