import Logo from '@/components/logos/Caddi'
import { navLinks } from '@/components/nav/Navigation'
import Link from 'next/link'
import { SVGProps } from 'react'

const social = [
      {
        name: 'LinkedIn',
        href: '#',
        icon: (props: SVGProps<SVGSVGElement>) => (
        <svg  viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
           <path d="M21.1522 20.8088H17.5962V15.2398C17.5962 13.9118 17.5725 12.2023 15.7467 12.2023C13.8946 12.2023 13.6112 13.6492 13.6112 15.1431V20.8085H10.0552V9.35634H13.469V10.9214H13.5168C13.8584 10.3372 14.3521 9.85669 14.9452 9.53091C15.5384 9.20514 16.2088 9.04634 16.885 9.07143C20.4892 9.07143 21.1537 11.4422 21.1537 14.5264L21.1522 20.8088ZM6.04275 7.79099C4.90303 7.79118 3.97894 6.86737 3.97875 5.72765C3.97856 4.58793 4.90228 3.66384 6.042 3.66365C7.18172 3.66337 8.10581 4.58718 8.106 5.7269C8.1061 6.27422 7.88878 6.79916 7.50185 7.18625C7.11491 7.57334 6.59006 7.79087 6.04275 7.79099ZM7.82081 20.8089H4.26103V9.35634H7.82072V20.8088L7.82081 20.8089ZM22.9251 0.361122H2.47416C1.50759 0.350247 0.714937 1.12453 0.703125 2.09109V22.6273C0.714562 23.5943 1.50712 24.3694 2.47406 24.3592H22.9251C23.8941 24.3712 24.6897 23.5962 24.7031 22.6273V2.0895C24.6893 1.12106 23.8936 0.346872 22.9251 0.359528" fill="currentColor"/>
        </svg>

        ),
      },
      {
        name: 'Facebook',
        href: '#',
        icon: (props: SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 13 25" {...props}>
             <path d="M12.0957 13.6008L12.7578 9.46282H8.78536V6.56627C8.78536 5.40765 9.19915 4.49731 11.0198 4.49731H12.9233V0.69041C11.8474 0.524892 10.6888 0.359375 9.61294 0.359375C6.21984 0.359375 3.81984 2.42834 3.81984 6.15248V9.46282H0.0957031V13.6008H3.81984V24.1111C4.64743 24.2766 5.47501 24.3594 6.3026 24.3594C7.13019 24.3594 7.95777 24.2766 8.78536 24.1111V13.6008H12.0957Z" fill="currentColor"/>
          </svg>

        ),
      },
      {
        name: 'Instagram',
        href: '#',
        icon: (props: SVGProps<SVGSVGElement>) => (
          <svg width="25" height="25" viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
              <path d="M12.3164 2.52163C15.5205 2.52163 15.9 2.53381 17.1653 2.59147C18.3353 2.64491 18.9708 2.84037 19.3937 3.00472C19.9538 3.22241 20.3535 3.48247 20.7734 3.90237C21.1934 4.32228 21.4534 4.72203 21.6711 5.28209C21.8354 5.705 22.0309 6.34044 22.0843 7.51034C22.142 8.77578 22.1542 9.15528 22.1542 12.3594C22.1542 15.5636 22.142 15.9431 22.0843 17.2084C22.0309 18.3784 21.8354 19.0138 21.6711 19.4367C21.4534 19.9967 21.1933 20.3966 20.7734 20.8165C20.3535 21.2364 19.9538 21.4964 19.3937 21.714C18.9708 21.8784 18.3353 22.0739 17.1653 22.1273C15.9002 22.185 15.5207 22.1972 12.3164 22.1972C9.11203 22.1972 8.73253 22.185 7.46737 22.1273C6.29738 22.0738 5.66203 21.8784 5.23912 21.714C4.67906 21.4964 4.27922 21.2364 3.85931 20.8165C3.43941 20.3965 3.17934 19.9967 2.96175 19.4367C2.79741 19.0138 2.60184 18.3784 2.5485 17.2084C2.49075 15.9431 2.47856 15.5636 2.47856 12.3594C2.47856 9.15528 2.49075 8.77578 2.5485 7.51044C2.60194 6.34044 2.79741 5.705 2.96175 5.28209C3.17934 4.72203 3.43941 4.32228 3.85931 3.90237C4.27931 3.48237 4.67906 3.22241 5.23912 3.00472C5.66194 2.84037 6.29738 2.64491 7.46737 2.59147C8.73272 2.53381 9.11222 2.52163 12.3164 2.52163ZM12.3164 0.359375C9.05737 0.359375 8.64872 0.373156 7.36884 0.431562C6.0915 0.489875 5.21916 0.69275 4.45594 0.989375C3.66675 1.29603 2.99756 1.70637 2.33044 2.3735C1.66331 3.04062 1.25306 3.70981 0.946406 4.49891C0.649687 5.26222 0.446906 6.13456 0.388594 7.41181C0.330187 8.69169 0.316406 9.10034 0.316406 12.3594C0.316406 15.6184 0.330187 16.0271 0.388594 17.3069C0.446906 18.5843 0.649687 19.4566 0.946406 20.2198C1.25297 21.0089 1.66331 21.6782 2.33044 22.3453C2.99756 23.0125 3.66675 23.4227 4.45594 23.7294C5.21925 24.0261 6.0915 24.2289 7.36875 24.2872C8.64872 24.3456 9.05737 24.3594 12.3164 24.3594C15.5754 24.3594 15.9841 24.3456 17.264 24.2872C18.5412 24.2289 19.4136 24.0261 20.1768 23.7294C20.966 23.4228 21.6352 23.0125 22.3023 22.3453C22.9694 21.6782 23.3797 21.009 23.6864 20.2198C23.983 19.4565 24.1859 18.5843 24.2442 17.307C24.3026 16.0271 24.3164 15.6184 24.3164 12.3594C24.3164 9.10034 24.3026 8.69169 24.2442 7.41181C24.1859 6.13456 23.983 5.26222 23.6864 4.499C23.3797 3.70981 22.9694 3.04062 22.3023 2.3735C21.6352 1.70637 20.966 1.29594 20.1769 0.989375C19.4136 0.69275 18.5412 0.489875 17.264 0.431562C15.9841 0.373156 15.5754 0.359375 12.3164 0.359375ZM12.3164 6.19719C8.91309 6.19719 6.15422 8.95625 6.15422 12.3594C6.15422 15.7627 8.91309 18.5216 12.3164 18.5216C15.7196 18.5216 18.4786 15.7627 18.4786 12.3594C18.4786 8.95616 15.7196 6.19719 12.3164 6.19719ZM12.3164 16.3594C10.1073 16.3594 8.31637 14.5685 8.31637 12.3594C8.31637 10.1503 10.1073 8.35934 12.3164 8.35934C14.5255 8.35934 16.3164 10.1503 16.3164 12.3594C16.3164 14.5685 14.5255 16.3594 12.3164 16.3594ZM20.162 5.95372C20.162 6.74909 19.5173 7.39372 18.722 7.39372C17.9267 7.39372 17.282 6.74909 17.282 5.95372C17.282 5.15844 17.9267 4.51372 18.722 4.51372C19.5173 4.51372 20.162 5.15844 20.162 5.95372Z" fill="currentColor"/>
           </svg>

        ),
      },
    ]
  
  export default function Footer({className, padding}:{className?:string; padding?: string}) {
    return (
      <footer className='bg-caddi-light w-full'>
        <div className={`${padding} pb-8 pt-24 xl:pt-32`}>
          <div className={`bg-caddi-light ${className}`}>
            <div className="flex justify-between xl:flex-row flex-col gap-32">

              <div className="flex xl:gap-32 gap-16 flex-col xl:flex-row items-center text-center xl:items-start xl:text-left">

                <div>
                  <Logo className='h-12 w-auto xl:-ml-2 xl:-mt-2 hover:opacity-100 opacity-80 transition-all duration-100 ease-in-out-quad cursor-pointer mb-5 xl:block hidden'/>
                  <div className="flex gap-x-6">
                    {social.map((item) => (
                      <a key={item.name} href={item.href} className="text-gray-600 hover:text-gray-800">
                        <span className="sr-only">{item.name}</span>
                        <item.icon aria-hidden="true" className="size-6" />
                      </a>
                    ))}
                  </div>
                </div>


                {/* Mobile Navigation */}
                <div className='font-semibold flex gap-y-1 flex-wrap max-w-md justify-center xl:hidden'>
                  <Link href='' className='px-4.5 py-1.5 hover:bg-caddi-dark/50 hover:text-caddi-brown rounded-lg transition-all duration-100 ease-in-out-quad'>Shop</Link>
                  <Link href='' className='px-4.5 py-1.5 hover:bg-caddi-dark/50 hover:text-caddi-brown rounded-lg transition-all duration-100 ease-in-out-quad'>Download App</Link>
                  <Link href='' className='px-4.5 py-1.5 hover:bg-caddi-dark/50 hover:text-caddi-brown rounded-lg transition-all duration-100 ease-in-out-quad'>App Instructions</Link>
                  <Link href='' className='px-4.5 py-1.5 hover:bg-caddi-dark/50 hover:text-caddi-brown rounded-lg transition-all duration-100 ease-in-out-quad'>Contact</Link>
                  <Link href='' className='px-4.5 py-1.5 hover:bg-caddi-dark/50 hover:text-caddi-brown rounded-lg transition-all duration-100 ease-in-out-quad'>About</Link>
                  <Link href='' className='px-4.5 py-1.5 hover:bg-caddi-dark/50 hover:text-caddi-brown rounded-lg transition-all duration-100 ease-in-out-quad'>Divot Tools</Link>
                </div>


                {/* Desktop Navigation */}
                <div>
                  <Logo className='h-12 w-auto xl:-ml-2 xl:-mt-2 hover:opacity-100 opacity-80 transition-all duration-100 ease-in-out-quad cursor-pointer mb-10 xl:mb-5 block xl:hidden'/>
                  <h3 className="text-base font-semibold text-caddi-blue">Caddi AI Inc.</h3>
                  <p className='text-sm/6 text-gray-600'>Ottawa, Ontario, Canada</p>
                  <p className='text-sm/6 text-gray-600'>info@caddiai.com</p>
                </div>

              </div>

              <div className="xl:flex gap-32 hidden">

                <div className="mt-10 md:mt-0">
                    <h3 className="text-sm/6 font-semibold text-gray-900">{navLinks[0].label}</h3>
                    <ul role="list" className="mt-2 space-y-2">
                        {navLinks.map((item) => {
                            if (item.label === `${navLinks[0].label}`) {
                              return item.dropdown?.map((dropdownItem) => (
                                <li key={dropdownItem.label}>
                                  <Link href={dropdownItem.href} className="text-sm/6 text-gray-600 hover:text-gray-900">
                                    {dropdownItem.label}
                                  </Link>
                                </li>
                              ));
                            } return null;
                          })}
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm/6 font-semibold text-gray-900">{navLinks[1].label}</h3>
                    <ul role="list" className="mt-2 space-y-2">
                        {navLinks.map((item) => {
                            if (item.label === `${navLinks[1].label}`) {
                              return item.dropdown?.map((dropdownItem) => (
                                <li key={dropdownItem.label}>
                                  <Link href={dropdownItem.href} className="text-sm/6 text-gray-600 hover:text-gray-900">
                                    {dropdownItem.label}
                                  </Link>
                                </li>
                              ));
                            } return null;
                          })}
                    </ul>
                </div>

                <div className="mt-10 md:mt-0">
                    <h3 className="text-sm/6 font-semibold text-gray-900">{navLinks[3].label}</h3>
                    <ul role="list" className="mt-2 space-y-2">
                      {navLinks.map((item) => {
                          if (item.label === `${navLinks[3].label}`) {
                            return item.dropdown?.map((dropdownItem) => (
                              <li key={dropdownItem.label}>
                                <Link href={dropdownItem.href} className="text-sm/6 text-gray-600 hover:text-gray-900">
                                  {dropdownItem.label}
                                </Link>
                              </li>
                            ));
                          } return null;
                        })}
                    </ul>
                </div>
              </div>

            </div>
            <div className="xl:mt-16 xl:pt-9 xl:border-t xl:border-gray-900/10 my-12 xl:mb-0 text-center xl:text-left ">
              <p className="text-xs/6 xl:text-sm/6 text-gray-600">&copy; {new Date().getFullYear()} Caddi AI, Inc. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  