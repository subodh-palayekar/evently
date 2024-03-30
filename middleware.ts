import { authMiddleware } from "@clerk/nextjs";
 
 
export default authMiddleware({
  // Allow signed out users to access the specified routes:
  publicRoutes: [
    '/',
    '/events/:id',
    '/api/webhook/cleark',
    '/api/webhook/stripe',
    '/api/uploadthing'
],
  // Prevent the specified routes from accessing
  // authentication information:
  ignoredRoutes: [
    '/api/webhook/cleark',
    '/api/webhook/stripe',
    '/api/uploadthing'
],
});
 
export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
 
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)"
  ]
};