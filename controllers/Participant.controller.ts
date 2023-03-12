import { Request, Response } from 'express';
import { prisma } from '../libs/prisma';

export const getParticipant = async (req: Request, res: Response) => {
  const { code } = req.params;
  const { email } = req.body;
  try {
    const result = await prisma.participant.findFirst({
      where: {
        email: email as string,
        code: code as string,
      },
    });
    return res.status(200).json({ status: 'OK', code: 200, result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const createCandidate = async (req: Request, res: Response) => {
  const { candidate, email, code } = req.body;
  try {
    const result = await prisma.participant.create({
      data: {
        candidate: candidate,
        //    email: session.user.email,
        email: email,
        code: code as string,
      },
    });
    return res.status(201).json({ status: 'OK', code: 200, result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
