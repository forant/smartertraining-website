import { Gauge, Users, MessageSquare, HeartHandshake } from 'lucide-react'

const benefits = [
  {
    icon: Gauge,
    text: 'Adapts to fatigue, soreness, and schedule changes',
  },
  {
    icon: Users,
    text: 'Built for busy amateur athletes',
  },
  {
    icon: MessageSquare,
    text: 'Clear coaching, not data overload',
  },
  {
    icon: HeartHandshake,
    text: 'Training guidance without guilt',
  },
]

export function WhyDifferent() {
  return (
    <section className="py-20 md:py-28 bg-surface-light">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Why it&apos;s different
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Most training plans assume perfect weeks. SmarterTraining is built
            for real ones.
          </p>
          <div className="pt-6 space-y-5 max-w-md mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-background flex items-center justify-center">
                  <benefit.icon
                    className="w-5 h-5 text-primary"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-base md:text-lg font-medium text-left">
                  {benefit.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
