import passport from "passport";
import GoogleStrategy from "passport-google-oauth";
import GithubStrategy from "passport-github2";
import { Strategy as JwtStrategy, StrategyOptions } from "passport-jwt";
import db from "../db/models";
import { IUserData } from "../types";

passport.use(
  "google",
  new GoogleStrategy.OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:7777/api/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const { displayName, emails, photos, provider } = profile;
      const foundUser = await db.users.findOne({
        where: {
          email: emails?.[0].value,
        },
      });

      if (foundUser) {
        return done(null, foundUser.toJSON());
      } else {
        const data: IUserData = {
          email: emails?.[0].value,
          fullname: displayName,
          avatarUrl: photos?.[0].value,
          isActive: 0,
          username: displayName,
          phone: "",
          provider,
        };

        const createdUser = await db.users.create(data);

        if (!createdUser) {
          return done(null, false);
        }

        if (createdUser) {
          return done(null, createdUser.toJSON());
        }
      }
    }
  )
);

passport.use(
  "github",
  new GithubStrategy.Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:7777/api/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      const { displayName, photos, username, provider } = profile;
      const foundUser = await db.users.findOne({
        where: {
          username,
        },
      });

      if (foundUser) {
        return done(null, foundUser.toJSON());
      } else {
        const data: IUserData = {
          fullname: displayName,
          avatarUrl: photos?.[0].value,
          isActive: 0,
          username,
          phone: "",
          provider,
        };

        const createdUser = await db.users.create(data);

        if (!createdUser) {
          return done(null, false);
        }

        if (createdUser) {
          return done(null, createdUser.toJSON());
        }
      }
    }
  )
);

const opts: StrategyOptions = {
  jwtFromRequest: (req) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies.jwt;
    }
    return token;
  },
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  "jwt",
  new JwtStrategy(opts, (jwtPayload, done) => {
    if (!jwtPayload) {
      return done("No token found...");
    }
    return done(null, jwtPayload);
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

export { passport };
