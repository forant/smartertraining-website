// TODO: Legal copy below is a reasonable placeholder for App Store submission.
// Confirm the operating entity name and contact addresses with legal before launch.
import { Footer } from '@/components/landing/footer'

export const metadata = {
  title: 'Privacy Policy | SmarterTraining',
  description: 'Privacy Policy for SmarterTraining',
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

function SubSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mt-6">
      <h3 className="text-base font-medium">{title}</h3>
      <div className="mt-2 space-y-3">{children}</div>
    </div>
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

export default function PrivacyPage() {
  return (
    <>
      <main className="min-h-screen bg-white text-gray-900">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Privacy Policy for SmarterTraining
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            Effective Date: May 18, 2026
          </p>

          <div className="mt-8 text-sm leading-relaxed text-gray-700 space-y-4">
            <p>
              SmarterTraining is operated by Smarter Foundry LLC
              (“SmarterTraining,” “we,” “our,” or “us”). This Privacy Policy
              explains how we collect, use, and protect your information when
              you use the SmarterTraining mobile application (the “App”) and
              website (collectively, the “Service”).
            </p>
            <p>
              By using the Service, you agree to the practices described in
              this Privacy Policy.
            </p>
          </div>

          <Section title="1. Information We Collect">
            <SubSection title="a. Information You Provide">
              <p>
                We may collect information you voluntarily provide, including:
              </p>
              <List
                items={[
                  'Email address (for the waitlist, early access, or if you contact us)',
                  'Training goals and preferences (for example, target events or weekly availability)',
                  'Check-in inputs such as energy, soreness, stress, sleep, and available time',
                  'Workouts you complete, skip, log, or modify',
                  'Feedback submitted through the App',
                ]}
              />
            </SubSection>

            <SubSection title="b. Health and Fitness Data">
              <p>
                With your permission, SmarterTraining may access fitness and
                activity data — such as workouts, heart rate, or training
                history — from your device or connected services in order to
                generate and adapt your training recommendations.
              </p>
              <p>
                Health and fitness data is used only to provide and improve the
                Service. We do not sell this data, and we do not use it for
                advertising.
              </p>
            </SubSection>

            <SubSection title="c. Automatically Collected Information">
              <p>
                We may automatically collect certain information, including:
              </p>
              <List
                items={[
                  'Device information (such as device type and operating system)',
                  'Usage data (such as features used and session duration)',
                  'Diagnostic data (such as crash logs)',
                  'Anonymous or pseudonymous identifiers associated with your device',
                ]}
              />
            </SubSection>

            <SubSection title="d. Device-Linked Data">
              <p>
                We may associate certain data, such as your training history,
                check-ins, and preferences, with a device identifier. This
                allows us to provide a personalized plan without requiring a
                user account.
              </p>
              <p>
                This data is not directly linked to your identity, such as your
                name, email address, or phone number, unless you provide it.
              </p>
            </SubSection>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use your information to:</p>
            <List
              items={[
                'Provide, operate, and improve the Service',
                'Generate, schedule, and adapt training recommendations',
                'Adjust your plan based on fatigue, soreness, schedule changes, and check-ins',
                'Personalize your experience based on your goals and preferences',
                'Analyze usage to improve features, performance, and recommendation quality',
                'Respond to feedback and support requests',
                'Detect, prevent, or address technical issues and abuse of the Service',
              ]}
            />
          </Section>

          <Section title="3. Analytics and Third-Party Services">
            <p>
              We use third-party services to help operate and improve the
              Service. These services may process data on our behalf and
              operate under their own privacy policies. These may include
              analytics providers, AI and processing services used to generate
              and adapt recommendations, and cloud infrastructure and hosting
              providers.
            </p>
          </Section>

          <Section title="4. Data Retention">
            <p>We retain your data only as long as necessary to:</p>
            <List
              items={[
                'Provide the Service’s functionality',
                'Maintain your training history, preferences, and recommendation quality',
                'Comply with legal obligations',
                'Improve and support the Service',
              ]}
            />
          </Section>

          <Section title="5. Data Security">
            <p>
              We use reasonable safeguards to protect your information,
              including secure transmission over HTTPS. However, no method of
              transmission or storage is completely secure, and we cannot
              guarantee absolute security.
            </p>
          </Section>

          <Section title="6. Children’s Privacy">
            <p>
              SmarterTraining is not intended for children under the age of 13,
              and we do not knowingly collect personal information from
              children.
            </p>
          </Section>

          <Section title="7. Your Rights and Choices">
            <p>
              You may request deletion of your data at any time. You can also
              revoke health and fitness data permissions through your device
              settings at any time.
            </p>
            <p>
              Contact:{' '}
              <a
                href="mailto:hello@smartertraining.ai"
                className="text-blue-600 underline"
              >
                hello@smartertraining.ai
              </a>
            </p>
          </Section>

          <Section title="8. Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time. If we make
              material changes, we will update the Effective Date above.
              Continued use of the Service after changes become effective
              constitutes acceptance of the updated Privacy Policy.
            </p>
          </Section>

          <Section title="9. Contact Us">
            <p>
              Email:{' '}
              <a
                href="mailto:hello@smartertraining.ai"
                className="text-blue-600 underline"
              >
                hello@smartertraining.ai
              </a>
            </p>
            <p>Company: Smarter Foundry LLC</p>
            <p>Website: smartertraining.ai</p>
          </Section>

          <Section title="10. Health and Fitness Disclaimer">
            <p>
              SmarterTraining provides informational training recommendations,
              workout suggestions, and adaptive coaching only. The Service is
              not a medical service and does not provide medical advice,
              diagnosis, or treatment.
            </p>
            <p>
              You should consult a qualified healthcare professional before
              beginning or significantly changing any exercise program,
              particularly if you have any health conditions or concerns.
              Exercise carries inherent risks, and you participate in any
              recommended activity at your own risk.
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  )
}
