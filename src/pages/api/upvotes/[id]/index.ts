import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { upvoteValidationSchema } from 'validationSchema/upvotes';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.upvote
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getUpvoteById();
    case 'PUT':
      return updateUpvoteById();
    case 'DELETE':
      return deleteUpvoteById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getUpvoteById() {
    const data = await prisma.upvote.findFirst(convertQueryToPrismaUtil(req.query, 'upvote'));
    return res.status(200).json(data);
  }

  async function updateUpvoteById() {
    await upvoteValidationSchema.validate(req.body);
    const data = await prisma.upvote.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteUpvoteById() {
    const data = await prisma.upvote.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
