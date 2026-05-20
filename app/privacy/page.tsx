// Entity (Smarter Foundry LLC), governing law (California), and contact
// addresses are confirmed current.
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

function BulletList({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-5 space-y-1">{children}</ul>
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-medium text-gray-900">{children}</strong>
}

function PrivacyEmail() {
  return (
    <a
      href="mailto:privacy@smartertraining.ai"
      className="text-blue-600 underline"
    >
      privacy@smartertraining.ai
    </a>
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
            Effective Date: May 20, 2026
          </p>

          <div className="mt-8 text-sm leading-relaxed text-gray-700 space-y-4">
            <p>
              SmarterTraining is operated by <Strong>Smarter Foundry LLC</Strong>{' '}
              (“SmarterTraining,” “we,” “our,” or “us”), a California limited
              liability company. This Privacy Policy explains how we collect,
              use, share, and protect your information when you use the
              SmarterTraining mobile application (the “App”) and website
              (collectively, the “Service”).
            </p>
            <p>
              By using the Service, you agree to the practices described in
              this Privacy Policy.
            </p>
          </div>

          <Section title="1. Information We Collect">
            <SubSection title="a. Information You Provide">
              <p>When you use the Service, you may provide:</p>
              <BulletList>
                <li>
                  <Strong>Sign in with Apple credentials.</Strong> If you sign
                  in, Apple sends us a unique Apple user identifier. You may
                  also choose to share your name and email address; if you use
                  Apple’s Hide My Email relay, we receive only the relay
                  address.
                </li>
                <li>
                  <Strong>Email address</Strong> if you join our waitlist,
                  contact us, or contact support.
                </li>
                <li>
                  <Strong>Training profile.</Strong> Your fitness state,
                  training goals, available training time, frequency, equipment,
                  and (optionally) cycling FTP.
                </li>
                <li>
                  <Strong>Daily check-ins.</Strong> Your overall feel, leg
                  state, motivation, time available, contextual flags (such as
                  poor sleep, getting sick, high stress), and any cross-sport
                  activities you log.
                </li>
                <li>
                  <Strong>Workouts you complete, skip, modify, or log.</Strong>{' '}
                  Including title, duration, type, subtype, structure, and your
                  feedback.
                </li>
                <li>
                  <Strong>Coach Notes.</Strong> Persistent freeform context you
                  write to help your coach adapt your training, plus optional
                  tags.
                </li>
                <li>
                  <Strong>Post-workout reflections.</Strong> Your responses to
                  coach check-in prompts and any optional follow-up notes.
                </li>
                <li>
                  <Strong>Upcoming context.</Strong> Future events you log
                  (e.g., big rides, travel, recovery periods).
                </li>
                <li>
                  <Strong>Subscription state.</Strong> We rely on Apple’s
                  StoreKit to manage your subscription. We see your entitlement
                  status only; we never see or store your payment information.
                </li>
              </BulletList>
            </SubSection>

            <SubSection title="b. Health and Fitness Data">
              <p>
                With your permission, the Service may access health and fitness
                data — such as workouts, heart rate, power, cadence, and
                activity history — from <Strong>Apple HealthKit</Strong>,
                connected <Strong>Bluetooth heart-rate monitors</Strong>, and{' '}
                <Strong>Bluetooth indoor trainers</Strong> (FTMS).
              </p>
              <p>Specifically:</p>
              <BulletList>
                <li>
                  <Strong>HealthKit reads:</Strong> heart-rate samples during
                  workouts.
                </li>
                <li>
                  <Strong>HealthKit writes:</Strong> completed workout sessions,
                  so your fitness data stays in one place.
                </li>
                <li>
                  <Strong>Bluetooth peripherals:</Strong> real-time power,
                  cadence, and heart-rate values from your trainer and HRM
                  during active workouts.
                </li>
              </BulletList>
              <p>
                When you complete a workout, the recorded workout data —
                including heart rate, power, cadence, duration, and any
                feedback or reflection you provide — is transmitted to our
                backend so we can:
              </p>
              <BulletList>
                <li>Sync your training history across your devices,</li>
                <li>Generate adaptive coaching recommendations,</li>
                <li>
                  Produce post-workout reflections and “likely tomorrow”
                  guidance.
                </li>
              </BulletList>
              <p className="font-medium text-gray-900">
                HealthKit-sourced data is used solely to provide and improve
                the Service. We never use HealthKit data for advertising, never
                share it with advertisers, never sell it, and never share it
                with third parties for marketing purposes.
              </p>
              <p>
                You can revoke HealthKit access at any time in the Settings app
                on your device.
              </p>
            </SubSection>

            <SubSection title="c. Automatically Collected Information">
              <p>When you use the App, we automatically collect:</p>
              <BulletList>
                <li>
                  <Strong>Device information</Strong> (device model, operating
                  system version, app version, locale).
                </li>
                <li>
                  <Strong>Usage data</Strong> (which features you interact
                  with, how often, and session-level metadata such as
                  duration).
                </li>
                <li>
                  <Strong>Diagnostic data</Strong> (crash reports, error logs,
                  and performance traces).
                </li>
              </BulletList>
              <p>
                Once you sign in with Apple, this information is associated
                with your account. Before sign-in, this information is
                associated with a temporary pseudonymous identifier on your
                device.
              </p>
            </SubSection>

            <SubSection title="d. Information We Do NOT Collect">
              <p>
                For clarity, we do <Strong>not</Strong> collect:
              </p>
              <BulletList>
                <li>Precise or coarse location data.</li>
                <li>Your contacts, photos, or microphone input.</li>
                <li>Advertising identifiers (IDFA).</li>
                <li>Browsing history outside the Service.</li>
                <li>
                  Payment information (handled exclusively by Apple’s
                  StoreKit).
                </li>
              </BulletList>
            </SubSection>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use your information to:</p>
            <BulletList>
              <li>Provide, operate, and maintain the Service.</li>
              <li>
                Generate adaptive workout recommendations and tier-aware
                progression.
              </li>
              <li>
                Adjust your plan based on your check-in, recent training load,
                recovery state, and Coach Notes.
              </li>
              <li>
                Produce post-workout reflections, “likely tomorrow” previews,
                and execution guidance.
              </li>
              <li>
                Personalize your coaching experience based on your goals,
                training approach, and history.
              </li>
              <li>Sync your data across your devices when you are signed in.</li>
              <li>
                Analyze usage to improve features, performance, and
                recommendation quality.
              </li>
              <li>Respond to feedback and support requests.</li>
              <li>
                Detect, prevent, or address security incidents, technical
                issues, and abuse.
              </li>
            </BulletList>
            <p>
              Some recommendations, reflections, and coaching explanations are
              generated using automated systems and algorithmic processing,
              including large language models operated by third-party AI
              providers (see Section 3).
            </p>
          </Section>

          <Section title="3. Third-Party Service Providers">
            <p>
              We use a small number of third-party processors to operate the
              Service. Each processor handles data on our behalf, under
              contract, only for the purpose of providing their function:
            </p>
            <div className="-mx-4 sm:mx-0 overflow-x-auto">
              <table className="min-w-full text-xs sm:text-sm border border-gray-200 rounded-md">
                <thead className="bg-gray-50 text-left text-[11px] font-semibold text-gray-700 uppercase tracking-wide">
                  <tr>
                    <th className="px-3 py-2 border-b border-gray-200 align-top">
                      Provider
                    </th>
                    <th className="px-3 py-2 border-b border-gray-200 align-top">
                      Purpose
                    </th>
                    <th className="px-3 py-2 border-b border-gray-200 align-top">
                      What they receive
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 align-top">
                  <tr className="border-b border-gray-100">
                    <td className="px-3 py-2">
                      <Strong>Apple</Strong> (Sign in with Apple, HealthKit,
                      StoreKit, Push Notifications)
                    </td>
                    <td className="px-3 py-2">
                      Identity, health data access, subscriptions, notifications
                    </td>
                    <td className="px-3 py-2">
                      Apple user identifier; HealthKit access remains on your
                      device
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-3 py-2">
                      <Strong>Mixpanel, Inc.</Strong>
                    </td>
                    <td className="px-3 py-2">Product analytics</td>
                    <td className="px-3 py-2">
                      Pseudonymous (and, post-sign-in, identified) usage events
                      and device metadata
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-3 py-2">
                      <Strong>Sentry</Strong> (Functional Software, Inc.)
                    </td>
                    <td className="px-3 py-2">
                      Crash and performance diagnostics
                    </td>
                    <td className="px-3 py-2">
                      Crash logs, performance traces, and your Apple user
                      identifier (after sign-in)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-3 py-2">
                      <Strong>OpenAI, L.L.C.</Strong>
                    </td>
                    <td className="px-3 py-2">
                      AI generation of post-workout reflections and “why this”
                      coaching explanations
                    </td>
                    <td className="px-3 py-2">
                      Workout context (subtype, duration, recent feedback,
                      memory summary); your Apple user identifier is forwarded
                      as an opaque ID
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-3 py-2">
                      <Strong>Strava, Inc.</Strong>
                    </td>
                    <td className="px-3 py-2">
                      Optional workout sharing, only when you tap “Share to
                      Strava”
                    </td>
                    <td className="px-3 py-2">
                      Completed workout file (TCX) with HR, power, cadence;
                      title; description
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">
                      <Strong>Smarter Foundry LLC’s own backend infrastructure</Strong>
                    </td>
                    <td className="px-3 py-2">
                      Sync, AI orchestration, account management
                    </td>
                    <td className="px-3 py-2">
                      All data you provide or generate in the App while signed
                      in
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              These providers operate in the <Strong>United States</Strong> and
              may store or process data in other jurisdictions where their
              infrastructure is hosted. Each operates under their own privacy
              policy. We choose providers that contractually commit to
              processing data only for our specified purposes.
            </p>
            <p>
              When you tap <Strong>Share to Strava</Strong>, your workout data
              is transmitted directly to your own Strava account. Strava’s
              handling of that data is governed by Strava’s privacy policy.
            </p>
          </Section>

          <Section title="4. AI Processing Notice">
            <p>
              Some Service features rely on third-party AI providers (currently
              OpenAI) to generate personalized coaching content. When you
              complete a workout or check in, anonymized workout context — such
              as workout type, recent training history, your feedback, and
              (where relevant) free-form notes you have written — is sent to
              OpenAI to generate reflection and recommendation text.
            </p>
            <p>
              Under OpenAI’s API data usage policies, API data submitted
              through the API is not used to train OpenAI models.
            </p>
            <p>
              We do not send your real name, email address, or contact
              information to OpenAI.
            </p>
          </Section>

          <Section title="5. We Do Not Sell or Share Your Data for Advertising">
            <p>
              SmarterTraining does <Strong>not</Strong> sell your personal
              information or your health and fitness data within the meaning of
              the California Consumer Privacy Act (CCPA / CPRA). We also do
              not share your data with advertisers, do not participate in
              cross-context behavioral advertising, and do not allow
              third-party advertising SDKs in the App.
            </p>
          </Section>

          <Section title="6. Data Retention">
            <p>We retain your data only as long as is necessary to:</p>
            <BulletList>
              <li>Provide the Service’s functionality.</li>
              <li>
                Maintain your training history, preferences, and coaching
                continuity.
              </li>
              <li>Comply with legal obligations.</li>
              <li>Resolve disputes and enforce our agreements.</li>
            </BulletList>
            <p>
              When you delete your account (see Section 8), we permanently
              delete or anonymize your data within 30 days, except where
              retention is required by law (such as tax records related to your
              subscription).
            </p>
          </Section>

          <Section title="7. Data Security">
            <p>
              We use reasonable safeguards to protect your information,
              including:
            </p>
            <BulletList>
              <li>
                <Strong>HTTPS / TLS</Strong> for all communications between the
                App and our backend.
              </li>
              <li>
                <Strong>Apple Keychain</Strong> for storing sensitive
                credentials such as Strava OAuth tokens.
              </li>
              <li>
                <Strong>Access controls</Strong> limiting which Smarter Foundry
                personnel can access systems holding your data.
              </li>
            </BulletList>
            <p>
              No method of transmission or storage is completely secure, and we
              cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="8. Your Rights and Choices">
            <SubSection title="Everyone">
              <BulletList>
                <li>
                  <Strong>Delete your account.</Strong> You can delete your
                  account and all associated data at any time inside the App
                  (Settings → Delete Account) or by emailing <PrivacyEmail />.
                </li>
                <li>
                  <Strong>Revoke permissions.</Strong> You can revoke HealthKit,
                  Bluetooth, and Notification permissions at any time in your
                  device’s Settings app.
                </li>
                <li>
                  <Strong>Disconnect Strava.</Strong> You can disconnect Strava
                  in the App at any time; this stops future uploads.
                </li>
              </BulletList>
            </SubSection>

            <SubSection title="California Residents (CCPA / CPRA)">
              <p>You have the right to:</p>
              <BulletList>
                <li>
                  <Strong>Know</Strong> what categories of personal information
                  we collect, the sources, the purposes, and the third parties
                  we share with.
                </li>
                <li>
                  <Strong>Access</Strong> the specific pieces of personal
                  information we hold about you.
                </li>
                <li>
                  <Strong>Correct</Strong> inaccurate personal information.
                </li>
                <li>
                  <Strong>Delete</Strong> your personal information.
                </li>
                <li>
                  <Strong>Opt out of “sale” or “sharing”</Strong> — though, as
                  noted, we do not sell or share for cross-context behavioral
                  advertising.
                </li>
                <li>
                  <Strong>Limit use of sensitive personal information.</Strong>{' '}
                  Health and fitness data is sensitive personal information
                  under CPRA; we only use it to provide the Service.
                </li>
                <li>
                  <Strong>Non-discrimination</Strong> for exercising any of
                  these rights.
                </li>
              </BulletList>
              <p>
                To exercise any of these rights, email{' '}
                <Strong>
                  <PrivacyEmail />
                </Strong>
                . We will verify your identity (typically by asking you to sign
                in to the App) and respond within 45 days.
              </p>
            </SubSection>

            <SubSection title="Residents of the EU, UK, EEA, and Switzerland (GDPR / UK GDPR)">
              <p>You have the right to:</p>
              <BulletList>
                <li>
                  <Strong>Access</Strong> the personal data we hold about you.
                </li>
                <li>
                  <Strong>Rectification</Strong> of inaccurate personal data.
                </li>
                <li>
                  <Strong>Erasure</Strong> (“right to be forgotten”).
                </li>
                <li>
                  <Strong>Restriction</Strong> of processing.
                </li>
                <li>
                  <Strong>Data portability</Strong> — receive your data in a
                  machine-readable format.
                </li>
                <li>
                  <Strong>Object</Strong> to processing based on legitimate
                  interests, including profiling.
                </li>
                <li>
                  <Strong>Withdraw consent</Strong> for any processing based on
                  your consent.
                </li>
                <li>
                  <Strong>Lodge a complaint</Strong> with your local data
                  protection authority.
                </li>
              </BulletList>
              <p>The legal bases on which we process your data are:</p>
              <BulletList>
                <li>
                  <Strong>Performance of a contract</Strong> (delivering the
                  Service you signed up for).
                </li>
                <li>
                  <Strong>Legitimate interests</Strong> (improving the Service,
                  preventing abuse).
                </li>
                <li>
                  <Strong>Consent</Strong> (HealthKit, Bluetooth access,
                  marketing emails if applicable).
                </li>
                <li>
                  <Strong>Legal obligation</Strong> (tax, regulatory).
                </li>
              </BulletList>
              <p>
                To exercise any of these rights, email{' '}
                <Strong>
                  <PrivacyEmail />
                </Strong>
                .
              </p>
            </SubSection>

            <SubSection title="International Data Transfers">
              <p>
                Because our service providers operate in the United States,
                your data may be transferred outside your country. Where
                required by law (for example, for transfers from the EU), we
                rely on <Strong>Standard Contractual Clauses</Strong> or other
                approved transfer mechanisms.
              </p>
            </SubSection>
          </Section>

          <Section title="9. Children’s Privacy">
            <p>
              The Service is not intended for children under the age of 13 (or
              under 16 in the EU/UK, where stricter consent rules apply). We do
              not knowingly collect personal information from children. If you
              believe a child has provided us with personal information,
              contact <PrivacyEmail /> and we will delete it.
            </p>
          </Section>

          <Section title="10. Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time. If we make
              material changes, we will:
            </p>
            <BulletList>
              <li>
                Update the <Strong>Effective Date</Strong> at the top of this
                page.
              </li>
              <li>
                Notify you in the App and/or by email (if you have provided
                one) at least 7 days before the changes take effect.
              </li>
            </BulletList>
            <p>
              Continued use of the Service after changes take effect
              constitutes acceptance of the updated Privacy Policy.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>
              <Strong>Email:</Strong> <PrivacyEmail />
            </p>
            <p>
              <Strong>Company:</Strong> Smarter Foundry LLC
            </p>
            <p>
              <Strong>Website:</Strong> smartertraining.ai
            </p>
            <p>
              For California residents exercising CCPA rights, you may also
              designate an authorized agent in writing.
            </p>
          </Section>

          <Section title="12. Health and Fitness Disclaimer">
            <p>
              SmarterTraining provides informational training guidance, workout
              planning, and adaptive recommendations only. The Service is not a
              medical service and does not provide medical advice, diagnosis,
              or treatment.
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
