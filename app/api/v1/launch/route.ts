//* app/api/v1/launch/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { sessionOptions } from '@/src/shared/utils/session'

export async function POST(oReq: NextRequest) {
  try {
    const session: any = await getIronSession(await cookies(), sessionOptions)
    session.destroy()

    const { ck, token } = await oReq.json()

    if (!ck || !token) {
      return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 })
    }

    const res = await fetch(`${process.env.TIDLOR_TECH_URI}/api/auth/v1/authorize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ck: ck,
        token: token,
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 })
    }

    session.usrData = data
    await session.save()

    return new NextResponse(JSON.stringify({ message: `Success` }), { status: 200 })
  } catch (e) {
    console.error('Error in POST /api/v1/launch:', e)
    return new NextResponse(JSON.stringify({ message: `Internal Server Error` }), { status: 500 })
  }
}
