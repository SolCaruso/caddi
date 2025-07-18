import { Container } from "@/components/ui/container"
import ForeCaddiContent from "./Client/ForeCaddiClient"

// Static data - stays on server
const slides = [
  {
    key: "how",
    label: "How it Works",
    image: "/webm/forecaddi.webp",
    heading: "GPS Precision Tracking.",
    subnav: ["How it Works", "Environmental", "Decision Maker", "Simplicity"],
    content: {
      title: "Understand the Technology",
      description:
        "Forecaddie combines advanced GPS tracking with your real-time input to deliver accurate, shot-by-shot recommendations.",
      details: ["Distance to your target", "Elevation changes (slope)", "Wind conditions", "Ball lie"],
      detailsBold: [0],
    },
  },
  {
    key: "environmental",
    label: "Environmental",
    image: "/webm/forecaddi.webp",
    heading: "Master Every Variable",
    subnav: ["How it Works", "Environmental", "Decision Maker", "Simplicity"],
    content: {
      title: "Environmental Conditions",
      description: "Forecaddie adapts to live weather and terrain data so your shot recommendations stay razor-sharp.",
      details: [
        "Wind speed & direction",
        "Slope and elevation changes",
        "Temperature and weather impacts",
        "Ball lie and turf conditions",
      ],
      detailsBold: [],
    },
  },
  {
    key: "decision",
    label: "Decision Maker",
    image: "/webm/forecaddi.webp",
    heading: "Take the Guesswork Out",
    subnav: ["How it Works", "Environmental", "Decision Maker", "Simplicity"],
    content: {
      title: "Decision Maker",
      description:
        "Forecaddie acts as your personal caddie—distilling complex factors into clear club and shot guidance.",
      details: [
        "Personalized club recommendations",
        "Clear shot-type guidance (full, chip, pitch)",
        "Adjustments for wind and slope",
        "Confidence-boosting insights",
      ],
      detailsBold: [],
    },
  },
  {
    key: "simplicity",
    label: "Simplicity",
    image: "/webm/forecaddi.webp",
    heading: "One Swing at a Time",
    subnav: ["How it Works", "Environmental", "Decision Maker", "Simplicity"],
    content: {
      title: "Shot-by-Shot Simplicity",
      description:
        "Forecaddie's stateless design resets after each use so you can concentrate on your next shot without distractions.",
      details: [
        "Quick, one-step input",
        "Clean, intuitive interface",
        "Instant feedback on every shot",
        "Stateless resets after each recommendation",
      ],
      detailsBold: [],
    },
  },
]

// Server Component - only handles layout and passes data
export default function ForeCaddi() {
  return (
    <section className="w-full flex justify-center flex-col pt-12 pb-30 bg-white">
      <Container>
        <div className="mx-auto w-full">
          <h2 className="text-caddi-blue text-3xl font-proxima-nova-extra-condensed font-bold mb-8 uppercase">
            Forecaddie Golf App
          </h2>
        </div>

        <div className="w-full rounded-lg md:rounded-xl bg-caddi-light pt-6 pb-16 xs:pt-12 xs:pb-20 sm:pt-18 sm:pb-24 sm:px-8 lg:px-12 flex flex-col items-center mx-auto relative">
          {/* Pass only data to the content component */}
          <ForeCaddiContent slides={slides} />
        </div>
      </Container>
    </section>
  )
}
