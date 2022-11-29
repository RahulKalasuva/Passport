var OIDCStrategy = require('passport-azure-ad').OIDCStrategy
const User = require('../models/user-model')
const passport = require('passport')


passport.serializeUser((accessToken, done) => {
    done(null, accessToken);
});

passport.deserializeUser((accessToken, done) => {
    done(null, accessToken);
});
passport.use(
    new OIDCStrategy({
        // options for the azure AD strategy
        identityMetadata: "https://login.microsoftonline.com/common/.well-known/openid-configuration",
        clientID: "1af1b3bb-8ea9-44dd-a5a5-27bdbc7d9880",
        clientSecret: '3.u8Q~Rbjz6qplwl1qawfrjoNtwuwPQ0qyExGabo',
        redirectUrl: 'http://localhost:3001/auth/google/return',
        responseType: 'code id_token',
        responseMode: 'form_post',
        allowHttpForRedirectUrl: true,
        isB2C: false,
        passReqToCallback: false,
        validateIssuer: false,
        scope: ['email'],
        loggingLevel: 'error',
        resourceURL: 'https://graph.windows.net'
    }, (iss, sub, profile, jwtClaims, accessToken, refreshToken, params, done) => {

        console.log('1. VERIFY CALLBACK');
        if (!accessToken) {
            return done(new Error('No accessToken was given'), null);
        }
        else {
            req.session.access_token = token.token.access_token;
            req.session.refresh_token = token.token.refresh_token;
            return done(null, { accessToken, expires: params.expires_on, refreshToken });
        }
    }));
