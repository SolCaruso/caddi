import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

// Resend email function for contact form submissions
async function sendContactEmail(formData: {
  firstName: string
  lastName: string
  company?: string
  email: string
  phoneNumber?: string
  message: string
}) {
  console.log('Sending contact form email via Resend:', {
    name: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
    hasCompany: !!formData.company,
    hasPhone: !!formData.phoneNumber
  })

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2F415B 0%, #1a2332 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
            New Contact Form Submission
          </h1>
          <p style="color: #e2e8f0; margin: 15px 0 0 0; font-size: 16px; opacity: 0.9;">
            From ${formData.firstName} ${formData.lastName}
          </p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          
          <!-- Contact Information -->
          <div style="background-color: #f8fafc; border-radius: 8px; padding: 25px; margin-bottom: 30px; border-left: 4px solid #2F415B;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Contact Information</h2>
            
            <div style="margin-bottom: 15px;">
              <span style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Name</span>
              <p style="color: #1f2937; font-weight: 600; margin: 5px 0 0 0; font-size: 16px;">${formData.firstName} ${formData.lastName}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <span style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
              <p style="margin: 5px 0 0 0;">
                <a href="mailto:${formData.email}" style="color: #2F415B; text-decoration: none; font-size: 16px;">${formData.email}</a>
              </p>
            </div>
            
            ${formData.company ? `
              <div style="margin-bottom: 15px;">
                <span style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Company</span>
                <p style="color: #1f2937; margin: 5px 0 0 0; font-size: 16px;">${formData.company}</p>
              </div>
            ` : ''}
            
            ${formData.phoneNumber ? `
              <div style="margin-bottom: 15px;">
                <span style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Phone</span>
                <p style="color: #1f2937; margin: 5px 0 0 0; font-size: 16px;">
                  <a href="tel:${formData.phoneNumber}" style="color: #2F415B; text-decoration: none;">${formData.phoneNumber}</a>
                </p>
              </div>
            ` : ''}
          </div>

          <!-- Message -->
          <div style="background-color: #f8fafc; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Message</h2>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 6px; border: 1px solid #e5e7eb;">
              <p style="color: #374151; line-height: 1.7; margin: 0; white-space: pre-wrap; font-size: 15px;">${formData.message}</p>
            </div>
          </div>

          <!-- Footer -->
          <div style="text-align: center; padding: 20px 0; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0; font-size: 14px;">
              This message was sent from the Caddi contact form on ${new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  const textContent = `
New Contact Form Submission

Contact Information:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
${formData.company ? `Company: ${formData.company}` : ''}
${formData.phoneNumber ? `Phone: ${formData.phoneNumber}` : ''}

Message:
${formData.message}

Submitted on: ${new Date().toLocaleString()}
  `

  try {
    const result = await resend.emails.send({
      from: `Caddi Contact Form <${process.env.FROM_EMAIL || 'noreply@caddiai.com'}>`,
      to: [process.env.CONTACT_EMAIL || 'info@caddiai.com'],
      subject: `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
      html: htmlContent,
      text: textContent,
      replyTo: formData.email, // Allow direct replies to the customer
    })

    console.log('Contact form email sent successfully:', {
      emailId: result.data?.id,
      to: process.env.CONTACT_EMAIL || 'info@caddiai.com'
    })
    
    return result
  } catch (error) {
    console.error('Resend API Error:', error)
    throw new Error(`Resend API Error: ${error instanceof Error ? error.message : 'Failed to send email'}`)
  }
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
    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY environment variable')
      return NextResponse.json(
        { error: 'Email service not configured. Please contact support.' },
        { status: 500 }
      )
    }

    // Send contact form email via Resend
    await sendContactEmail({ firstName, lastName, company, email, phoneNumber, message })

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending contact form email:', error)
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send email'
    if (error instanceof Error) {
      if (error.message.includes('Invalid API key')) {
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