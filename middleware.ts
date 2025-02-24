// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const publicRoutes = ["/auth/login", "/auth/signup", "/", "/auth/callback"];

export async function middleware(request: NextRequest) {
  // Check if the path is public
  const path = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  console.log(`Path: ${path}, isPublicRoute: ${isPublicRoute}`);

  const response = NextResponse.next();

  // Create supabase client using the recommended cookie methods
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => {
          return request.cookies.getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },
        setAll: (cookies) => {
          cookies.forEach(({ name, value, ...options }) => {
            response.cookies.set({
              name,
              value,
              ...options,
            });
          });
        },
      },
    }
  );

  // Check user
  const { data } = await supabase.auth.getUser();

  // If no user, redirect to login
  if (!data.user?.id && !isPublicRoute) {
    console.log("Redirecting to login");
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }

  return response;
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
