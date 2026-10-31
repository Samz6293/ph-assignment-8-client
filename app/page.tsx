import Hero from "@/components/home/Hero";
import WhyBeacon from "@/components/home/WhyBeacon";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import Gallery from "@/components/home/Gallery";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
    return (
        <>
            <Hero />
            <WhyBeacon />
            <UpcomingEvents />
            <Gallery />
            <Newsletter />
        </>
    )
}
