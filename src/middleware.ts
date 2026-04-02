import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  // Public routes — Clerk middleware runs but auth is not required
  publicRoutes: [
    '/sign-in(.*)',
    '/sign-up(.*)',
  ],
  // Ignored routes — Clerk middleware skips entirely (for API routes with own auth)
  ignoredRoutes: [
    '/api/(.*)',
  ],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
