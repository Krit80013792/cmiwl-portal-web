import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { sessionOptions } from '@/src/shared/utils/session'

export async function POST(req: NextRequest) {
  try {
    const session: any = await getIronSession(await cookies(), sessionOptions)
    const data = await req.json()
    session.vehicleRates = data
    await session.save()
    return NextResponse.json({ message: 'Success' }, { status: 200 })
  } catch (error) {
    console.error('Error in POST /api/v1/collect-session-data:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
