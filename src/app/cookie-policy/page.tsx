import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie Policy for Caddi AI Inc. Learn how we use cookies and similar technologies on our website and golf app.',
  keywords: ["cookie policy", "cookies", "website cookies", "caddi ai cookies", "golf app cookies", "privacy cookies"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Cookie Policy',
    description: 'Cookie Policy for Caddi AI Inc. Learn how we use cookies and similar technologies on our website and golf app.',
    url: 'https://caddi.ai/cookie-policy',
  },
}

export default function CookiePolicyPage() {
  return (
    <div className="">
      <div className="max-w-4xl mx-auto px-4 pt-16 pb-34 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
          
          <div className="space-y-8">
            <section>
              <p className="text-gray-700 leading-relaxed mb-4">
                This Cookie Policy explains how cookies and similar technologies are used in CaDDi AI Inc, websites and related services.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                This policy should be read alongside our Privacy Policy, which explains how we collect, use and protect your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Cookies?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies are small text files that are stored on your device (computer, tablet or mobile) when you visit a website. They help the website remember information about your visit, which can make it easier to visit the website again and make the site more useful to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">Essential Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. Without these cookies, our services cannot be provided.
              </p>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Functional Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings. They may be set by us or by third-party providers whose services we use.
              </p>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Performance and Analytics Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These cookies collect information about how you use our website and games, such as which pages you visit and how long you spend on them. This helps us improve our services and understand player behavior patterns.
              </p>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Marketing and Advertising Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These cookies are used to deliver advertisements that are more relevant to you and your interests. They may also be used to limit the number of times you see an advertisement and measure the effectiveness of advertising campaigns.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Manage Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You can control and manage cookies in various ways:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li><strong>Browser settings:</strong> Most browsers allow you to view, manage and delete cookies</li>
                <li><strong>Browser plugins:</strong> You can install privacy-focused browser extensions</li>
                <li><strong>Opt-out tools:</strong> You can use industry opt-out tools for advertising cookies</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Browser Settings</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Here's how to manage cookies in popular browsers:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Impact of Disabling Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Please note that disabling certain cookies may affect the functionality of our website and apps. Essential cookies cannot be disabled without impacting core functionality, while disabling other types may limit personalization and analytics capabilities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates to This Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make significant changes, we will notify you through appropriate means.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Cookie Policy, please contact us at <a href="mailto:info@caddiai.com" className="text-caddi-brown hover:underline">info@caddiai.com</a> or visit our <Link href="/contact" className="text-caddi-brown hover:underline">contact page</Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
