"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Participant_controller_1 = require("../controllers/Participant.controller");
const participantRoute = express_1.default.Router();
participantRoute.post('/', Participant_controller_1.createCandidate);
participantRoute.get('/:code', Participant_controller_1.getParticipant);
exports.default = participantRoute;
//# sourceMappingURL=Participant.route.js.map