import { Container } from "@/components/ui/container"
import Image from "next/image"

export default function Customize() {
    return (
        <section className="w-full pt-0 pb-32 3xl:pt-16 3xl:pb-48 sm:px-12 px-6">
            <Container>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center md:mb-22 mb-12">
                        <h2 className="text-caddi-blue md:text-3xl text-2xl font-semibold md:mb-6 mb-4">
                            Customize Your Experience
                        </h2>
                        <p className="text-black/50 md:text-lg text-base max-w-xl mx-auto">
                            The Settings tab is your control hub for personalizing the app to match your playing style and environment.
                        </p>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div className="space-y-6">
                            <h3 className="text-caddi-blue md:text-xl text-lg font-semibold">
                                Here&apos;s what you can adjust:
                            </h3>
                            <ul className="md:pl-10 pl-2 md:space-y-6 space-y-3 font-medium text-black/50 md:text-lg text-base">
                                <li><strong className="text-black/70">Handedness:</strong> Switch between right-handed and left-handed mode</li>
                                <li><strong className="text-black/70">Units:</strong> Choose between yards or meters for distance measurements</li>
                                <li><strong className="text-black/70">Light or Dark Mode:</strong> Toggle between light and dark themes, with an option to reduce glare for bright conditions</li>
                                <li><strong className="text-black/70">Rain Toggle:</strong> Playing in the rain? Turn this on to help Forecaddie adjust recommendations</li>
                                <li><strong className="text-black/70">Subscription Details:</strong> View and manage your active subscription plan</li>
                            </ul>
                        </div>
                        
                        <div className="flex justify-center space-x-4">
                            <div className="relative sm:w-[200px] w-[150px] sm:h-[400px] h-[300px]">
                                <Image 
                                    src="/webp/app-settings-1.webp" 
                                    alt="Settings Light Mode" 
                                    fill
                                    sizes="200px"
                                    className="object-contain"
                                />
                            </div>
                            <div className="relative sm:w-[200px] w-[150px] sm:h-[400px] h-[300px]">
                                <Image 
                                    src="/webp/app-settings-2.webp" 
                                    alt="Settings Dark Mode" 
                                    fill
                                    sizes="200px"
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