import { NextRequest, NextResponse } from 'next/server'

// Store the timeout reference globally (in production, you'd use Redis or a database)
let deploymentTimeout: NodeJS.Timeout | null = null
let pendingChanges = 0

const DEBOUNCE_DELAY = 5 * 60 * 1000 // 5 minutes in milliseconds
const VERCEL_DEPLOY_HOOK = process.env.VERCEL_DEPLOY_HOOK_URL

async function triggerDeployment() {
  if (!VERCEL_DEPLOY_HOOK) {
    console.error('VERCEL_DEPLOY_HOOK_URL not configured')
    return false
  }

  try {
    console.log(`Triggering deployment after ${pendingChanges} database changes`)
    
    const response = await fetch(VERCEL_DEPLOY_HOOK, {
      method: 'POST'
    })
    
    if (response.ok) {
      const result = await response.json()
      console.log('Deployment triggered successfully:', result)
      pendingChanges = 0 // Reset counter
      return true
    } else {
      console.error('Failed to trigger deployment:', response.status, response.statusText)
      return false
    }
  } catch (error) {
    console.error('Error triggering deployment:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from Supabase (optional security check)
    const webhookSecret = request.headers.get('x-webhook-secret')
    if (webhookSecret !== process.env.SUPABASE_WEBHOOK_SECRET) {
      console.log('Invalid webhook secret')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse the webhook payload to get information about the change
    const payload = await request.json()
    const { table, type } = payload
    
    console.log(`Database change detected: ${type} on ${table}`)
    pendingChanges++
    
    // Clear any existing timeout
    if (deploymentTimeout) {
      clearTimeout(deploymentTimeout)
      console.log('Existing deployment timeout cleared')
    }
    
    // Set a new timeout for 5 minutes
    deploymentTimeout = setTimeout(async () => {
      console.log(`No changes for ${DEBOUNCE_DELAY / 1000} seconds, triggering deployment`)
      await triggerDeployment()
      deploymentTimeout = null
    }, DEBOUNCE_DELAY)
    
    console.log(`Deployment scheduled in ${DEBOUNCE_DELAY / 1000} seconds (${pendingChanges} pending changes)`)
    
    return NextResponse.json({ 
      success: true, 
      message: `Change recorded. Deployment will trigger in ${DEBOUNCE_DELAY / 1000} seconds if no more changes occur.`,
      pendingChanges,
      scheduledIn: DEBOUNCE_DELAY / 1000
    })
    
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}

// Optional: Add a GET endpoint to check status
export async function GET() {
  return NextResponse.json({
    pendingChanges,
    deploymentScheduled: !!deploymentTimeout,
    timeUntilDeploy: deploymentTimeout ? DEBOUNCE_DELAY / 1000 : 0
  })
}
