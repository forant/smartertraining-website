// Entity (Smarter Foundry LLC) and contact addresses are confirmed current.
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
                With your permission, SmarterTraining may access health and
                fitness data — such as workouts, heart rate, or activity history
                — from Apple HealthKit, connected heart rate monitors, or other
                connected fitness services. We use this data to generate
                adaptive recommendations and workout planning,
                and to improve the Service.
              </p>
              <p>
                HealthKit and connected fitness data is used solely to provide
                and improve the Service. It is never sold, never shared with
                advertisers, and never used for advertising purposes.
              </p>
              <p>
                You can revoke HealthKit access at any time through the Settings
                app on your device.
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
            <p>
              Some recommendations are generated or adapted using automated
              systems and algorithmic processing, based on the information you
              provide and other data available to the Service.
            </p>
          </Section>

          <Section title="3. Analytics and Third-Party Services">
            <p>
              We use a small number of third-party services to help operate and
              improve the Service. These may include:
            </p>
            <List
              items={[
                'Analytics providers',
                'Cloud hosting and infrastructure',
                'Crash reporting and diagnostics',
                'AI and processing infrastructure used to generate and adapt recommendations',
              ]}
            />
            <p>
              These providers process data on our behalf, only as needed to
              perform their function, and operate under their own privacy
              policies.
            </p>
            <p>
              Because these providers operate in different locations, your data
              may be processed and stored in the United States or other
              jurisdictions where our service providers operate.
            </p>
          </Section>

          <Section title="4. We Do Not Sell Your Data">
            <p>
              SmarterTraining does not sell your personal information or your
              health and fitness data. We also do not share this data with
              advertisers or use it for advertising.
            </p>
          </Section>

          <Section title="5. Data Retention">
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

          <Section title="6. Data Security">
            <p>
              We use reasonable safeguards to protect your information,
              including secure transmission over HTTPS. However, no method of
              transmission or storage is completely secure, and we cannot
              guarantee absolute security.
            </p>
          </Section>

          <Section title="7. Children’s Privacy">
            <p>
              SmarterTraining is not intended for children under the age of 13,
              and we do not knowingly collect personal information from
              children.
            </p>
          </Section>

          <Section title="8. Your Rights and Choices">
            <p>
              You may request deletion of your app data at any time — within
              the App, or by contacting{' '}
              <a
                href="mailto:privacy@smartertraining.ai"
                className="text-blue-600 underline"
              >
                privacy@smartertraining.ai
              </a>
              . We will delete your data, though some limited information may be
              retained where required by law.
            </p>
            <p>
              You can also revoke health, fitness, or HealthKit permissions at
              any time through your device settings.
            </p>
          </Section>

          <Section title="9. Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time. If we make
              material changes, we will update the Effective Date above.
              Continued use of the Service after changes become effective
              constitutes acceptance of the updated Privacy Policy.
            </p>
          </Section>

          <Section title="10. Contact Us">
            <p>
              Email:{' '}
              <a
                href="mailto:privacy@smartertraining.ai"
                className="text-blue-600 underline"
              >
                privacy@smartertraining.ai
              </a>
            </p>
            <p>Company: Smarter Foundry LLC</p>
            <p>Website: smartertraining.ai</p>
          </Section>

          <Section title="11. Health and Fitness Disclaimer">
            <p>
              SmarterTraining provides informational training guidance, workout
              planning, and adaptive recommendations only. The Service is not a
              medical service and does not provide medical advice, diagnosis, or
              treatment.
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
