import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes:[
    "/", // Homepage is public
    "/events/:id", // Dynamic event page is public
    "/api/webhook/clerk", // Webhook should be accessible without authentication
  ],
  ignoredRoutes:[
    "/", 
    "/events/:id", 
    "/api/webhook/clerk",
  ]
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
