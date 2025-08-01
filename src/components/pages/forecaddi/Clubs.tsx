import { Container } from "@/components/ui/container"
import Image from "next/image"

export default function Info() {
    return (
        <section className="w-full py-32 bg-white">
            <Container>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-caddi-blue text-3xl font-semibold mb-5">
                            Setting Up Your Clubs
                        </h2>
                        <p className="text-black/50 text-lg max-w-2xl mx-auto">
                            The Clubs tab is where you build your personal golf bag. You&apos;ll see a few sample clubs to start.
                        </p>
                    </div>
                    
                    <div className="flex justify-between gap-12 items-start">
                        <div className="flex justify-center space-x-4">
                            <div className="relative w-[250px] h-[500px]">
                                <Image 
                                    src="/webp/app-3.webp" 
                                    alt="My Clubs" 
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="relative w-[250px] h-[500px]">
                                <Image 
                                    src="/webp/app-3.webp" 
                                    alt="7 Iron" 
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-6 pt-32">
                            <h3 className="text-caddi-blue text-xl font-semibold">
                                To add a club:
                            </h3>
                            <ul className="list-disc pl-10 space-y-2.5 font-medium text-black/50 text-lg max-w-[480px]">
                                <li>Tap the + icon (top right)</li>
                                <li>Name your club (e.g., &ldquo;7 Iron&rdquo;)</li>
                                <li>Add distances for different swing types</li>
                                <li>Include swing notes or reminders (they&apos;ll pop up when the club is recommended)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}