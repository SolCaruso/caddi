import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

const resend = new Resend(process.env.RESEND_API_KEY!)

// Generate a shorter, more readable order number
function generateOrderNumber(sessionId: string): string {
  // Take the last 8 characters of the session ID for uniqueness
  const shortId = sessionId.slice(-8).toUpperCase()
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2) // Last 2 digits of year
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  
  return `CD${year}${month}${day}-${shortId}`
}

// Resend email function for order confirmations
async function sendOrderEmail(
  toEmail: string,
  toName: string,
  subject: string,
  htmlContent: string,
  textContent: string
) {
  console.log('Sending email via Resend:', {
    subject,
    to: toEmail,
    hasHtml: !!htmlContent,
    htmlLength: htmlContent.length,
    hasText: !!textContent
  })

  try {
    const result = await resend.emails.send({
      from: `Caddi AI <${process.env.FROM_EMAIL || 'noreply@caddiai.com'}>`,
      to: [toEmail],
      subject: subject,
      html: htmlContent,
      text: textContent,
    })

    console.log('Resend email sent successfully:', {
      to: toEmail,
      subject,
      emailId: result.data?.id,
      fullResult: JSON.stringify(result, null, 2)
    })
    
    return result
  } catch (error) {
    console.error('Resend API Error:', error)
    throw new Error(`Resend API Error: ${error instanceof Error ? error.message : 'Failed to send email'}`)
  }
}

// Generate order confirmation email for customer
function generateCustomerEmail(session: Stripe.Checkout.Session) {
  const orderNumber = generateOrderNumber(session.id)
  const total = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00'
  const currency = session.currency?.toUpperCase() || 'CAD'
  
  const items = session.line_items?.data.map(item => {
    const product = item.price?.product as Stripe.Product
    return {
      name: product?.name || 'Product',
      quantity: item.quantity || 1,
      price: item.amount_total ? (item.amount_total / 100).toFixed(2) : '0.00'
    }
  }) || []

  // Handle shipping details safely - try multiple sources
  const sessionWithShipping = session as Stripe.Checkout.Session & {
    shipping_details?: {
      name?: string
      address?: {
        line1?: string
        line2?: string | null
        city?: string
        state?: string
        postal_code?: string
        country?: string
      }
    }
    shipping_cost?: {
      shipping_address?: any
    }
  }
  
  // Try different sources for shipping information
  let shippingInfo = sessionWithShipping.shipping_details
  
  // If shipping_details is null, try shipping_cost.shipping_address
  if (!shippingInfo && sessionWithShipping.shipping_cost?.shipping_address) {
    shippingInfo = sessionWithShipping.shipping_cost.shipping_address
  }
  
  // If still no shipping info, try to construct from customer_details
  if (!shippingInfo && session.customer_details?.address) {
    const customerAddress = session.customer_details.address
    shippingInfo = {
      name: session.customer_details.name || undefined,
      address: {
        line1: customerAddress.line1 || undefined,
        line2: customerAddress.line2 || undefined,
        city: customerAddress.city || undefined,
        state: customerAddress.state || undefined,
        postal_code: customerAddress.postal_code || undefined,
        country: customerAddress.country || undefined,
      }
    }
  }
  
  const hasShippingDetails = shippingInfo && shippingInfo.address
  
  console.log('Customer email - Final shipping info used:', JSON.stringify(shippingInfo, null, 2))
  console.log('Customer email - Has shipping details:', hasShippingDetails)

  // Modern email template with better styling
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2F415B 0%, #1a2332 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 600; letter-spacing: -0.5px;">
            Thank You for Your Order!
          </h1>
          <p style="color: #e2e8f0; margin: 15px 0 0 0; font-size: 18px; opacity: 0.9;">
            Order #${orderNumber}
          </p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          
          <!-- Order Summary -->
          <div style="background-color: #f8fafc; border-radius: 8px; padding: 25px; margin-bottom: 30px; border-left: 4px solid #2F415B;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Order Summary</h2>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #6b7280; font-size: 16px;">Order Date:</span>
              <span style="color: #1f2937; font-weight: 500;">${new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #6b7280; font-size: 16px;">Order Number:</span>
              <span style="color: #1f2937; font-weight: 500;">${orderNumber}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding-top: 15px; border-top: 1px solid #e5e7eb;">
              <span style="color: #1f2937; font-size: 18px; font-weight: 600;">Total Amount:</span>
              <span style="color: #2F415B; font-size: 18px; font-weight: 700;">${currency} $${total}</span>
            </div>
          </div>

          <!-- Items -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Items Ordered</h2>
            ${items.map(item => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px 0; border-bottom: 1px solid #e5e7eb;">
                <div>
                  <h3 style="color: #1f2937; margin: 0 0 5px 0; font-size: 16px; font-weight: 600;">${item.name}</h3>
                  <p style="color: #6b7280; margin: 0; font-size: 14px;">Quantity: ${item.quantity}</p>
                </div>
                <div style="text-align: right;">
                  <span style="color: #2F415B; font-size: 16px; font-weight: 600;">${currency} $${item.price}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Shipping Info -->
          <div style="background-color: #f8fafc; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Shipping Information</h2>
            ${hasShippingDetails ? `
              <div style="color: #4b5563; line-height: 1.6;">
                <p style="margin: 0 0 10px 0;"><strong style="color: #1f2937;">Name:</strong> ${shippingInfo?.name || 'Not provided'}</p>
                <p style="margin: 0 0 5px 0;"><strong style="color: #1f2937;">Address:</strong></p>
                <div style="margin-left: 15px;">
                  <p style="margin: 0;">${shippingInfo?.address?.line1 || ''}</p>
                  ${shippingInfo?.address?.line2 ? `<p style="margin: 0;">${shippingInfo.address.line2}</p>` : ''}
                  <p style="margin: 0;">
                    ${shippingInfo?.address?.city || ''}, ${shippingInfo?.address?.state || ''} ${shippingInfo?.address?.postal_code || ''}
                  </p>
                  <p style="margin: 0;">${shippingInfo?.address?.country || ''}</p>
                </div>
              </div>
            ` : '<p style="color: #6b7280; margin: 0;">Shipping details not provided</p>'}
          </div>

          <!-- Footer Message -->
          <div style="text-align: center; padding: 30px 0; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 16px;">
              We'll send you a shipping confirmation email once your order ships.
            </p>
            <p style="color: #6b7280; margin: 0; font-size: 14px;">
              Questions about your order? Contact us at 
              <a href="mailto:${process.env.CONTACT_EMAIL || 'info@caddiai.com'}" style="color: #2F415B; text-decoration: none;">
                ${process.env.CONTACT_EMAIL || 'info@caddiai.com'}
              </a>
            </p>
          </div>

          <!-- Brand Footer -->
          <div style="text-align: center; padding: 20px 0; background-color: #f8fafc; margin: 30px -30px -40px -30px;">
            <p style="color: #2F415B; margin: 0; font-size: 18px; font-weight: 600;">
              Thank you for choosing Caddi AI!
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  const textContent = `
Thank You for Your Order!

Order #${orderNumber}
Order Date: ${new Date().toLocaleDateString()}
Total Amount: ${currency} $${total}

Items Ordered:
${items.map(item => `- ${item.name} (Qty: ${item.quantity}) - ${currency} $${item.price}`).join('\n')}

Shipping Information:
${hasShippingDetails ? `
Name: ${shippingInfo?.name || 'Not provided'}
Address: ${shippingInfo?.address?.line1 || ''}
${shippingInfo?.address?.line2 ? shippingInfo.address.line2 + '\n' : ''}${shippingInfo?.address?.city || ''}, ${shippingInfo?.address?.state || ''} ${shippingInfo?.address?.postal_code || ''}
${shippingInfo?.address?.country || ''}
` : 'Shipping details not provided'}

We'll send you a shipping confirmation email once your order ships.

Questions about your order? Contact us at ${process.env.CONTACT_EMAIL || 'info@caddiai.com'}

Thank you for choosing Caddi AI!
  `

  console.log('Generated HTML email length:', htmlContent.length)
  console.log('HTML email preview (first 200 chars):', htmlContent.substring(0, 200))

  return { htmlContent, textContent }
}

// Generate order notification email for owner
function generateOwnerEmail(session: Stripe.Checkout.Session) {
  const customerName = session.customer_details?.name || 'Unknown Customer'
  const customerEmail = session.customer_details?.email || 'No email provided'
  const orderNumber = generateOrderNumber(session.id)
  const total = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00'
  const currency = session.currency?.toUpperCase() || 'CAD'
  
  const items = session.line_items?.data.map(item => {
    const product = item.price?.product as Stripe.Product
    return {
      name: product?.name || 'Product',
      quantity: item.quantity || 1,
      price: item.amount_total ? (item.amount_total / 100).toFixed(2) : '0.00'
    }
  }) || []

  // Handle shipping details safely - try multiple sources (same as customer email)
  const sessionWithShipping = session as Stripe.Checkout.Session & {
    shipping_details?: {
      name?: string
      address?: {
        line1?: string
        line2?: string | null
        city?: string
        state?: string
        postal_code?: string
        country?: string
      }
    }
    shipping_cost?: {
      shipping_address?: any
    }
  }
  
  // Try different sources for shipping information
  let shippingInfo = sessionWithShipping.shipping_details
  
  // If shipping_details is null, try shipping_cost.shipping_address
  if (!shippingInfo && sessionWithShipping.shipping_cost?.shipping_address) {
    shippingInfo = sessionWithShipping.shipping_cost.shipping_address
  }
  
  // If still no shipping info, try to construct from customer_details
  if (!shippingInfo && session.customer_details?.address) {
    const customerAddress = session.customer_details.address
    shippingInfo = {
      name: session.customer_details.name || undefined,
      address: {
        line1: customerAddress.line1 || undefined,
        line2: customerAddress.line2 || undefined,
        city: customerAddress.city || undefined,
        state: customerAddress.state || undefined,
        postal_code: customerAddress.postal_code || undefined,
        country: customerAddress.country || undefined,
      }
    }
  }
  
  const hasShippingDetails = shippingInfo && shippingInfo.address
  
  console.log('Owner email - Final shipping info used:', JSON.stringify(shippingInfo, null, 2))
  console.log('Owner email - Has shipping details:', hasShippingDetails)

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Order Notification</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 600; letter-spacing: -0.5px;">
            New Order Received!
          </h1>
          <p style="color: #fecaca; margin: 15px 0 0 0; font-size: 18px; opacity: 0.9;">
            Order #${orderNumber}
          </p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          
          <!-- Customer Info -->
          <div style="background-color: #fef2f2; border-radius: 8px; padding: 25px; margin-bottom: 30px; border-left: 4px solid #dc2626;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Customer Information</h2>
            <div style="margin-bottom: 10px;">
              <span style="color: #6b7280; font-size: 16px;">Name:</span>
              <span style="color: #1f2937; font-weight: 500; margin-left: 10px;">${customerName}</span>
            </div>
            <div style="margin-bottom: 10px;">
              <span style="color: #6b7280; font-size: 16px;">Email:</span>
              <a href="mailto:${customerEmail}" style="color: #dc2626; text-decoration: none; margin-left: 10px;">${customerEmail}</a>
            </div>
            <div style="margin-bottom: 10px;">
              <span style="color: #6b7280; font-size: 16px;">Order Date:</span>
              <span style="color: #1f2937; font-weight: 500; margin-left: 10px;">${new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding-top: 15px; border-top: 1px solid #fecaca;">
              <span style="color: #1f2937; font-size: 18px; font-weight: 600;">Total Amount:</span>
              <span style="color: #dc2626; font-size: 18px; font-weight: 700;">${currency} $${total}</span>
            </div>
          </div>

          <!-- Items -->
          <div style="margin-bottom: 30px;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Items Ordered</h2>
            ${items.map(item => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px 0; border-bottom: 1px solid #e5e7eb;">
                <div>
                  <h3 style="color: #1f2937; margin: 0 0 5px 0; font-size: 16px; font-weight: 600;">${item.name}</h3>
                  <p style="color: #6b7280; margin: 0; font-size: 14px;">Quantity: ${item.quantity}</p>
                </div>
                <div style="text-align: right;">
                  <span style="color: #dc2626; font-size: 16px; font-weight: 600;">${currency} $${item.price}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Shipping Info -->
          <div style="background-color: #f8fafc; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Shipping Information</h2>
            ${hasShippingDetails ? `
              <div style="color: #4b5563; line-height: 1.6;">
                <p style="margin: 0 0 10px 0;"><strong style="color: #1f2937;">Name:</strong> ${shippingInfo?.name || 'Not provided'}</p>
                <p style="margin: 0 0 5px 0;"><strong style="color: #1f2937;">Address:</strong></p>
                <div style="margin-left: 15px;">
                  <p style="margin: 0;">${shippingInfo?.address?.line1 || ''}</p>
                  ${shippingInfo?.address?.line2 ? `<p style="margin: 0;">${shippingInfo.address.line2}</p>` : ''}
                  <p style="margin: 0;">
                    ${shippingInfo?.address?.city || ''}, ${shippingInfo?.address?.state || ''} ${shippingInfo?.address?.postal_code || ''}
                  </p>
                  <p style="margin: 0;">${shippingInfo?.address?.country || ''}</p>
                </div>
              </div>
            ` : '<p style="color: #6b7280; margin: 0;">Shipping details not provided</p>'}
          </div>

          <!-- Action Required -->
          <div style="text-align: center; padding: 30px 0; border-top: 1px solid #e5e7eb;">
            <p style="color: #dc2626; margin: 0; font-size: 18px; font-weight: 600;">
              Please process this order and update the customer on shipping status.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  const textContent = `
New Order Received!

Order #${orderNumber}
Customer: ${customerName} (${customerEmail})
Order Date: ${new Date().toLocaleDateString()}
Total Amount: ${currency} $${total}

Items Ordered:
${items.map(item => `- ${item.name} (Qty: ${item.quantity}) - ${currency} $${item.price}`).join('\n')}

Shipping Information:
${hasShippingDetails ? `
Name: ${shippingInfo?.name || 'Not provided'}
Address: ${shippingInfo?.address?.line1 || ''}
${shippingInfo?.address?.line2 ? shippingInfo.address.line2 + '\n' : ''}${shippingInfo?.address?.city || ''}, ${shippingInfo?.address?.state || ''} ${shippingInfo?.address?.postal_code || ''}
${shippingInfo?.address?.country || ''}
` : 'Shipping details not provided'}

Please process this order and update the customer on shipping status.
  `

  return { htmlContent, textContent }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    // Enhanced debugging
    console.log('Webhook received:', {
      hasSignature: !!signature,
      bodyLength: body.length,
      webhookSecretConfigured: !!process.env.STRIPE_WEBHOOK_SECRET,
      stripeSecretKeyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 7) + '...',
      webhookSecretPrefix: process.env.STRIPE_WEBHOOK_SECRET?.substring(0, 8) + '...',
    })

    if (!signature) {
      console.error('No signature provided in webhook request')
      return NextResponse.json({ error: 'No signature provided' }, { status: 400 })
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('STRIPE_WEBHOOK_SECRET environment variable not configured')
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
    }

    // Verify webhook signature
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
      console.log('Webhook signature verified successfully for event:', event.type)
    } catch (err) {
      console.error('Webhook signature verification failed:', {
        error: err instanceof Error ? err.message : 'Unknown error',
        signatureHeader: signature?.substring(0, 20) + '...',
        webhookSecretLength: process.env.STRIPE_WEBHOOK_SECRET?.length
      })
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const sessionId = event.data.object.id
        
        console.log('Processing completed checkout session:', sessionId)
        
        // Retrieve the full session with line items expanded
        // Note: shipping_details cannot be expanded, but is available directly
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ['line_items', 'line_items.data.price.product']
        })
        
        // Debug: Log the entire session object to see what shipping data is available
        console.log('Full session object keys:', Object.keys(session))
        console.log('Session shipping_details:', JSON.stringify((session as any).shipping_details, null, 2))
        console.log('Session shipping_cost:', JSON.stringify((session as any).shipping_cost, null, 2))
        console.log('Session customer_details:', JSON.stringify(session.customer_details, null, 2))
        
        // Send customer confirmation email
        if (session.customer_details?.email) {
          try {
            const customerEmail = generateCustomerEmail(session)
            const orderNumber = generateOrderNumber(session.id)
            await sendOrderEmail(
              session.customer_details.email,
              session.customer_details.name || 'Valued Customer',
              `Thank you for your order! Order #${orderNumber} - Caddi AI`,
              customerEmail.htmlContent,
              customerEmail.textContent
            )
            console.log('Customer confirmation email sent successfully')
          } catch (error) {
            console.error('Failed to send customer confirmation email:', error)
          }
        }

        // Add a small delay to avoid rate limiting (Resend allows 2 requests per second)
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Send owner notification email
        try {
          console.log('Starting owner notification process...')
          const ownerEmail = generateOwnerEmail(session)
          console.log('Owner email generated successfully')
          
          const orderNumber = generateOrderNumber(session.id)
          console.log('Order number generated:', orderNumber)
          
          const ownerEmailAddress = process.env.CONTACT_EMAIL || 'info@caddiai.com'
          console.log('Sending owner notification to:', ownerEmailAddress)
          console.log('Owner email HTML length:', ownerEmail.htmlContent.length)
          console.log('Owner email text length:', ownerEmail.textContent.length)
          
          const result = await sendOrderEmail(
            ownerEmailAddress,
            'Caddi Team',
            `New Order Received - ${orderNumber}`,
            ownerEmail.htmlContent,
            ownerEmail.textContent
          )
          console.log('Owner notification email sent successfully to:', ownerEmailAddress)
          console.log('Resend result:', result)
        } catch (error) {
          console.error('Failed to send owner notification email - FULL ERROR:', error)
          console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
          console.error('Owner email address was:', process.env.CONTACT_EMAIL || 'info@caddiai.com')
        }
        
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}