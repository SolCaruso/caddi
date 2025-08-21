import { Container } from "@/components/ui/container"
import Image from "next/image"

export default function Info() {
    return (
        <section className="w-full pb-20 pt-22 3xl:pb-32 3xl:pt-38 px-6">
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
                    
                    <div className="flex flex-col lg:flex-row justify-between gap-12 items-start">
                        <div className="w-full lg:w-auto flex justify-center space-x-4 lg:justify-start">
                            <div className="relative w-[125px] h-[250px] md:w-[250px] md:h-[500px]">
                                <Image 
                                    src="/webp/app-clubs-1.webp" 
                                    alt="My Clubs" 
                                    fill
                                    sizes="(max-width: 768px) 125px, 250px"
                                    className="object-contain"
                                    quality={75}
                                    loading="lazy"
                                />
                            </div>
                            <div className="relative w-[125px] h-[250px] md:w-[250px] md:h-[500px]">
                                <Image 
                                    src="/webp/app-clubs-2.webp" 
                                    alt="7 Iron" 
                                    fill
                                    sizes="(max-width: 768px) 125px, 250px"
                                    className="object-contain"
                                    quality={75}
                                    loading="lazy"
                                />
                            </div>
                        </div>
                        
                        <div className="md:space-y-6 space-y-3 pt-0 lg:pt-32 pl-0 sm:pl-10 lg:pl-0">
                            <h3 className="text-caddi-blue md:text-xl text-lg font-semibold">
                                To add a club:
                            </h3>
                            <ul className="list-disc pl-6 sm:pl-10 sm:space-y-2.5 space-y-1.5 font-medium text-black/50 md:text-lg text-base max-w-[480px]">
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