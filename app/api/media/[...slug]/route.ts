import { NextRequest, NextResponse } from 'next/server'
import { createReadStream, statSync, existsSync } from 'fs'
import path from 'path'
import mime from 'mime-types'

export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    if (!params.slug || params.slug.length === 0) {
      return new NextResponse('Bad request', { status: 400 })
    }

    // Sanitize each path segment - remove any path traversal attempts
    const sanitizedSlug = params.slug
      .map((segment: string) => {
        // Remove any dots, slashes, or other dangerous characters
        return segment.replace(/[^a-zA-Z0-9_-]/g, '')
      })
      .filter((segment: string) => segment.length > 0)

    if (sanitizedSlug.length === 0) {
      return new NextResponse('Bad request', { status: 400 })
    }

    const relativePath = path.join(...sanitizedSlug)

    // Use path.resolve to get absolute paths
    const mediaDir = path.resolve(process.cwd(), '../media')
    const filePath = path.resolve(mediaDir, relativePath)

    // CRITICAL: Ensure resolved path is within media directory
    if (!filePath.startsWith(mediaDir)) {
      console.warn(`Path traversal attempt detected: ${req.url}`)
      return new NextResponse('Forbidden', { status: 403 })
    }

    // Check if file exists before attempting to read
    if (!existsSync(filePath)) {
      return new NextResponse('File not found', { status: 404 })
    }

    const fileStat = statSync(filePath)

    // Additional check: only serve files, not directories
    if (!fileStat.isFile()) {
      return new NextResponse('Not a file', { status: 400 })
    }

    const stream = createReadStream(filePath)
    const mimeType = mime.lookup(filePath) || 'application/octet-stream'

    return new NextResponse(stream as any, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Length': fileStat.size.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Last-Modified': fileStat.mtime.toUTCString(),
        // Add security headers
        'X-Content-Type-Options': 'nosniff',
        'Content-Disposition': 'inline',
      },
    })
  } catch (err) {
    console.error('Error reading file:', err)
    return new NextResponse('File not found', { status: 404 })
  }
}
