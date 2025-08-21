import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Caddi AI Inc. Have questions about our golf divot tools, Forecaddie app, or need support? We'd love to hear from you.",
  keywords: ["contact caddi ai", "golf support", "customer service", "golf divot tools support", "forecaddie app support"],
  openGraph: {
    title: "Contact Us",
    description: "Get in touch with Caddi AI Inc. Have questions about our golf divot tools, Forecaddie app, or need support? We'd love to hear from you.",
    url: 'https://caddi.ai/contact',
  },
  twitter: {
    title: "Contact Us",
    description: "Get in touch with Caddi AI Inc. Have questions about our golf divot tools, Forecaddie app, or need support? We'd love to hear from you.",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
