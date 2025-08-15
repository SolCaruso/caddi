This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contact Form Setup (SendPulse)

This project uses SendPulse for handling contact form submissions. To set up the contact form:

1. **Get SendPulse Credentials:**
   - Log into your SendPulse account at [login.sendpulse.com/smtp/](https://login.sendpulse.com/smtp/)
   - Go to "SMTP settings" in the left sidebar
   - Click "Show authorization data" to get your User ID and API Key

2. **Configure Environment Variables:**
   - Copy `env.example` to `.env.local`
   - Update the following variables:
     ```
     SENDPULSE_USER_ID=your_sendpulse_user_id
     SENDPULSE_API_KEY=your_sendpulse_api_key
     FROM_EMAIL=noreply@yourdomain.com
     CONTACT_EMAIL=contact@yourdomain.com
     ```

3. **Test the Contact Form:**
   - Start the development server: `npm run dev`
   - Navigate to `/contact` and test the form
   - Check your contact email for incoming messages

**Note:** The free SendPulse plan has a limit of 50 emails per hour. Consider upgrading for higher limits.
