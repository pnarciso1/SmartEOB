import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  // Public routes — no Clerk session required
  // API routes use their own auth (API keys or are read-only public)
  publicRoutes: [
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/(.*)',
  ],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
