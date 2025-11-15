import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Serve static HTML files for privacy and terms
  if (path === "/privacy") {
    return NextResponse.rewrite(new URL("/privacy.html", request.url));
  }

  if (path === "/terms") {
    return NextResponse.rewrite(new URL("/terms.html", request.url));
  }

  // For static HTML files themselves, let Next.js serve them
  if (path.endsWith(".html")) {
    return NextResponse.next();
  }

  // Proxy EVERYTHING else to Railway (including _next/static)
  const railwayUrl =
    "https://gitroomhqpostiz-applatest-production-6b33.up.railway.app";
  const targetUrl = `${railwayUrl}${path}${request.nextUrl.search}`;

  try {
    const cleanHeaders = new Headers();

    request.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (
        lowerKey !== "host" &&
        lowerKey !== "connection" &&
        lowerKey !== "content-length"
      ) {
        cleanHeaders.set(key, value);
      }
    });

    cleanHeaders.set("host", new URL(railwayUrl).host);

    const response = await fetch(targetUrl, {
      method: request.method,
      headers: cleanHeaders,
      body:
        request.method !== "GET" && request.method !== "HEAD"
          ? await request.text()
          : undefined,
    });

    const responseHeaders = new Headers(response.headers);
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("transfer-encoding");

    const body = await response.arrayBuffer();

    return new NextResponse(body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new NextResponse("Service temporarily unavailable", { status: 503 });
  }
}

export const config = {
  matcher: [
    /*
     * Match all paths except favicon
     */
    "/((?!favicon.ico).*)",
  ],
};
