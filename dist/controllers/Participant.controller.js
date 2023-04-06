"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCandidate = exports.getParticipant = void 0;
const prisma_1 = require("../libs/prisma");
const getParticipant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const { emails } = req.user;
    try {
        const result = yield prisma_1.prisma.participant.findFirst({
            where: {
                email: emails[0].value,
                code: code,
            },
        });
        return res.status(200).json({ status: 'OK', code: 200, result });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getParticipant = getParticipant;
const createCandidate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { candidate, code } = req.body;
    const { emails } = req.user;
    try {
        const result = yield prisma_1.prisma.participant.create({
            data: {
                candidate: candidate,
                email: emails[0].value,
                code: code,
            },
        });
        return res.status(201).json({ status: 'OK', code: 200, result });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createCandidate = createCandidate;
//# sourceMappingURL=Participant.controller.js.map