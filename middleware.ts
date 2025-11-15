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

  // Redirect old Postiz URLs to our pages (for when JS changes the URL)
  if (path === "/terms-of-service") {
    return NextResponse.redirect(new URL("/terms", request.url), 301);
  }

  if (path === "/privacy-policy") {
    return NextResponse.redirect(new URL("/privacy", request.url), 301);
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

    // Check if response is HTML and rewrite URLs
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      try {
        // Decode the response body as text
        let html = new TextDecoder("utf-8").decode(body);

        // Replace ALL postiz.com URLs with your custom domain
        // This catches both /terms and /terms-of-service variants
        html = html.replace(
          /https:\/\/postiz\.com\/terms-of-service/gi,
          "https://postiz.kingofautomation.com/terms"
        );
        html = html.replace(
          /https:\/\/postiz\.com\/privacy-policy/gi,
          "https://postiz.kingofautomation.com/privacy"
        );
        html = html.replace(
          /https:\/\/postiz\.com\/terms/gi,
          "https://postiz.kingofautomation.com/terms"
        );
        html = html.replace(
          /https:\/\/postiz\.com\/privacy/gi,
          "https://postiz.kingofautomation.com/privacy"
        );

        // Also catch any href="postiz.com/..." without https
        html = html.replace(
          /href="postiz\.com\/terms"/gi,
          'href="https://postiz.kingofautomation.com/terms"'
        );
        html = html.replace(
          /href="postiz\.com\/privacy"/gi,
          'href="https://postiz.kingofautomation.com/privacy"'
        );

        // Update content-length header since we modified the content
        responseHeaders.set("content-length", new Blob([html]).size.toString());

        return new NextResponse(html, {
          status: response.status,
          statusText: response.statusText,
          headers: responseHeaders,
        });
      } catch (decodeError) {
        // If decoding fails, return original response
        console.error("Failed to decode HTML for URL rewriting:", decodeError);
        return new NextResponse(body, {
          status: response.status,
          statusText: response.statusText,
          headers: responseHeaders,
        });
      }
    }

    // For non-HTML responses, return as-is
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
