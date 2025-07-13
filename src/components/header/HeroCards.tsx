import Image from 'next/image';
import Link from 'next/link';

export default function HeroCards() {

    return (
        <div className="flex flex-col md:flex-row w-full mx-auto">

            {/* Left Card */}
            <div
                className="relative md:flex-1 rounded-lg lg:rounded-xl overflow-hidden flex mx-2 mt-2 md:ml-4 md:mr-2 md:my-4 md:w-full h-[500px] sm:h-[350px] xl:h-[450px] 3xl:h-[550px] 4xl:h-[650px] 5xl:h-[750px]"
                style={{
                backgroundImage: 'url(/webm/trophy-bg.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/100 to-transparent"/>

                {/* Content */}
                <div className="relative z-10 flex justify-between items-end w-full pl-4 pr-2 pb-10 xl:p-6">

                    {/* Text & Button */}
                    <div className='text-white xl:p-6 flex flex-col justify-between h-full'>

                        <div className='h-full w-full hidden md:block'>
                           {/* Spacer Box */}
                        </div>
                        
                        <div className='h-full w-full flex flex-col justify-end'>
                            <p className='text-lg font-semibold mb-2'>Custom Golf Course Materials & Trophies</p>
                            <h2 className='text-4xl 3xl:text-5xl font-family-proxima-nova-extra-condensed font-extrabold mb-8 uppercase'>Crafted for the Course</h2>
                            <div>
                                <Link href='/' className='bg-white hover:bg-gray-200 transition-all duration-100 ease-in-out-quad text-black px-8 py-2 rounded-full font-semibold cursor-pointer'>
                                    Learn More
                                </Link>
                            </div>
                        </div>
                        
                    </div>

                    {/* Image */} 
                    <Image
                        src="/webm/trophy.webp"
                        alt="Trophy Forecaddi"
                        height={463}
                        width={309}
                        className="w-[250px] h-auto 3xl:w-[309px] 4xl:w-[359px] hidden 2xl:block mr-12 3xl:mr-24"
                    />
                    
                </div>

            </div>

            {/* Right Card */}
            <div
                className="relative md:flex-1 rounded-lg lg:rounded-xl overflow-hidden flex mx-2 mt-2 md:mr-4 md:ml-2 md:my-4 md:w-full h-[500px] sm:h-[350px] xl:h-[450px] 3xl:h-[550px] 4xl:h-[650px] 5xl:h-[750px]"
                style={{
                backgroundImage: 'url(/webm/forecaddi-bg.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"/>

                {/* Content */}
                <div className="relative z-10 flex flex-col-reverse sm:flex-row sm:justify-between sm:items-end w-full pl-4 pr-2 pb-10 xl:p-6">

                    {/* Text & Button */}
                    <div className='text-white xl:p-6 flex flex-col sm:justify-between h-full'>

                        <div className='h-full w-full hidden md:block'>
                           {/* Spacer Box */}
                        </div>
                        
                        <div className='h-full w-full flex flex-col justify-end'>
                            <p className='text-lg font-semibold mb-2 2xs:text-nowrap'>Forecaddie Golf App on IOS and Android</p>
                            <h2 className='text-4xl 3xl:text-5xl font-family-proxima-nova-extra-condensed font-extrabold mb-8 uppercase 2xs:text-nowrap'>Swing With Confidence</h2>
                            <div>
                                <Link href='/' className='bg-white hover:bg-gray-200 transition-all duration-100 ease-in-out-quad text-black px-8 py-2 rounded-full font-semibold cursor-pointer'>
                                    Learn More
                                </Link>
                            </div>
                        </div>
                        
                    </div>

                    {/* Image */}
                    <div className='flex justify-center sm:justify-normal sm:block pt-18 sm:pt-0'>
                        <Image
                            src="/webm/forecaddi.webp"
                            alt="Forecaddie"
                            height={506}
                            width={380}
                            className="h-auto w-[300px] 2xl:w-[550px] 5xl:w-[650px] hidden 2xs:block sm:hidden 2xl:block"
                        />
                    </div>
                </div>

            </div>

        </div>
    );
}