import Image from 'next/image'

// Real App Store screenshots. The set walks through the daily loop:
// check in → share real-life context → get a plan that fits.
const screenshots = [
  {
    src: '/images/screen-checkin.png',
    width: 820,
    height: 1777,
    caption: 'Check in',
    description: 'A quick daily check-in — how you feel, your legs, your energy.',
    alt: "SmarterTraining check-in asking how you feel today, with Great, Good, Okay, and Bad options",
  },
  {
    src: '/images/screen-real-life.png',
    width: 820,
    height: 1782,
    caption: 'Add real-life context',
    description: 'Poor sleep, work stress, travel — the stuff that actually affects recovery.',
    alt: "SmarterTraining asking how life outside training is going, with options like poor sleep, work stress, travel, and sore legs",
  },
  {
    src: '/images/screen-adapts.png',
    width: 820,
    height: 1777,
    caption: 'Get a plan that fits',
    description: 'Your workout adjusts to the day — and to what is coming up next.',
    alt: "SmarterTraining today view showing workout feedback and upcoming travel that the plan adapts around",
  },
]

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="relative bg-[#1a1a1a] rounded-[3rem] p-3 shadow-xl">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-10" />
        <div className="relative rounded-[2.25rem] overflow-hidden bg-black">
          {children}
        </div>
      </div>
    </div>
  )
}

export function Screenshots() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4 tracking-tight">
          See it in action
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-xl mx-auto">
          A 30-second check-in is all it takes to get the right workout for
          today.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {screenshots.map((screenshot, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-56 md:w-64">
                <PhoneFrame>
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={screenshot.width}
                    height={screenshot.height}
                    className="w-full h-auto"
                  />
                </PhoneFrame>
              </div>
              <h3 className="mt-8 text-lg font-medium">{screenshot.caption}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground text-center max-w-[16rem] leading-relaxed">
                {screenshot.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
