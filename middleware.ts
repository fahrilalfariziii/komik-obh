import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (req.nextUrl.pathname.startsWith("/__clerk")) return NextResponse.next();
  if (isPublicRoute(req)) return NextResponse.next();
  const { userId } = await auth();
  if (!userId) {
    const signIn = new URL("/sign-in", req.url);
    signIn.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signIn);
  }
  return NextResponse.next();
}, {
  // Proxy Frontend API Clerk via /__clerk (wajib untuk host *.vercel.app).
  // Intersepsi terjadi sebelum handler di atas, jadi bypass /__clerk tetap aman.
  frontendApiProxy: { enabled: true },
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
