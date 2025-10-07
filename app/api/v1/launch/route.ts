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
    const apiURI = process.env.APP_ENV === 'local' ? `${process.env.TIDLOR_TECH_URI}` : ''
    const res = await fetch(`${apiURI}/api/auth/v1/authorize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ck: ck,
        token: token,
      }),
    })

    if (!res.ok) {
      return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 })
    }

    const data = await res.json()

    const insurersRes = await fetch(`${apiURI}/api/master-data/v1/insurer`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${data?.data?.jwt}`,
      },
    })

    const insurers = await insurersRes.json()

    session.usrData = data
    session.insurers = insurers?.data

    await session.save()

    return new NextResponse(JSON.stringify({ message: `Success`, data: { insurers } }), { status: 200 })
  } catch (e) {
    console.error('Error in POST /api/v1/launch:', e)
    return new NextResponse(JSON.stringify({ message: `Internal Server Error` }), { status: 500 })
  }
}
