import { NextApiRequest, NextApiResponse } from 'next';

/**
 * pages/api/health.ts
 * Health check endpoint for monitoring
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
}
