import { Container } from "@/components/ui/container"
import VerticalCardsContent from "@/components/pages/home/Client/VerticalCardsClient"

// Static data - stays on server
const cardData = [
  {
    bg: "/MOV/caddi.MOV",
    overlay: "/webm/trophy.webp",
    label: "BIRD'S EYE MAPLE",
  },
  {
    bg: "/webm/divot-bg-2.webp",
    overlay: "/webm/trophy.webp",
    label: "ZEBRAWOOD",
  },
]

// Server Component - only handles layout and passes data
export default function VerticalCards() {
  return (
    <section className="w-full mb-12">
      {/* Edge-to-edge grey background wrapper */}
      <div className="w-full bg-[#D9D9D9]/30 pb-8 sm:pb-12 lg:pb-22 pt-12 lg:pt-18">
        <Container>
          <h2 className="text-caddi-blue text-3xl font-proxima-nova-extra-condensed font-bold mb-8">CADDI SHORTS</h2>
        </Container>
        
        {/* Pass only data to the content component */}
        <VerticalCardsContent cardData={cardData} />
      </div>
    </section>
  )
}
