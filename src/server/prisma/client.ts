import { PrismaClient } from '@prisma/client';
// import { withAccelerate } from '@prisma/extension-accelerate';

import { env } from '@/lib/env';

export const prisma = new PrismaClient();

const globalForPrisma = global as unknown as { prisma: typeof prisma };

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;