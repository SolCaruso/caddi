import { NextRequest, NextResponse } from 'next/server'


// SendPulse REST API approach
async function sendEmailViaAPI(formData: {
  firstName: string
  lastName: string
  company?: string
  email: string
  phoneNumber?: string
  message: string
}) {
  // First, get access token using User ID and Secret
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

  // Now send email using the access token
  const response = await fetch('https://api.sendpulse.com/smtp/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      email: {
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af;">New Contact Form Submission</h2>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
              
              <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
              <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
              ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
              ${formData.phoneNumber ? `<p><strong>Phone:</strong> ${formData.phoneNumber}</p>` : ''}
            </div>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Message</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${formData.message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
              <p>This message was sent from the Caddi contact form.</p>
              <p>Submitted on: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
        text: `
          New Contact Form Submission
          
          Contact Information:
          Name: ${formData.firstName} ${formData.lastName}
          Email: ${formData.email}
          ${formData.company ? `Company: ${formData.company}` : ''}
          ${formData.phoneNumber ? `Phone: ${formData.phoneNumber}` : ''}
          
          Message:
          ${formData.message}
          
          Submitted on: ${new Date().toLocaleString()}
        `,
        subject: `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
        from: {
          name: 'Caddi Contact Form',
          email: 'info@caddiai.com'
        },
        to: [
          {
            name: 'Caddi Support',
            email: 'info@caddiai.com'
          }
        ]
      }
    })
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`API Error: ${errorData.message || 'Failed to send email'}`)
  }

  return response.json()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, company, email, phoneNumber, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if environment variables are set
    if (!process.env.SENDPULSE_USER_ID || !process.env.SENDPULSE_API_KEY) {
      console.error('Missing SendPulse environment variables')
      return NextResponse.json(
        { error: 'Email service not configured. Please contact support.' },
        { status: 500 }
      )
    }



    

    // Use SendPulse REST API (more reliable than SMTP)
    await sendEmailViaAPI({ firstName, lastName, company, email, phoneNumber, message })

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send email'
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        errorMessage = 'Email service authentication failed. Please check configuration.'
      } else if (error.message.includes('ECONNREFUSED')) {
        errorMessage = 'Unable to connect to email service.'
      } else {
        errorMessage = error.message
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
