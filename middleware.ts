import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Don't proxy privacy and terms pages - let Next.js handle them
  if (path === "/privacy") {
    return NextResponse.rewrite(new URL("/privacy.html", request.url));
  }

  if (path === "/terms") {
    return NextResponse.rewrite(new URL("/terms.html", request.url));
  }

  // Proxy everything else to Railway
  const railwayUrl =
    "https://gitroomhqpostiz-applatest-production-6b33.up.railway.app";
  const targetUrl = `${railwayUrl}${path}${request.nextUrl.search}`;

  try {
    // Create clean headers
    const cleanHeaders = new Headers();

    // Copy important headers except cookies and connection-specific headers
    request.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      // Skip connection-specific headers initially
      if (
        lowerKey !== "host" &&
        lowerKey !== "connection" &&
        lowerKey !== "content-length"
      ) {
        cleanHeaders.set(key, value);
      }
    });

    // Set the correct host for Railway
    cleanHeaders.set("host", new URL(railwayUrl).host);

    // Forward cookies directly - let Railway handle what it needs
    // The browser will send cookies set by previous responses from Railway

    const response = await fetch(targetUrl, {
      method: request.method,
      headers: cleanHeaders,
      body:
        request.method !== "GET" && request.method !== "HEAD"
          ? await request.text()
          : undefined,
    });

    // Copy response headers
    const responseHeaders = new Headers(response.headers);

    // Remove headers that might cause issues
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
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.html).*)"],
};
