// TODO: Legal copy below is a reasonable placeholder for App Store submission.
// Confirm the operating entity name, governing law, and contact addresses with legal before launch.
import { Footer } from '@/components/landing/footer'

export const metadata = {
  title: 'Terms of Service | SmarterTraining',
  description: 'Terms of Service for SmarterTraining',
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-700">
        {children}
      </div>
    </section>
  )
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

export default function TermsPage() {
  return (
    <>
      <main className="min-h-screen bg-white text-gray-900">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Terms of Service for SmarterTraining
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Effective Date: May 18, 2026
          </p>

          <div className="mt-8 text-sm leading-relaxed text-gray-700 space-y-4">
            <p>
              SmarterTraining is operated by Smarter Foundry LLC
              (“SmarterTraining,” “we,” “our,” or “us”). Smarter Foundry LLC
              provides adaptive training recommendations and coaching tools
              through the SmarterTraining mobile application and website (the
              “Service”).
            </p>
            <p>
              By using the Service, you agree to these Terms of Service
              (“Terms”). If you do not agree, please do not use the Service.
            </p>
          </div>

          <Section title="1. Use of the Service">
            <p>
              You agree to use SmarterTraining only for lawful purposes and in
              accordance with these Terms.
            </p>
            <p>You must not:</p>
            <List
              items={[
                'Use the Service in any way that violates applicable laws or regulations',
                'Attempt to interfere with or disrupt the Service',
                'Reverse engineer or attempt to extract source code',
              ]}
            />
          </Section>

          <Section title="2. No Medical or Professional Advice">
            <p>
              SmarterTraining provides general training and fitness information
              for informational purposes only.
            </p>
            <p className="font-medium text-gray-900">
              The Service does not provide medical advice, diagnosis, or
              treatment.
            </p>
            <p>
              You should consult a qualified healthcare provider before
              beginning or significantly changing any exercise program,
              particularly if you have any health conditions or concerns. You
              should not rely on the Service as a substitute for professional
              medical or coaching advice.
            </p>
          </Section>

          <Section title="3. Assumption of Risk">
            <p>
              Physical exercise carries inherent risks, including the risk of
              injury. SmarterTraining recommends workouts and training loads
              based on the information you provide and data available to it,
              but it cannot account for every individual factor.
            </p>
            <p>
              You are responsible for exercising within your own limits, using
              proper technique, and stopping any activity that causes pain or
              discomfort. You participate in any recommended activity at your
              own risk.
            </p>
          </Section>

          <Section title="4. Accuracy of Information">
            <p>
              We strive to provide helpful and well-reasoned recommendations,
              but training guidance is generated from available data and
              internal logic. We do not guarantee the accuracy, completeness,
              or suitability of any recommendation for your specific situation.
            </p>
          </Section>

          <Section title="5. Privacy">
            <p>
              Your use of the Service is also governed by our{' '}
              <a href="/privacy" className="text-blue-600 underline">
                Privacy Policy
              </a>
              .
            </p>
          </Section>

          <Section title="6. Intellectual Property">
            <p>
              All content, features, and functionality of the Service —
              including text, graphics, logos, and software — are owned by
              SmarterTraining or its licensors and are protected by applicable
              laws. You may not copy, modify, distribute, or create derivative
              works without our permission.
            </p>
          </Section>

          <Section title="7. Third-Party Data and Services">
            <p>
              SmarterTraining may rely on third-party services and connected
              data sources for activity and fitness information. We are not
              responsible for the accuracy or availability of third-party data.
            </p>
          </Section>

          <Section title="8. Disclaimer of Warranties">
            <p>
              The Service is provided “as is” and “as available” without
              warranties of any kind, express or implied.
            </p>
            <p>We do not guarantee that:</p>
            <List
              items={[
                'The Service will be uninterrupted or error-free',
                'Results or insights will meet your expectations',
              ]}
            />
          </Section>

          <Section title="9. Limitation of Liability">
            <p>
              To the fullest extent permitted by law, SmarterTraining shall not
              be liable for any indirect, incidental, or consequential damages
              arising from your use of the Service. Your use of the Service is
              at your own risk.
            </p>
          </Section>

          <Section title="10. Changes to These Terms">
            <p>
              We may update these Terms from time to time. We will update the
              Effective Date when changes are made. Continued use of the
              Service constitutes acceptance of the updated Terms.
            </p>
          </Section>

          <Section title="11. Termination">
            <p>
              We reserve the right to suspend or terminate access to the
              Service at any time, without notice, for any reason.
            </p>
          </Section>

          <Section title="12. Governing Law">
            <p>
              These Terms are governed by the laws of the State of California,
              without regard to conflict of law principles.
            </p>
          </Section>

          <Section title="13. Contact Us">
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p>
              Email: hello@smartertraining.ai
              <br />
              Website: smartertraining.ai
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  )
}
