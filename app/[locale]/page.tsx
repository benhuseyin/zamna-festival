import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Tabs from '@/components/Tabs';
import TicketSelector from '@/components/TicketSelector';
import Map from '@/components/Map';
import About from '@/components/About';
import Footer from '@/components/Footer';
import HeroImage from '@/assets/images/hero.jpeg';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
    setRequestLocale(locale);
    return (
        <main
            className="min-h-screen text-white bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${HeroImage.src})`
            }}
        >
            <Header />
            <Hero />
            <TicketSelector />
            <Tabs />
            <Map />
            <About />
            <Footer />
            {/* <Cart /> */}
        </main>
    );
}
