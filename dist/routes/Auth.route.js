"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const authRoute = express_1.default.Router();
authRoute.get('/login/failed', (req, res) => {
    res.status(401).json({ status: 'UNAUTHORIZED', code: 401 });
});
authRoute.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({ status: 'AUTHORIZED', code: 200, user: req.user });
    }
    else {
        res.redirect('/api/auth/login/failed');
    }
});
authRoute.get('/logout', (req, res, done) => {
    try {
        // @ts-ignore
        req.logout();
        res.redirect(String(process.env.CLIENT_URL));
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
authRoute.get('/google', passport_1.default.authenticate('google', { scope: ['email', 'profile'] }));
authRoute.get('/google/callback', passport_1.default.authenticate('google', {
    successRedirect: String(process.env.CLIENT_URL),
    failureRedirect: '/api/auth/login/failed',
}));
exports.default = authRoute;
//# sourceMappingURL=Auth.route.js.map