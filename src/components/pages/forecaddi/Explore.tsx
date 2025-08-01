import { Container } from "@/components/ui/container"
import ExploreClient from "@/components/pages/forecaddi/Client/ExploreClient"

// Static data - stays on server
const slides = [
  {
    key: "getting-started",
    label: "Getting Started",
    image: "/webp/app-3.webp",
    heading: "Explore The App.",
    subnav: ["Getting Started", "Main Navigation"],
    content: {
      title: "Step 1: Launch the App",
      description:
        "Once you download and open the app for the first time, you’ll be prompted to:",
      details: ["Choose a subscription: Monthly, 3-month, or annual.", "Activate your 1-month free trial and get started right away."],
      detailsBold: [0],
    },
  },
  {
    key: "main-navigation",
    label: "Main Navigation",
    image: "/webp/app-3.webp",
    heading: "Explore The App.",
    subnav: ["Getting Started", "Main Navigation"],
    content: {
      title: "Step 2: Main Navigation",
      description: "You’ll notice three main tabs at the bottom of the screen:",
      details: [
        "Clubs Menu (1)",
        "Caddie (2)",
        "Settings (3)",
      ],
      detailsBold: [],
    },
  },
]

// Server Component - only handles layout and passes data
export default function ForeCaddi() {
  return (
    <section className="w-full flex justify-center flex-col py-8 bg-caddi-light">
      <Container>
        <div className="w-full rounded-lg bg-caddi-light flex flex-col items-center mx-auto relative">
          {/* Pass only data to the content component */}
          <ExploreClient slides={slides} />
        </div>
      </Container>
    </section>
  )
}
