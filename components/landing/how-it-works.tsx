import { ClipboardList, Activity, RefreshCw } from 'lucide-react'

const steps = [
  {
    icon: ClipboardList,
    title: 'Tell it your context',
    description:
      'Check in with your energy, soreness, schedule, and available time.',
  },
  {
    icon: Activity,
    title: "Get today's best workout",
    description:
      'SmarterTraining recommends a session that fits your actual day.',
  },
  {
    icon: RefreshCw,
    title: 'Adapt as life changes',
    description:
      'Miss a workout, feel tired, or get extra time? Your plan adjusts.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-surface-light scroll-mt-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16 tracking-tight">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-background">
                <step.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
