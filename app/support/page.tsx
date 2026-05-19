import { Footer } from '@/components/landing/footer'

export const metadata = {
  title: 'Support | SmarterTraining',
  description: 'Get help with SmarterTraining.',
}

export default function SupportPage() {
  return (
    <>
      <main className="min-h-screen bg-white text-gray-900">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
          <h1 className="text-3xl font-bold tracking-tight">Support</h1>

          <div className="mt-8 text-sm leading-relaxed text-gray-700 space-y-4">
            <p>
              Need help with SmarterTraining, have a question, or run into a
              bug? We&apos;d like to hear from you.
            </p>
            <p>
              Email us at{' '}
              <a
                href="mailto:hello@smartertraining.ai"
                className="text-blue-600 underline"
              >
                hello@smartertraining.ai
              </a>{' '}
              and we&apos;ll get back to you as soon as we can.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
