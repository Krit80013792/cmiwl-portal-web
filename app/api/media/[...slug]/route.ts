import { NextRequest, NextResponse } from 'next/server'
import { createReadStream, statSync } from 'fs'
import path from 'path'
import mime from 'mime-types'

export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    if (!params.slug || params.slug.length === 0) {
      return new NextResponse('Bad request', { status: 400 })
    }

    const relativePath = path.join(...params.slug)
    const filePath = path.join(process.cwd(), '../media', relativePath)
    const fileStat = statSync(filePath)
    const stream = createReadStream(filePath)
    const mimeType = mime.lookup(filePath) || 'application/octet-stream'

    return new NextResponse(stream as any, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Length': fileStat.size.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Last-Modified': fileStat.mtime.toUTCString(),
      },
    })
  } catch (err) {
    console.error('Error reading file:', err)
    return new NextResponse('File not found', { status: 404 })
  }
}
