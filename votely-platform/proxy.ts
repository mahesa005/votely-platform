import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const routeRoles = {
  "/admin": ["ADMIN"],           
  "/elections": ["WARGA", "ADMIN"],          
  "/dashboard": ["WARGA", "ADMIN"],  // Admin juga bisa akses dashboard
  "/user": ["WARGA", "ADMIN"]  // Semua user bisa akses profil
};

const authRoutes = ["/auth/login", "/auth/register"];
const publicRoutes = ["/", "/api/auth"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Siapkan Secret Key
  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || "fallback-secret"
  );


  if (authRoutes.includes(pathname)) {
    if (token) {
      try {
        const { payload } = await jwtVerify(token, secret);
        
        if (payload.role === "ADMIN") {
          return NextResponse.redirect(new URL("/admin", request.url));
        }
        return NextResponse.redirect(new URL("/dashboard", request.url));
        
      } catch (error) {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  const matchedRoute = Object.keys(routeRoles).find((route) => 
    pathname.startsWith(route)
  );

  if (matchedRoute) {
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }

    try {
      const { payload } = await jwtVerify(token, secret);
      const userRole = payload.role as string; // Ambil role dari token
      const allowedRoles = routeRoles[matchedRoute as keyof typeof routeRoles];

      if (!allowedRoles.includes(userRole)) {
        // Redirect to appropriate page based on role instead of unauthorized page
        if (userRole === "ADMIN") {
          return NextResponse.redirect(new URL("/admin", request.url));
        }
        return NextResponse.redirect(new URL("/dashboard", request.url)); 
      }

      return NextResponse.next();

    } catch (error) {
      const response = NextResponse.redirect(new URL("/auth/login", request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};