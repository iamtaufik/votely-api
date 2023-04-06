"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
passport_1.default.use(new passport_google_oauth20_1.default.Strategy({
    clientID: String(process.env.GOOGLE_CLIENT_ID),
    clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    callbackURL: String(process.env.CALLBACK_URL),
}, function (accessToken, refreshToken, profile, done) {
    done(null, profile);
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
//# sourceMappingURL=passport.js.map