import { Container } from "@/components/ui/container"
import VerticalCardsContent from "@/components/pages/home/Client/VerticalCardsClient"

// Static data 
const cardData = [
  {
    bg: "/webm/caddi.webm",
    label: "CALCULATE YOUR DISTANCE",
    linkText: "LEARN MORE",
    internalLink: "/forecaddi",
    externalLink: null,
    poster: "/webp/thumbnails/caddi.webp",
  },
  {
    bg: "/webm/caddi7.webm",
    label: "CUSTOMIZE YOUR DIVOT",
    linkText: "BUILD YOUR DIVOT",
    internalLink: "/build",
    externalLink: null,
    poster: "/webp/thumbnails/caddi7.webp",
  },
  {
    bg: "/webm/caddi11.webm",
    label: "THE MAKING OF FORECADDI",
    linkText: "DOWNLOAD APP",
    internalLink: "/forecaddi",
    externalLink: null,
    poster: "/webp/thumbnails/caddi11.webp",
  },
  {
    bg: "/webm/caddi9.webm",
    label: "CUSTOM TROPHY",
    linkText: "LEARN MORE",
    internalLink: "/custom-work",
    externalLink: null,
    poster: "/webp/thumbnails/caddi9.webp",
  },
  {
    bg: "/webm/caddi2.webm",
    label: "CADDI AI",
    linkText: "LEARN MORE",
    internalLink: "/forecaddi",
    externalLink: null,
    poster: "/webp/thumbnails/caddi2.webp",
  },
  {
    bg: "/webm/caddi10.webm",
    label: "AVAILABLE FOR IOS & ANDROID",
    linkText: "DOWNLOAD APP",
    internalLink: null,
    externalLink: "https://apps.apple.com/us/app/forecaddie-golf-app/id6740142793",
    poster: "/webp/thumbnails/caddi10.webp",
  },
  {
    bg: "/webm/caddi4.webm",
    label: "CADDI MERCH",
    linkText: "SHOP NOW",
    internalLink: "/shop",
    externalLink: null,
    poster: "/webp/thumbnails/caddi4.webp",
  },
  {
    bg: "/webm/caddi8.webm",
    label: "ON THE COURSE",
    linkText: "LEARN MORE",
    internalLink: "/forecaddi",
    externalLink: null,
    poster: "/webp/thumbnails/caddi8.webp",
  },
]

export default function VerticalCards() {
  return (
    <section className="w-full mb-12">
      {/* Edge-to-edge grey background wrapper */}
      <div className="w-full bg-[#F5F5F7] pb-8 sm:pb-12 lg:pb-22 pt-12 lg:pt-18">
        <Container>
          <h2 className="text-caddi-blue text-3xl font-proxima-nova-extra-condensed font-bold mb-8">CADDI SHORTS</h2>
        </Container>
        
        {/* Pass only data to the content component */}
        <VerticalCardsContent cardData={cardData} />
      </div>
    </section>
  )
}
