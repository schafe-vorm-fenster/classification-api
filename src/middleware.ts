import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  // match all /api/:path* except of /api/health
  matcher: ["/api/((?!health).*)"],
};

export function middleware(req: NextRequest) {
  const token = req.headers.get("Sheep-Token");
  const allowedTokens: string[] | undefined = process.env.ALLOWED_TOKENS?.split(
    ","
  ).map((t) => t.trim());

  if (token && allowedTokens?.includes(token)) {
    return NextResponse.next();
  }

  return new NextResponse(
    JSON.stringify({
      status: 401,
      message: "Unauthorized",
    }),
    { status: 401, headers: { "content-type": "application/json" } }
  );
}
