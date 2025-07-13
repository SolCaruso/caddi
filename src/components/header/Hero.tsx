import { ChevronRight } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className='w-screen relative overflow-hidden xl:h-[50vh] h-[30vh]'>
            <Image
                src="/webm/hero.webp"
                alt="Hero background"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                objectPosition: "center center",
                }}
                fill
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent "></div>
            <div className="absolute inset-0 flex items-center mx-4">
                <div className="w-full mx-auto max-w-8xl">

                    <h1 className="text-white text-5xl xl:text-7xl font-extrabold mb-6 font-family-proxima-nova-extra-condensed text-shadow-2xl text-center xl:text-left">
                        TURF CARE,<br />
                        ELEVATED
                    </h1>
                    <p className="text-white text-lg lg:text-xl mb-12 font-semibold max-w-sm mx-auto xl:mx-0 text-center xl:text-left">
                        Premium hardwood divot tools that keep greens looking picture-perfect.
                    </p>

                    <div className="flex flex-row gap-4 justify-center xl:justify-start">

                        <Link href='/'>                            
                            <button className="bg-white text-black px-12 py-2.5 rounded-full font-semibold hover:bg-gray-200 cursor-pointer transition-all duration-100 ease-in-out-quad">
                                Shop Now
                            </button>
                        </Link>

                        <Link href='/'>
                            <button className=" text-white pl-8 pr-6 py-2.5 rounded-full font-semibold bg-white/10 backdrop-blur-3xl hover:bg-white/20 cursor-pointer transition-all duration-100 ease-in-out-quad flex items-center gap-2">
                                Build Your Own <ChevronRight className="w-3 h-3" />
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
        </section>
    )
}