import Link from 'next/link';
import Image from 'next/image';
import img8 from "@/assets/webp/zolas-8.webp";
import img36 from "@/assets/webp/zolas-36.webp";

export default function HeroCards() {
    return (
        <div className="flex flex-col md:flex-row w-full mx-auto ">

            {/* Left Card */}
            <div className="relative md:flex-1 rounded-lg overflow-hidden bg-black flex mx-2 mt-2 md:ml-3 md:mr-1.5 md:my-3 md:w-full h-[500px] sm:h-[350px] xl:h-[450px] 3xl:h-[550px] 4xl:h-[650px] 5xl:h-[750px]">
                <Image
                    src={img8}
                    placeholder="blur"
                    alt="Custom Golf Course Materials & Trophies"
                    fill
                    className="absolute inset-0 object-cover"
                    style={{ objectPosition: "center center" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    draggable={false}
                />

                {/* Render content immediately */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/100 to-transparent z-10"/>

                {/* Content */}
                <div className="relative z-20 flex justify-between items-end w-full pl-4 pr-2 pb-10 xl:p-6">

                    {/* Text & Button */}
                    <div className='text-white xl:p-6 flex flex-col justify-between h-full'>

                        <div className='h-full w-full hidden md:block'>
                           {/* Spacer Box */}
                        </div>
                        
                        <div className='h-full w-full flex flex-col justify-end'>
                            <p className='text-lg font-semibold mb-2'>Custom Golf Course Materials & Trophies</p>
                            <h2 className='text-4xl 3xl:text-5xl font-family-proxima-nova-extra-condensed font-extrabold mb-8 uppercase'>Crafted for the Course</h2>
                            <div>
                                <Link href='/custom-work' className='bg-[#FDFCFC] hover:bg-caddi-brown hover:text-white transition-all duration-200 ease-in-out-quad text-black px-8 py-2 rounded-full font-semibold cursor-pointer'>
                                    Learn More
                                </Link>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>

            </div>

            {/* Right Card */}
            <div className="relative md:flex-1 rounded-lg overflow-hidden bg-black flex mx-2 mt-2 md:mr-3 md:ml-1.5 md:my-3 md:w-full h-[500px] sm:h-[350px] xl:h-[450px] 3xl:h-[550px] 4xl:h-[650px] 5xl:h-[750px]">
                <Image
                    src={img36}
                    placeholder="blur"
                    alt="Forecaddie Golf App on IOS and Android"
                    fill
                    className="absolute inset-0 object-cover"
                    style={{ objectPosition: "center center" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    draggable={false}
                />

                {/* Render content immediately */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"/>

                {/* Content */}
                <div className="relative z-20 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-end w-full pl-4 pr-2 pb-10 xl:p-6">

                    {/* Text & Button */}
                    <div className='text-white xl:p-6 flex flex-col sm:justify-between h-full'>

                        <div className='h-full w-full hidden md:block'>
                           {/* Spacer Box */}
                        </div>
                        
                        <div className='h-full w-full flex flex-col justify-end'>
                            <p className='text-lg font-semibold mb-2 2xs:text-nowrap'>Forecaddie Golf App on IOS and Android</p>
                            <h2 className='text-4xl 3xl:text-5xl font-family-proxima-nova-extra-condensed font-extrabold mb-8 uppercase 2xs:text-nowrap'>Swing With Confidence</h2>
                            <div>
                                <Link href='/forecaddi' className='bg-[#FDFCFC] hover:bg-caddi-brown hover:text-white transition-all duration-200 ease-in-out-quad text-black px-8 py-2 rounded-full font-semibold cursor-pointer'>
                                    Learn More
                                </Link>
                            </div>
                        </div>
                        
                    </div>

                </div>

            </div>

        </div>
    );
}