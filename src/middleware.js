import { auth } from "@/lib/auth";
import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  ROLE_REDIRECTS
} from "@/routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const { role } = req.auth?.user || {};

  // Define route type checks
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname); // Keep this line if you manually add public pages
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isRootRoute = nextUrl.pathname === "/";  // Check if the route is the root route

  // Define role-based route checks
  const isAdminRoute = nextUrl.pathname.startsWith('/admin');
  const isDriverRoute = nextUrl.pathname.startsWith('/driver');
  const isUserRoute = nextUrl.pathname.startsWith('/user');

  // Handle API routes (no redirect needed)
  if (isApiAuthRoute) {
    return null;
  }

  // Handle auth routes (login, register, etc.)
  if (isAuthRoute) {
    if (isLoggedIn) {
      // Redirect to role-specific dashboard if already logged in
      return Response.redirect(new URL(ROLE_REDIRECTS[role], nextUrl));
    }
    return null;
  }

  // If not logged in and trying to access protected route
  if (!isLoggedIn && !isPublicRoute) {
    const callbackUrl = nextUrl.pathname;
    return Response.redirect(new URL(`/auth/login?callbackUrl=${callbackUrl}`, nextUrl));
  }

  // If user visits the root route, redirect them based on their role
  if (isRootRoute && isLoggedIn) {
    return Response.redirect(new URL(ROLE_REDIRECTS[role], nextUrl));
  }

  // Role-based access control
  if (isLoggedIn) {
    // Admin routes protection
    if (isAdminRoute && role !== 'ADMIN') {
      return Response.redirect(new URL(ROLE_REDIRECTS[role], nextUrl));
    }

    // Driver routes protection (drivers can access user routes as well)
    if (isDriverRoute && role !== 'DRIVER' && role !== 'ADMIN') {
      return Response.redirect(new URL(ROLE_REDIRECTS[role], nextUrl));
    }

    // User routes protection (users cannot access driver routes)
    if (isUserRoute && role !== 'USER' && role !== 'DRIVER') {
      return Response.redirect(new URL(ROLE_REDIRECTS[role], nextUrl));
    }
  }

  return null;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
