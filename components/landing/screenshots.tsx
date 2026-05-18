import Image from 'next/image'

// TODO: Swap these placeholder SVGs for real App Store screenshots.
// Keep the same ~320x694 aspect ratio so the phone frame stays correct.
const screenshots = [
  {
    src: '/images/screenshot-1.svg',
    alt: "Today's workout: a recommended endurance ride sized to your day",
  },
  {
    src: '/images/screenshot-2.svg',
    alt: 'Daily check-in: energy, soreness, and available time',
  },
  {
    src: '/images/screenshot-3.svg',
    alt: 'Adaptive plan: this week adjusted after a missed session',
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
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16 tracking-tight">
          See it in action
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {screenshots.map((screenshot, index) => (
            <div key={index} className="flex justify-center">
              <div className="w-56 md:w-64">
                <PhoneFrame>
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={320}
                    height={694}
                    className="w-full h-auto"
                  />
                </PhoneFrame>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
