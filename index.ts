import express, { Application } from 'express';
import participantRoute from './routes/Participant.route';
import votesRoute from './routes/Votes.route';

const app: Application = express();

app.use(express.json());

app.use('/api/votes', votesRoute);
app.use('/api/participant', participantRoute);

app.listen(3000, () => {
  console.log('Server up and running');
});
