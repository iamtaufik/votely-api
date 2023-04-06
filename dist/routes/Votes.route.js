"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Votes_controller_1 = require("../controllers/Votes.controller");
const votesRoute = express_1.default.Router();
votesRoute.get('/', Votes_controller_1.getVotes);
votesRoute.post('/', Votes_controller_1.createVotes);
votesRoute.get('/:code', Votes_controller_1.getDetailVotes);
votesRoute.put('/:code', Votes_controller_1.updateVotes);
votesRoute.delete('/:code', Votes_controller_1.deleteVote);
exports.default = votesRoute;
//# sourceMappingURL=Votes.route.js.map