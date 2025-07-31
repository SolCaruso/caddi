import { Container } from "@/components/ui/container"
import Image from "next/image"

export default function Customize() {
    return (
        <section className="w-full py-16 bg-white">
            <Container>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-caddi-blue text-3xl font-proxima-nova-extra-condensed font-bold mb-6 uppercase">
                            Customize Your Experience
                        </h2>
                        <p className="text-black/50 text-lg max-w-2xl mx-auto">
                            The Settings tab is your control hub for personalizing the app to match your playing style and environment.
                        </p>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div className="space-y-6">
                            <h3 className="text-caddi-blue text-xl font-semibold">
                                Here&apos;s what you can adjust:
                            </h3>
                            <ul className="space-y-3 text-black/50">
                                <li className="flex items-start">
                                    <span className="w-2 h-2 bg-caddi-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    <span><strong>Handedness:</strong> Switch between right-handed and left-handed mode</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="w-2 h-2 bg-caddi-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    <span><strong>Units:</strong> Choose between yards or meters for distance measurements</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="w-2 h-2 bg-caddi-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    <span><strong>Light or Dark Mode:</strong> Toggle between light and dark themes, with an option to reduce glare for bright conditions</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="w-2 h-2 bg-caddi-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    <span><strong>Rain Toggle:</strong> Playing in the rain? Turn this on to help Forecaddie adjust recommendations</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="w-2 h-2 bg-caddi-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    <span><strong>Subscription Details:</strong> View and manage your active subscription plan</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="flex justify-center space-x-4">
                            <div className="relative w-[200px] h-[300px]">
                                <Image 
                                    src="/webp/decision.webp" 
                                    alt="Settings Light Mode" 
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="relative w-[200px] h-[300px]">
                                <Image 
                                    src="/webp/simplicity.webp" 
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