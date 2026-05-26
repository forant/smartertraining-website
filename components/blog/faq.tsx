import type { FAQ } from '@/lib/blog/types'

export function FaqSection({
  faqs,
  heading = 'Frequently asked questions',
}: {
  faqs: FAQ[]
  heading?: string
}) {
  if (faqs.length === 0) return null
  return (
    <section aria-labelledby="faq-heading" className="mt-16">
      <h2
        id="faq-heading"
        className="text-2xl font-semibold tracking-tight"
      >
        {heading}
      </h2>
      <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
        {faqs.map((f, i) => (
          <div key={i} className="p-5">
            <dt className="font-medium text-foreground">{f.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {f.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
