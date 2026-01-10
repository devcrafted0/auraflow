import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, context) => {
  const { isAuthenticated, redirectToSignIn, userId, orgId } = await auth();

  // if it is not a public route and user is not logged in , means unauthorized user is trying to access the protected route
  if (!isPublicRoute(context) && !isAuthenticated) {
    return redirectToSignIn();
  }

  // if it is a public route and the user is logged in, the authorized user wants to visit some public route which is not quite good!
  if (isPublicRoute(context) && isAuthenticated) {
    let path = "/select-org";

    // if theree is a org , redirect to org and not the select-org
    if (orgId) {
      path = `/organization/${orgId}`;
    }

    const orgSelection = new URL(path, context.nextUrl);

    return NextResponse.redirect(orgSelection);
  }

  if (isAuthenticated && !orgId && context.nextUrl.pathname !== "/select-org") {
    const orgSelection = new URL("select-org", context.nextUrl);
    return NextResponse.redirect(orgSelection);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
