import { Request, Response } from 'express';
import { prisma } from '../libs/prisma';
import { User } from '../types/user';

export const getParticipant = async (req: Request, res: Response) => {
  const { code } = req.params;
  const { emails } = req.user as User;
  try {
    const result = await prisma.participant.findFirst({
      where: {
        email: emails[0].value,
        code: code as string,
      },
    });
    return res.status(200).json({ status: 'OK', code: 200, result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const createCandidate = async (req: Request, res: Response) => {
  const { candidate, code } = req.body;
  const { emails } = req.user as User;
  try {
    const result = await prisma.participant.create({
      data: {
        candidate: candidate,
        email: emails[0].value,
        code: code as string,
      },
    });
    return res.status(201).json({ status: 'OK', code: 200, result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
