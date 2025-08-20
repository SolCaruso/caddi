import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import crypto from 'crypto'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

// SendPulse email function for order confirmations
async function sendOrderEmail(
  toEmail: string,
  toName: string,
  subject: string,
  htmlContent: string,
  textContent: string
) {
  // Get access token
  const tokenResponse = await fetch('https://api.sendpulse.com/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.SENDPULSE_USER_ID,
      client_secret: process.env.SENDPULSE_API_KEY,
    }),
  })

  if (!tokenResponse.ok) {
    throw new Error('Failed to authenticate with SendPulse')
  }

  const tokenData = await tokenResponse.json()
  const accessToken = tokenData.access_token

  // Send email
  const response = await fetch('https://api.sendpulse.com/smtp/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      email: {
        html: htmlContent,
        text: textContent,
        subject: subject,
        from: {
          name: 'Caddi AI',
          email: process.env.FROM_EMAIL || 'noreply@caddiai.com'
        },
        to: [
          {
            name: toName,
            email: toEmail
          }
        ]
      }
    })
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`SendPulse API Error: ${errorData.message || 'Failed to send email'}`)
  }

  return response.json()
}

// Generate order confirmation email for customer
function generateCustomerEmail(session: Stripe.Checkout.Session) {
  const customerName = session.customer_details?.name || 'Valued Customer'
  const orderNumber = session.id
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

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2F415B; margin: 0; font-size: 28px;">Thank You for Your Order!</h1>
          <p style="color: #6b7280; margin: 10px 0 0 0;">Order #${orderNumber}</p>
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Order Details</h3>
          <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Order Number:</strong> ${orderNumber}</p>
          <p><strong>Total Amount:</strong> ${currency} ${total}</p>
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Items Ordered</h3>
          ${items.map(item => `
            <div style="display: flex; justify-content: space-between; margin: 10px 0; padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
              <div>
                <strong>${item.name}</strong>
                <br><small>Quantity: ${item.quantity}</small>
              </div>
              <div style="text-align: right;">
                ${currency} ${item.price}
              </div>
            </div>
          `).join('')}
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Shipping Information</h3>
          ${session.shipping_details ? `
            <p><strong>Name:</strong> ${session.shipping_details.name}</p>
            <p><strong>Address:</strong></p>
            <p style="margin: 5px 0;">${session.shipping_details.address?.line1 || ''}</p>
            ${session.shipping_details.address?.line2 ? `<p style="margin: 5px 0;">${session.shipping_details.address.line2}</p>` : ''}
            <p style="margin: 5px 0;">
              ${session.shipping_details.address?.city || ''}, ${session.shipping_details.address?.state || ''} ${session.shipping_details.address?.postal_code || ''}
            </p>
            <p style="margin: 5px 0;">${session.shipping_details.address?.country || ''}</p>
          ` : '<p>Shipping details not provided</p>'}
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #6b7280; font-size: 14px;">
            We'll send you a shipping confirmation email once your order ships.
          </p>
          <p style="color: #6b7280; font-size: 14px;">
            Questions about your order? Contact us at <a href="mailto:${process.env.CONTACT_EMAIL || 'info@caddiai.com'}" style="color: #2F415B;">${process.env.CONTACT_EMAIL || 'info@caddiai.com'}</a>
          </p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
          <p style="color: #6b7280; font-size: 12px;">
            Thank you for choosing Caddi AI!
          </p>
        </div>
      </div>
    </div>
  `

  const textContent = `
Thank You for Your Order!

Order #${orderNumber}
Order Date: ${new Date().toLocaleDateString()}
Total Amount: ${currency} ${total}

Items Ordered:
${items.map(item => `- ${item.name} (Qty: ${item.quantity}) - ${currency} ${item.price}`).join('\n')}

Shipping Information:
${session.shipping_details ? `
Name: ${session.shipping_details.name}
Address: ${session.shipping_details.address?.line1 || ''}
${session.shipping_details.address?.line2 ? session.shipping_details.address.line2 + '\n' : ''}${session.shipping_details.address?.city || ''}, ${session.shipping_details.address?.state || ''} ${session.shipping_details.address?.postal_code || ''}
${session.shipping_details.address?.country || ''}
` : 'Shipping details not provided'}

We'll send you a shipping confirmation email once your order ships.

Questions about your order? Contact us at ${process.env.CONTACT_EMAIL || 'info@caddiai.com'}

Thank you for choosing Caddi AI!
  `

  return { htmlContent, textContent }
}

// Generate order notification email for owner
function generateOwnerEmail(session: Stripe.Checkout.Session) {
  const customerName = session.customer_details?.name || 'Unknown Customer'
  const customerEmail = session.customer_details?.email || 'No email provided'
  const orderNumber = session.id
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

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2F415B; margin: 0; font-size: 28px;">New Order Received!</h1>
          <p style="color: #6b7280; margin: 10px 0 0 0;">Order #${orderNumber}</p>
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Customer Information</h3>
          <p><strong>Name:</strong> ${customerName}</p>
          <p><strong>Email:</strong> <a href="mailto:${customerEmail}">${customerEmail}</a></p>
          <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Order Number:</strong> ${orderNumber}</p>
          <p><strong>Total Amount:</strong> ${currency} ${total}</p>
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Items Ordered</h3>
          ${items.map(item => `
            <div style="display: flex; justify-content: space-between; margin: 10px 0; padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
              <div>
                <strong>${item.name}</strong>
                <br><small>Quantity: ${item.quantity}</small>
              </div>
              <div style="text-align: right;">
                ${currency} ${item.price}
              </div>
            </div>
          `).join('')}
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Shipping Information</h3>
          ${session.shipping_details ? `
            <p><strong>Name:</strong> ${session.shipping_details.name}</p>
            <p><strong>Address:</strong></p>
            <p style="margin: 5px 0;">${session.shipping_details.address?.line1 || ''}</p>
            ${session.shipping_details.address?.line2 ? `<p style="margin: 5px 0;">${session.shipping_details.address.line2}</p>` : ''}
            <p style="margin: 5px 0;">
              ${session.shipping_details.address?.city || ''}, ${session.shipping_details.address?.state || ''} ${session.shipping_details.address?.postal_code || ''}
            </p>
            <p style="margin: 5px 0;">${session.shipping_details.address?.country || ''}</p>
          ` : '<p>Shipping details not provided</p>'}
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #6b7280; font-size: 14px;">
            Please process this order and update the customer on shipping status.
          </p>
        </div>
      </div>
    </div>
  `

  const textContent = `
New Order Received!

Order #${orderNumber}
Customer: ${customerName} (${customerEmail})
Order Date: ${new Date().toLocaleDateString()}
Total Amount: ${currency} ${total}

Items Ordered:
${items.map(item => `- ${item.name} (Qty: ${item.quantity}) - ${currency} ${item.price}`).join('\n')}

Shipping Information:
${session.shipping_details ? `
Name: ${session.shipping_details.name}
Address: ${session.shipping_details.address?.line1 || ''}
${session.shipping_details.address?.line2 ? session.shipping_details.address.line2 + '\n' : ''}${session.shipping_details.address?.city || ''}, ${session.shipping_details.address?.state || ''} ${session.shipping_details.address?.postal_code || ''}
${session.shipping_details.address?.country || ''}
` : 'Shipping details not provided'}

Please process this order and update the customer on shipping status.
  `

  return { htmlContent, textContent }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'No signature provided' }, { status: 400 })
    }

    // Verify webhook signature
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        
        console.log('Processing completed checkout session:', session.id)
        
        // Send customer confirmation email
        if (session.customer_details?.email) {
          try {
            const customerEmail = generateCustomerEmail(session)
            await sendOrderEmail(
              session.customer_details.email,
              session.customer_details.name || 'Valued Customer',
              'Thank you for your order! - Caddi AI',
              customerEmail.htmlContent,
              customerEmail.textContent
            )
            console.log('Customer confirmation email sent successfully')
          } catch (error) {
            console.error('Failed to send customer confirmation email:', error)
          }
        }

        // Send owner notification email
        try {
          const ownerEmail = generateOwnerEmail(session)
          await sendOrderEmail(
            process.env.CONTACT_EMAIL || 'info@caddiai.com',
            'Caddi Team',
            `New Order Received - ${session.id}`,
            ownerEmail.htmlContent,
            ownerEmail.textContent
          )
          console.log('Owner notification email sent successfully')
        } catch (error) {
          console.error('Failed to send owner notification email:', error)
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
