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
exports.deleteVote = exports.updateVotes = exports.getDetailVotes = exports.getVotes = exports.createVotes = void 0;
const generateCode_1 = require("../libs/generateCode");
const prisma_1 = require("../libs/prisma");
const createVotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { candidates, endDateTime, startDateTime, title } = req.body;
    const { emails } = req.user;
    try {
        const result = yield prisma_1.prisma.votes.create({
            data: {
                candidates: candidates,
                endDateTime: endDateTime,
                startDateTime: startDateTime,
                title: title,
                publisher: emails[0].value,
                code: (0, generateCode_1.generateCode)(6),
                deletedAt: null,
            },
        });
        return res.status(201).json({ status: 'CREATED', code: 201, result });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createVotes = createVotes;
const getVotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emails } = req.user;
    try {
        const result = yield prisma_1.prisma.votes.findMany({
            where: {
                publisher: emails[0].value,
                deletedAt: null,
            },
        });
        return res.status(200).json({ status: 'OK', code: 200, result });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getVotes = getVotes;
const getDetailVotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    try {
        const votes = yield prisma_1.prisma.votes.findFirst({
            select: {
                id: true,
                publisher: true,
                title: true,
                code: true,
                startDateTime: true,
                endDateTime: true,
                candidates: true,
                createdAt: true,
                deletedAt: false,
            },
            where: {
                code: code,
                deletedAt: null,
            },
        });
        // console.log(votes);
        if (!votes)
            return res.status(404).json({ status: 'NOT_FOUND', code: 404, result: null });
        // Get Participants of the Vote
        const participants = yield prisma_1.prisma.participant.findMany({
            select: {
                candidate: true,
                email: true,
                participateAt: true,
            },
            where: {
                code: code,
            },
        });
        //Count Vote for each Candidate
        var candidates = [];
        if (participants) {
            candidates = votes === null || votes === void 0 ? void 0 : votes.candidates.map((candidate) => {
                const votes = participants.filter((participant) => participant.candidate === candidate.name).length || 0;
                return Object.assign(Object.assign({}, candidate), { votes });
            });
        }
        const result = {
            id: votes === null || votes === void 0 ? void 0 : votes.id,
            publisher: votes === null || votes === void 0 ? void 0 : votes.publisher,
            title: votes === null || votes === void 0 ? void 0 : votes.title,
            code: votes === null || votes === void 0 ? void 0 : votes.code,
            candidates: candidates,
            startDateTime: String(votes === null || votes === void 0 ? void 0 : votes.startDateTime),
            endDateTime: String(votes === null || votes === void 0 ? void 0 : votes.endDateTime),
            createdAt: String(votes === null || votes === void 0 ? void 0 : votes.createdAt),
            totalVotes: candidates ? candidates === null || candidates === void 0 ? void 0 : candidates.reduce((acc, candidate) => acc + (candidate.votes ? candidate.votes : 0), 0) : 0,
        };
        return res.status(200).json({ status: 'OK', code: 200, result });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getDetailVotes = getDetailVotes;
const updateVotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    try {
        const result = yield prisma_1.prisma.votes.update({
            where: {
                code: code,
            },
            data: {
                candidates: req.body.candidates,
                endDateTime: req.body.endDate,
                startDateTime: req.body.startDate,
                title: req.body.title,
            },
        });
        if (!result)
            throw Error('Code not found!');
        return res.status(200).json({ status: 'OK', code: 200, result });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateVotes = updateVotes;
const deleteVote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    try {
        const result = yield prisma_1.prisma.votes.update({
            where: {
                code: code,
            },
            data: {
                deletedAt: new Date().toString(),
            },
        });
        return res.status(200).json({ status: 'OK', code: 200, result });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteVote = deleteVote;
//# sourceMappingURL=Votes.controller.js.map