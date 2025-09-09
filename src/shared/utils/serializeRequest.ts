import { NextRequest } from 'next/server'

export async function serializeRequest(req: NextRequest, body: any): Promise<Record<string, any>> {
  return {
    method: req.method,
    url: req.nextUrl.href,
    headers: Object.fromEntries(req.headers.entries()),
    ip: req.headers.get('x-forwarded-for') ?? 'unknown',
    body,
  }
}
