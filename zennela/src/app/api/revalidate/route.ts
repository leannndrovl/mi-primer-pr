import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const topic = (body?.topic as string) ?? ''

  if (topic.startsWith('products/')) {
    revalidateTag('products')
    if (body?.handle) revalidateTag(`product-${body.handle}`)
  } else if (topic.startsWith('collections/')) {
    revalidateTag('collections')
    if (body?.handle) revalidateTag(`collection-${body.handle}`)
  } else {
    revalidateTag('products')
    revalidateTag('collections')
  }

  return NextResponse.json({ revalidated: true, topic })
}
