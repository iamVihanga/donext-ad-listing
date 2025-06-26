import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

type Session = typeof auth.$Infer.Session;

const authRoutes = [
  "/signin",
  "/signup",
  "/reset-password",
  "/forgot-password",
  "/email-verified",
];

// Add profile to protected routes
const protectedRoutes = ["/dashboard", "/profile"];

export default async function authMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if route needs auth handling
  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) ||
    authRoutes.includes(pathname)
  ) {
    // Fetch session
    const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: request.nextUrl.origin,
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      }
    );

    // If Auth route and Already authenticated,
    // Redirect back to dashboard
    if (authRoutes.includes(pathname) && session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // If Protected route and Not authenticated,
    // Redirect to signin with callback URL
    if (
      protectedRoutes.some((route) => pathname.startsWith(route)) &&
      !session
    ) {
      return NextResponse.redirect(
        new URL(
          `/signin?callbackUrl=${encodeURIComponent(pathname)}`,
          request.url
        )
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
