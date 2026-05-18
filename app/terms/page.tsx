// Entity (Smarter Foundry LLC), governing law (California), and contact
// addresses are confirmed current.
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
              SmarterTraining is a product of Smarter Foundry LLC (“Smarter
              Foundry,” “we,” “our,” or “us”). We provide adaptive training
              guidance, workout planning tools, and fitness recommendations
              through the SmarterTraining mobile app and website (the
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

          <Section title="2. Eligibility">
            <p>
              You must be at least 13 years old to use the Service. By using
              SmarterTraining, you confirm that you meet this age requirement.
            </p>
          </Section>

          <Section title="3. No Medical or Professional Advice">
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
              medical, fitness, or coaching advice.
            </p>
          </Section>

          <Section title="4. Assumption of Risk">
            <p>
              Physical exercise carries inherent risks, including the risk of
              injury. SmarterTraining suggests workouts and training loads based
              on the information you provide and data available to it, but it
              cannot account for every individual factor.
            </p>
            <p>
              You are responsible for exercising within your own limits, using
              proper technique, and stopping any activity that causes pain or
              discomfort. You are also responsible for adjusting workout
              intensity and volume based on your own experience, fitness level,
              and recovery. You participate in any suggested activity at your
              own risk.
            </p>
          </Section>

          <Section title="5. Training Guidance and Automated Recommendations">
            <p>
              Workouts, plans, and fitness recommendations in the Service may be
              generated algorithmically or by automated systems, based on the
              information you provide and other data available to the Service.
            </p>
            <p>
              These recommendations are general training guidance, not
              individualized professional coaching. We aim to make them helpful
              and sensible, but we do not guarantee the accuracy, completeness,
              or suitability of any recommendation for your specific situation.
              Use your own judgment.
            </p>
          </Section>

          <Section title="6. Subscriptions and Billing">
            <p>
              SmarterTraining may offer optional paid subscriptions that unlock
              additional features. Subscriptions are purchased and billed
              through your Apple App Store account.
            </p>
            <p>
              Unless you cancel beforehand, subscriptions renew automatically at
              the end of each billing period, and your Apple account is charged
              for the renewal. You can manage or cancel a subscription at any
              time in your Apple account settings; cancellation takes effect at
              the end of the current billing period.
            </p>
            <p>
              Payments and refunds are handled by Apple and are subject to
              Apple’s terms and policies.
            </p>
          </Section>

          <Section title="7. Account and Data Deletion">
            <p>
              You may request deletion of your account and associated data at
              any time — within the app, or by emailing{' '}
              <a
                href="mailto:privacy@smartertraining.ai"
                className="text-blue-600 underline"
              >
                privacy@smartertraining.ai
              </a>
              . Our{' '}
              <a href="/privacy" className="text-blue-600 underline">
                Privacy Policy
              </a>{' '}
              explains what we collect and how deletion works.
            </p>
          </Section>

          <Section title="8. Privacy">
            <p>
              Your use of the Service is also governed by our{' '}
              <a href="/privacy" className="text-blue-600 underline">
                Privacy Policy
              </a>
              .
            </p>
          </Section>

          <Section title="9. Intellectual Property">
            <p>
              All content, features, and functionality of the Service —
              including text, graphics, logos, and software — are owned by
              Smarter Foundry LLC or its licensors and are protected by
              applicable laws. You may not copy, modify, distribute, or create
              derivative works without our permission.
            </p>
          </Section>

          <Section title="10. Third-Party Data and Services">
            <p>
              SmarterTraining may rely on third-party services and connected
              data sources for activity and fitness information. We are not
              responsible for the accuracy or availability of third-party data.
            </p>
          </Section>

          <Section title="11. Disclaimer of Warranties">
            <p>
              The Service is provided “as is” and “as available” without
              warranties of any kind, express or implied. Smarter Foundry LLC
              and its affiliates do not guarantee that the Service will be
              uninterrupted or error-free, or that results or insights will meet
              your expectations.
            </p>
          </Section>

          <Section title="12. Limitation of Liability">
            <p>
              To the fullest extent permitted by law, Smarter Foundry LLC and
              its affiliates shall not be liable for any indirect, incidental,
              or consequential damages arising from your use of the Service.
              Your use of the Service is at your own risk.
            </p>
          </Section>

          <Section title="13. Changes to These Terms">
            <p>
              We may update these Terms from time to time. We will update the
              Effective Date when changes are made. Continued use of the
              Service constitutes acceptance of the updated Terms.
            </p>
          </Section>

          <Section title="14. Termination">
            <p>
              We reserve the right to suspend or terminate access to the
              Service at any time, without notice, for any reason.
            </p>
          </Section>

          <Section title="15. Governing Law">
            <p>
              These Terms are governed by the laws of the State of California,
              without regard to conflict of law principles.
            </p>
          </Section>

          <Section title="16. Contact Us">
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
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
