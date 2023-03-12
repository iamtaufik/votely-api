import express, { Router } from 'express';
import { createCandidate, getParticipant } from '../controllers/Participant.controller';

const participantRoute: Router = express.Router();

participantRoute.post('/', createCandidate);
participantRoute.get('/:code', getParticipant);

export default participantRoute;
