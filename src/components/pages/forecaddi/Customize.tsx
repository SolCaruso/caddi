import { Container } from "@/components/ui/container"
import Image from "next/image"

export default function Customize() {
    return (
        <section className="w-full pt-16 pb-48">
            <Container>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-22">
                        <h2 className="text-caddi-blue text-3xl font-semibold mb-6">
                            Customize Your Experience
                        </h2>
                        <p className="text-black/50 text-lg max-w-xl mx-auto">
                            The Settings tab is your control hub for personalizing the app to match your playing style and environment.
                        </p>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div className="space-y-6">
                            <h3 className="text-caddi-blue text-xl font-semibold">
                                Here&apos;s what you can adjust:
                            </h3>
                            <ul className="pl-10 space-y-6 font-medium text-black/50 text-lg">
                                <li><strong className="text-black/70">Handedness:</strong> Switch between right-handed and left-handed mode</li>
                                <li><strong className="text-black/70">Units:</strong> Choose between yards or meters for distance measurements</li>
                                <li><strong className="text-black/70">Light or Dark Mode:</strong> Toggle between light and dark themes, with an option to reduce glare for bright conditions</li>
                                <li><strong className="text-black/70">Rain Toggle:</strong> Playing in the rain? Turn this on to help Forecaddie adjust recommendations</li>
                                <li><strong className="text-black/70">Subscription Details:</strong> View and manage your active subscription plan</li>
                            </ul>
                        </div>
                        
                        <div className="flex justify-center space-x-4">
                            <div className="relative w-[200px] h-[400px]">
                                <Image 
                                    src="/webp/app-3.webp" 
                                    alt="Settings Light Mode" 
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="relative w-[200px] h-[400px]">
                                <Image 
                                    src="/webp/app-3.webp" 
                                    alt="Settings Dark Mode" 
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}