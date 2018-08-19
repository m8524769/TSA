import * as passport from "koa-passport";
import * as LocalStrategy from "passport-local";
// import * as GoogleStrategy from "passport-google-oauth";
import { getManager } from "typeorm";
import { User } from "./entity/User";

const userRepository = getManager().getRepository(User);

passport.serializeUser((user: User, done: Function) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: number, done: Function) => {
    await userRepository.findOneOrFail(id).then(user => {
        done(null, user);
    }).catch(error => done(error));
});

passport.use(new LocalStrategy({ usernameField: 'email' },
    async (email: string, password: string, done: Function) => {
        await userRepository.findOneOrFail({
            where: {
                email: email
            }
        }).then(user => {
            if (user.password === password) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        }).catch(() => {
            return done(null, false, { message: 'User does not exist.' });
        });
    }
));

// passport.use(new GoogleStrategy(
//     {
//         clientId: 'your-client-id',
//         clientSecret: 'your-secret',
//         callbackURL: 'http://localhost/api/auth/google/callback'
//     },
//     async (token, tokenSecret, profile, done) => {
//         // retrieve user ...
//         console.log(token, tokenSecret, profile);
//         // fetchUser().then(user => done(null, user))
//     }
// ))