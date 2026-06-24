import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../../keystatic.config';
import { cookies } from 'next/headers';

const handler = makeRouteHandler({ config });

const checkAuth = async () => {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('vault-auth');
  return authCookie?.value === 'true';
};

export const GET = async (req: Request, ctx: any) => {
  if (!(await checkAuth())) return new Response('Unauthorized', { status: 401 });
  return (handler.GET as any)(req, ctx);
};

export const POST = async (req: Request, ctx: any) => {
  if (!(await checkAuth())) return new Response('Unauthorized', { status: 401 });
  return (handler.POST as any)(req, ctx);
};
