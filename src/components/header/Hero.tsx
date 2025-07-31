import { ChevronRight } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import { Container } from "@/components/ui/container";
import heroImg from "@/assets/webp/zolas.webp";

export default function Hero() {
    return (
        <section className='w-full relative overflow-x-hidden bg-black xl:min-h-[800px] md:min-h-[600px] sm:min-h-[500px] min-h-[400px]'>
            <Image
                src={heroImg}
                placeholder="blur"
                alt="Hero background"
                fill
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: "center center" }}
                sizes="100vw"
                draggable={false}
                priority
                fetchPriority="high"
                loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            <div className="absolute inset-0 flex items-center">
                <Container>
                    <h1 className="text-white text-4xl sm:text-5xl xl:text-7xl font-extrabold mb-6 font-family-proxima-nova-extra-condensed text-shadow-2xl text-center xl:text-left">
                        TURF CARE,<br />
                        ELEVATED
                    </h1>
                    <p className="text-white sm:text-lg lg:text-xl mb-8 sm:mb-12 font-semibold max-w-xs sm:max-w-sm mx-auto xl:mx-0 text-center xl:text-left">
                        Premium hardwood divot tools that keep greens looking picture-perfect.
                    </p>
                    <div className="flex flex-row gap-4 justify-center xl:justify-start">
                        <Link href='/shop' className="bg-white text-black px-8 sm:px-12 py-2 sm:py-2.5 rounded-full text-nowrap font-semibold hover:bg-caddi-brown hover:text-white cursor-pointer transition-all duration-200 ease-in-out-quad">                            
                            Shop Now
                        </Link>
                        <Link href='/build' className=" text-white pl-6 pr-4  sm:pl-8 sm:pr-6 sm:px-12 py-2 sm:py-2.5 rounded-full text-nowrap font-semibold bg-white/10 backdrop-blur-3xl hover:bg-white/20 cursor-pointer transition-all duration-100 ease-in-out-quad flex items-center gap-2">
                            Build Your Own <ChevronRight className="w-3 h-3" />
                        </Link>
                    </div>
                </Container>
            </div>
        </section>
    )
}