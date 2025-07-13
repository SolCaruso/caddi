import Image from 'next/image';
import Link from 'next/link';

export default function HeroCards() {

    return (
        <div className="flex flex-col md:flex-row w-full mx-auto">

            {/* Left Card */}
            <div
                className="relative flex-1 rounded-xl overflow-hidden flex ml-4 mr-2 my-4 w-full max-h-[850px]"
                style={{
                backgroundImage: 'url(/webm/trophy-bg.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/100 to-transparent"/>

                {/* Content */}
                <div className="relative z-10 flex justify-between items-end w-full p-6 pr-42">

                    {/* Text & Button */}
                    <div className='text-white p-6 flex flex-col justify-between h-full'>

                        <div className='h-full w-full'>
                           {/* Spacer Box */}
                        </div>
                        
                        <div className='h-full w-full flex flex-col justify-end'>
                            <p className='text-lg font-semibold mb-2'>Custom Golf Course Materials & Trophies</p>
                            <h2 className='text-5xl font-family-proxima-nova-extra-condensed font-extrabold mb-6 uppercase text-nowrap'>Crafted for the Course</h2>
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
                        className=""
                    />
                    
                </div>

            </div>

            {/* Right Card */}
            <div
                className="relative flex-1 rounded-xl overflow-hidden flex mr-4 ml-2 my-4 w-full max-h-[850px]"
                style={{
                backgroundImage: 'url(/webm/forecaddi-bg.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"/>

                {/* Content */}
                <div className="relative z-10 flex justify-between items-end w-full p-6">

                    {/* Text & Button */}
                    <div className='text-white p-6 flex flex-col justify-between h-full'>

                        <div className='h-full w-full'>
                           {/* Spacer Box */}
                        </div>
                        
                        <div className='h-full w-full flex flex-col justify-end'>
                            <p className='text-lg font-semibold mb-2'>Forecaddie Golf App on IOS and Android</p>
                            <h2 className='text-5xl font-family-proxima-nova-extra-condensed font-extrabold mb-6 uppercase text-nowrap'>Swing With Confidence</h2>
                            <div>
                                <Link href='/' className='bg-white hover:bg-gray-200 transition-all duration-100 ease-in-out-quad text-black px-8 py-2 rounded-full font-semibold cursor-pointer'>
                                    Learn More
                                </Link>
                            </div>
                        </div>
                        
                    </div>

                    {/* Image */}
                    <Image
                        src="/webm/forecaddi.webp"
                        alt="Forecaddie"
                        height={506}
                        width={380}
                        className="h-auto w-[550px]"
                    />
                    
                </div>

            </div>

        </div>
    );
}