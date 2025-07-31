import { Container } from "@/components/ui/container"
import Image from "next/image"

export default function Info() {
    return (
        <section className="w-full py-16 bg-white">
            <Container>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-caddi-blue text-3xl font-proxima-nova-extra-condensed font-bold mb-6 uppercase">
                            Setting Up Your Clubs
                        </h2>
                        <p className="text-black/50 text-lg max-w-2xl mx-auto">
                            The Clubs tab is where you build your personal golf bag. You'll see a few sample clubs to start.
                        </p>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div className="flex justify-center space-x-4">
                            <div className="relative w-[200px] h-[300px]">
                                <Image 
                                    src="/webp/how-it-works.webp" 
                                    alt="My Clubs" 
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="relative w-[200px] h-[300px]">
                                <Image 
                                    src="/webp/environmental.webp" 
                                    alt="7 Iron" 
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <h3 className="text-caddi-blue text-xl font-semibold">
                                To add a club:
                            </h3>
                            <ul className="space-y-3 text-black/50">
                                <li className="flex items-start">
                                    <span className="w-2 h-2 bg-caddi-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    <span>Tap the + icon (top right)</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="w-2 h-2 bg-caddi-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    <span>Name your club (e.g., "7 Iron")</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="w-2 h-2 bg-caddi-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    <span>Add distances for different swing types</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="w-2 h-2 bg-caddi-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    <span>Include swing notes or reminders (they'll pop up when the club is recommended)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}