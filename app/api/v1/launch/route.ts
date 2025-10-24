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

    if (!res.ok) {
      return new NextResponse(JSON.stringify({ message: `Unauthorized` }), { status: 401 })
    }

    const data = await res.json()
    const insurersRes = await fetch(`${process.env.TIDLOR_TECH_URI}/api/master-data/v1/insurer`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${data?.data?.jwt}`,
      },
    })
    const insurers = await insurersRes.json()
    session.usrData = { data: { jwt: data?.data?.jwt, prefill: data?.data?.prefill, orderNo: data?.data?.orderNo } }
    session.insurers = insurers?.data

    await session.save()

    return new NextResponse(
      JSON.stringify({
        message: `Success`,
        data: { insurers, prefill: data?.data?.prefill, orderNo: data?.data?.orderNo },
      }),
      {
        status: 200,
      },
    )
  } catch (e) {
    console.error('Error in POST /api/v1/launch:', e)
    return new NextResponse(JSON.stringify({ message: `Internal Server Error` }), { status: 500 })
  }
}
