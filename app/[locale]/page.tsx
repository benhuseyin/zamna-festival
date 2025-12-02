import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Tabs from '@/components/Tabs';
import TicketSelector from '@/components/TicketSelector';
import Map from '@/components/Map';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function HomePage() {
    return (
        <main className="min-h-screen bg-black text-white">
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
