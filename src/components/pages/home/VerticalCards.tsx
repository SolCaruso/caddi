import { Container } from "@/components/ui/container"
import VerticalCardsContent from "@/components/pages/home/Client/VerticalCardsClient"

// Static data - stays on server
const cardData = [
  {
    bg: "/webm/divot-bg.webp",
    overlay: "/webm/birdeye.webp",
    label: "BIRD'S EYE MAPLE",
  },
  {
    bg: "/webm/divot-bg-2.webp",
    overlay: "/webm/zebrawood.webp",
    label: "ZEBRAWOOD",
  },
]

// Server Component - only handles layout and passes data
export default function VerticalCards() {
  return (
    <section className="w-full py-12 mb-12">
      <Container>
        <h2 className="text-caddi-blue text-3xl font-proxima-nova-extra-condensed font-bold mb-8">DIVOT TOOLS</h2>
      </Container>
      
      {/* Pass only data to the content component */}
      <VerticalCardsContent cardData={cardData} />
    </section>
  )
}
