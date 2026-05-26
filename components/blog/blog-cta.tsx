import { WaitlistForm } from '@/components/landing/waitlist-form'

export function BlogCTA({
  heading = 'Train smarter, not more',
  body = 'SmarterTraining builds a cycling plan that adapts to your fatigue, schedule, and goals — so a missed workout never derails the week. Join the waitlist for an invite when we launch.',
}: {
  heading?: string
  body?: string
}) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="mt-16 rounded-2xl border border-border bg-surface-light p-8 md:p-10"
    >
      <div className="max-w-2xl mx-auto text-center space-y-5">
        <h2
          id="cta-heading"
          className="text-2xl md:text-3xl font-semibold tracking-tight"
        >
          {heading}
        </h2>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          {body}
        </p>
        <div className="flex justify-center pt-2">
          <WaitlistForm />
        </div>
      </div>
    </section>
  )
}
