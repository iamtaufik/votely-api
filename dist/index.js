"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Participant_route_1 = __importDefault(require("./routes/Participant.route"));
const Votes_route_1 = __importDefault(require("./routes/Votes.route"));
const passport_1 = __importDefault(require("passport"));
const cookie_session_1 = __importDefault(require("cookie-session"));
require("./passport");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const Auth_route_1 = __importDefault(require("./routes/Auth.route"));
const Auth_middleware_1 = __importDefault(require("./middlewares/Auth.middleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: [String(process.env.SESSION_KEY)],
    maxAge: 24 * 60 * 60 * 100,
}));
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/api/auth', Auth_route_1.default);
app.use('/api/votes', Auth_middleware_1.default, Votes_route_1.default);
app.use('/api/participant', Auth_middleware_1.default, Participant_route_1.default);
app.listen(3000, () => {
    console.log('Server up and running');
});
//# sourceMappingURL=index.js.map