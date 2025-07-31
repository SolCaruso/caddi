import Carousel from "@/components/pages/forecaddi/Carousel"
import Info from "@/components/pages/forecaddi/Info"
import Accordion from "@/components/pages/forecaddi/Accordion"
import Customize from "@/components/pages/forecaddi/Customize"
import Explore from "@/components/pages/forecaddi/Explore"

export default function Forecaddi() {
    return (
        <main className="flex-grow bg-white">
            {/* Hero Section */}
            <section className="w-full py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-caddi-blue text-4xl md:text-5xl lg:text-6xl font-proxima-nova-extra-condensed font-bold mb-6 uppercase">
                        Forecaddie Golf App
                    </h1>
                    <div className='w-16 h-2 bg-black/50 rounded-full mx-auto mb-8'></div>
                    <p className="text-black/50 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Forecaddie gives you real-time, personalized golf advice—factoring in wind, slope, lie, and your own club data to help you swing smarter and score lower.
                    </p>
                </div>
            </section>
            {/* Components */}
            <Carousel />
            <Explore />
            <Info />
            <Accordion />
            <Customize />
        </main>
    )
}