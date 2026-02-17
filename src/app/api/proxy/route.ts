import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { method, url, headers, body } = await req.json();

    if (!method || !url) {
      return NextResponse.json({ error: "method and url required" }, { status: 400 });
    }

    const m = String(method).toUpperCase();

    // Validate URL
    const u = new URL(url);
    if (!["http:", "https:"].includes(u.protocol)) {
      return NextResponse.json({ error: "only http/https allowed" }, { status: 400 });
    }

    const h = new Headers(headers || {});
    let reqBody: string | undefined = undefined;

    if (!["GET", "HEAD"].includes(m) && body !== undefined) {
      reqBody = typeof body === "string" ? body : JSON.stringify(body);
      if (!h.get("content-type")) h.set("content-type", "application/json");
    }

    const t0 = Date.now();
    const res = await fetch(url, {
      method: m,
      headers: Object.fromEntries(h.entries()),
      body: reqBody,
    });
    const timeMs = Date.now() - t0;

    const contentType = res.headers.get("content-type") || "";
    const respHeaders = Object.fromEntries(res.headers.entries());

    let respBody: any;
    if (contentType.includes("application/json")) {
      respBody = await res.json().catch(() => null);
    } else {
      respBody = await res.text().catch(() => "");
    }

    return NextResponse.json({
      status: res.status,
      timeMs,
      headers: respHeaders,
      body: respBody,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "proxy failed" }, { status: 500 });
  }
}
