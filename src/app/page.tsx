import Hero from '@/components/header/Hero'
import HeroCards from '@/components/header/HeroCards'
import VerticalCards from '@/components/pages/home/VerticalCards'

export default function Home() {
  return (
    <main className='flex-1'>
      <Hero/>
      <HeroCards/>
      <VerticalCards/>
    </main>
  );
}
