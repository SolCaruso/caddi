import Hero from '@/components/header/Hero'
import HeroCards from '@/components/header/HeroCards'
import VerticalCards from '@/components/pages/home/VerticalCards'
import ForeCaddi from '@/components/pages/home/ForeCaddi'
// import Instagram from '@/components/pages/home/Instagram'

export default function Home() {
  return (
    <main className='flex-1'>
      <Hero />
      <HeroCards />
      <VerticalCards />
      <ForeCaddi />
      {/* <Instagram /> */}
    </main>
  );
}
