interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'zQyJwfP98tvH7mRQtBMyf4Doix_YWGo7',
  domain: 'huddle.auth0.com',
  callbackURL: 'http://localhost:3000/user'
};
