import { Candidate } from '@prisma/client';
import { Request, Response } from 'express';
import { generateCode } from '../libs/generateCode';
import { prisma } from '../libs/prisma';
import { User } from '../types/user';
import { Votes } from '../types/votes';

export const createVotes = async (req: Request, res: Response) => {
  const { candidates, endDateTime, startDateTime, title, publisher } = req.body;
  try {
    const result = await prisma.votes.create({
      data: {
        candidates: candidates,
        endDateTime: endDateTime,
        startDateTime: startDateTime,
        title: title,
        publisher: publisher,
        code: generateCode(6),
        deletedAt: null,
      },
    });

    return res.status(201).json({ status: 'CREATED', code: 201, result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getVotes = async (req: Request, res: Response) => {
  // console.log(req.user);
  // const { publisher } = req.body;
  const { emails } = req.user as User;
  try {
    const result = await prisma.votes.findMany({
      where: {
        publisher: emails[0].value,
        deletedAt: null,
      },
    });

    return res.status(200).json({ status: 'OK', code: 200, result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getDetailVotes = async (req: Request, res: Response) => {
  const { code } = req.params;
  try {
    const votes = await prisma.votes.findFirst({
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
        code: code as string,
        deletedAt: null,
      },
    });

    // Get Participants of the Vote
    const participants = await prisma.participant.findMany({
      select: {
        candidate: true,
        email: true,
        participateAt: true,
      },
      where: {
        code: code as string,
      },
    });

    //Count Vote for each Candidate
    var candidates: Candidate[] = [];
    if (participants) {
      candidates = votes?.candidates.map((candidate) => {
        const votes = participants.filter((participant) => participant.candidate === candidate.name).length || 0;
        return {
          ...candidate,
          votes,
        };
      }) as Candidate[];
    }

    const result = {
      id: votes?.id,
      publisher: votes?.publisher,
      title: votes?.title,
      code: votes?.code,
      candidates: candidates,
      startDateTime: String(votes?.startDateTime),
      endDateTime: String(votes?.endDateTime),
      createdAt: String(votes?.createdAt),
      totalVotes: candidates ? candidates?.reduce((acc, candidate: any) => acc + (candidate.votes ? candidate.votes : 0), 0) : 0,
    } as Votes;

    return res.status(200).json({ status: 'OK', code: 200, result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateVotes = async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    const result = await prisma.votes.update({
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

    if (!result) throw Error('Code not found!');

    return res.status(200).json({ status: 'OK', code: 200, result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteVote = async (req: Request, res: Response) => {
  const { code } = req.params;
  try {
    const result = await prisma.votes.update({
      where: {
        code: code as string,
      },
      data: {
        deletedAt: new Date().toString(),
      },
    });
    return res.status(200).json({ status: 'OK', code: 200, result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
