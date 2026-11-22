import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { hasClerkCredentials } from "@/features/auth/models/clerk-config";

const handleClerkRequest = clerkMiddleware();

export function proxy(request: NextRequest, event: NextFetchEvent) {
  if (hasClerkCredentials()) {
    return handleClerkRequest(request, event);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*", "/__clerk/:path*"],
};
