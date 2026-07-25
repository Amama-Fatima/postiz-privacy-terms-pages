import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const staticRoutes = new Set([
  "/privacy.html",
  "/terms.html",
  "/king-of-automation.png",
  "/tiktokugIlThjsJpeBrVcXKBJTpR5LJyrHiGdT.txt",
  "/tiktokFxJSvgiiWSzRZS02rqybuYrsEl9zyDDq.txt",
]);

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === "/privacy" || path === "/privacy/") {
    return NextResponse.rewrite(new URL("/privacy.html", request.url));
  }

  if (path === "/terms" || path === "/terms/") {
    return NextResponse.rewrite(new URL("/terms.html", request.url));
  }

  if (path === "/terms-of-service" || path === "/terms-of-service/") {
    return NextResponse.redirect(new URL("/terms", request.url), 301);
  }

  if (path === "/privacy-policy" || path === "/privacy-policy/") {
    return NextResponse.redirect(new URL("/privacy", request.url), 301);
  }

  if (path === "/healthz" || staticRoutes.has(path)) {
    return NextResponse.next();
  }

  return new NextResponse("Not Found", {
    status: 404,
    headers: {
      "cache-control": "no-store",
      "content-type": "text/plain; charset=utf-8",
    },
  });
}

export const config = {
  matcher: "/:path*",
};
