import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Simple debouncing - in production you'd use Redis or a database
let deploymentTimeout: NodeJS.Timeout | null = null
let pendingChanges = 0

const DEBOUNCE_DELAY = 30 * 1000 // 30 seconds

async function triggerDeployment() {
  if (!process.env.VERCEL_DEPLOY_HOOK_URL) {
    console.error('VERCEL_DEPLOY_HOOK_URL not configured')
    return false
  }

  try {
    console.log(`🚀 Triggering deployment after ${pendingChanges} database changes`)
    
    const response = await fetch(process.env.VERCEL_DEPLOY_HOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (response.ok) {
      console.log('✅ Deployment triggered successfully')
      pendingChanges = 0
      return true
    } else {
      console.error('❌ Failed to trigger deployment:', response.status)
      return false
    }
  } catch (error) {
    console.error('❌ Error triggering deployment:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-supabase-signature')
    
    // Verify webhook signature for security
    if (process.env.SUPABASE_WEBHOOK_SECRET) {
      const expectedSignature = crypto
        .createHmac('sha256', process.env.SUPABASE_WEBHOOK_SECRET)
        .update(body)
        .digest('hex')
      
      if (signature !== expectedSignature) {
        console.error('❌ Invalid webhook signature')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const payload = JSON.parse(body)
    
    // Check if this is a database change event
    const isDatabaseChange = payload.type === 'INSERT' || 
                            payload.type === 'UPDATE' || 
                            payload.type === 'DELETE'
    
    if (isDatabaseChange) {
      const { table, type } = payload
      console.log(`📊 Database change detected: ${type} on ${table}`)
      pendingChanges++
      
      // Clear any existing timeout
      if (deploymentTimeout) {
        clearTimeout(deploymentTimeout)
        console.log('⏰ Existing deployment timeout cleared')
      }
      
      // Set a new timeout for 30 seconds
      deploymentTimeout = setTimeout(async () => {
        console.log(`⏰ No changes for ${DEBOUNCE_DELAY / 1000} seconds, triggering deployment`)
        await triggerDeployment()
        deploymentTimeout = null
      }, DEBOUNCE_DELAY)
      
      console.log(`⏰ Deployment scheduled in ${DEBOUNCE_DELAY / 1000} seconds (${pendingChanges} changes pending)`)
      
      return NextResponse.json({ 
        success: true, 
        message: `Change recorded. Deployment will trigger in ${DEBOUNCE_DELAY / 1000} seconds if no more changes occur.`,
        pendingChanges,
        scheduledIn: DEBOUNCE_DELAY / 1000
      })
    }
    
    return NextResponse.json({ success: true, message: 'Webhook received' })
  } catch (error) {
    console.error('❌ Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
