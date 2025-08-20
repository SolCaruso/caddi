import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-supabase-signature')
    
    // Verify webhook signature (optional but recommended)
    if (process.env.SUPABASE_WEBHOOK_SECRET) {
      const expectedSignature = crypto
        .createHmac('sha256', process.env.SUPABASE_WEBHOOK_SECRET)
        .update(body)
        .digest('hex')
      
      if (signature !== expectedSignature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const payload = JSON.parse(body)
    
    // Check if this is a database change event
    const isDatabaseChange = payload.type === 'INSERT' || 
                            payload.type === 'UPDATE' || 
                            payload.type === 'DELETE'
    
    if (isDatabaseChange) {
      console.log('Database change detected, triggering redeploy...')
      
      // Trigger Vercel redeploy
      if (process.env.VERCEL_DEPLOY_HOOK_URL) {
        const deployResponse = await fetch(process.env.VERCEL_DEPLOY_HOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (deployResponse.ok) {
          console.log('Redeploy triggered successfully')
          return NextResponse.json({ success: true, message: 'Redeploy triggered' })
        } else {
          console.error('Failed to trigger redeploy')
          return NextResponse.json({ error: 'Failed to trigger redeploy' }, { status: 500 })
        }
      } else {
        console.warn('VERCEL_DEPLOY_HOOK_URL not configured')
        return NextResponse.json({ warning: 'Deploy hook not configured' })
      }
    }
    
    return NextResponse.json({ success: true, message: 'Webhook received' })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
