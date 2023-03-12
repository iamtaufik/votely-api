import express, { Router } from 'express';
import { createVotes, deleteVote, getDetailVotes, getVotes, updateVotes } from '../controllers/Votes.controller';

const votesRoute: Router = express.Router();

votesRoute.get('/', getVotes);
votesRoute.post('/', createVotes);
votesRoute.get('/:code', getDetailVotes);
votesRoute.put('/:code', updateVotes);
votesRoute.delete('/:code', deleteVote);

export default votesRoute;
