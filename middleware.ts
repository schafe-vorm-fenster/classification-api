import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/api/", "/api/classify/bytag/:path*", "/api/classify/bytext"],
};

export function middleware(req: NextRequest) {
  const token = req.headers.get("Sheep-Token");
  const url = req.nextUrl;
  const allowedTokens: String[] | undefined = process.env.ALLOWED_TOKENS?.split(
    ","
  ).map((t) => t.trim());

  if (token && allowedTokens?.includes(token)) {
    return NextResponse.next();
  }

  return new NextResponse(
    JSON.stringify({
      status: 401,
      message: "Unauthorized",
    })
  );
}
