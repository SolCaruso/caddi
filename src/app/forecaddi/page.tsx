import Carousel from "@/components/pages/forecaddi/Carousel"
import Info from "@/components/pages/forecaddi/Clubs"
import Accordion from "@/components/pages/forecaddi/Accordion"
import Customize from "@/components/pages/forecaddi/Customize"
import Explore from "@/components/pages/forecaddi/Explore"
import ScrollHandler from "@/components/pages/forecaddi/ScrollHandler"

export default function Forecaddi() {
    return (
        <main className="flex-grow">
            <ScrollHandler />
            <Carousel />
            <Explore />
            <Info />
            <Accordion />
            <Customize />
        </main>
    )
}