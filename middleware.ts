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

  // For static HTML files and images, let Next.js serve them
  if (path.endsWith(".html") || path.endsWith("king-of-automation.png")) {
    return NextResponse.next();
  }

  // Proxy EVERYTHING else to Railway (including _next/static)
  const railwayUrl =
    "https://gitroomhqpostiz-applatest-production-6b33.up.railway.app";
  const targetUrl = `${railwayUrl}${path}${request.nextUrl.search}`;

  try {
    const cleanHeaders = new Headers();

    // Copy all headers including cookies
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

    // Ensure we're forwarding the origin for CORS
    cleanHeaders.set("origin", railwayUrl);

    const response = await fetch(targetUrl, {
      method: request.method,
      headers: cleanHeaders,
      redirect: "manual", // Don't follow redirects automatically
      body:
        request.method !== "GET" && request.method !== "HEAD"
          ? await request.text()
          : undefined,
    });

    // Handle redirects from Railway - rewrite to use our domain
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (location) {
        // If it's a redirect to the Railway URL, change it to our domain
        let newLocation = location;
        if (location.startsWith(railwayUrl)) {
          newLocation = location.replace(
            railwayUrl,
            `https://${request.headers.get("host")}`
          );
        } else if (location.startsWith("/")) {
          // Relative redirect - make it use our domain
          newLocation = `https://${request.headers.get("host")}${location}`;
        }

        // Create response with updated location
        const redirectResponse = new NextResponse(null, {
          status: response.status,
          statusText: response.statusText,
        });

        redirectResponse.headers.set("location", newLocation);

        // Copy Set-Cookie headers to maintain session
        response.headers.forEach((value, key) => {
          if (key.toLowerCase() === "set-cookie") {
            redirectResponse.headers.append("set-cookie", value);
          }
        });

        return redirectResponse;
      }
    }

    const responseHeaders = new Headers(response.headers);
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("transfer-encoding");

    // Important: Don't delete Set-Cookie headers - we need them for auth!
    // Railway sets these and we need to pass them to the browser

    const body = await response.arrayBuffer();

    // Check if response is HTML and rewrite URLs
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      try {
        // Decode the response body as text
        let html = new TextDecoder("utf-8").decode(body);

        // Replace ALL postiz.com URLs with your custom domain
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

        // Replace Railway URL with custom domain in HTML (for API calls, etc.)
        html = html.replace(
          new RegExp(railwayUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
          `https://${request.headers.get("host")}`
        );

        // Update content-length header since we modified the content
        responseHeaders.delete("content-length"); // Let browser calculate it

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
