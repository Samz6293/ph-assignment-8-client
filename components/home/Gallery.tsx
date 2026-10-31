import Image from "next/image";
import donation from "@/public/donation.jpg";
import winterDrive from "@/public/gallery/winter-drive.jpg";
import cleanup from "@/public/gallery/cleanup.jpg";
import plantation from "@/public/gallery/plantation.jpg";
import bookDrive from "@/public/gallery/book-drive.jpg";
import bloodCamp from "@/public/gallery/blood-camp.jpg";
import riverCleanup from "@/public/gallery/river-cleanup.jpg";
import SectionHeading from "@/components/shared/SectionHeading";

// size: how much space the photo takes in the grid
const photos = [
    { src: winterDrive, label: "Winter drive, Mirpur", size: "sm:col-span-2 sm:row-span-2" },
    { src: plantation, label: "Plantation, Uttara", size: "" },
    { src: cleanup, label: "Cleanup, Hatirjheel", size: "" },
    { src: bookDrive, label: "Book drive, Korail", size: "" },
    { src: bloodCamp, label: "Blood camp, Dhanmondi", size: "" },
    { src: donation, label: "Food packing, Mohammadpur", size: "lg:col-span-2" },
    { src: riverCleanup, label: "River cleanup, Buriganga", size: "lg:col-span-2" },
];

export default function Gallery() {
    return (
        <section id="gallery" className="bg-soft py-16 scroll-mt-18
            md:py-24">
            <div className="container-page flex flex-col gap-10">
                <SectionHeading
                    left
                    eyebrow="Gallery"
                    title="Moments from the field"
                    description="A few frames from drives, cleanups and camps our community has run together."
                />

                {/* bento grid: every row is the same height, big photos span more cells */}
                <div className="grid grid-cols-1 auto-rows-55 gap-4
                    sm:grid-cols-2 lg:grid-cols-4">
                    {photos.map((photo) =>
                        <div key={photo.label} className={`relative overflow-hidden rounded-card ${photo.size}`}>
                            <Image src={photo.src} alt={photo.label} fill placeholder="blur"
                                sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                                className="object-cover transition-transform duration-500
                                hover:scale-105" />
                            <span className="absolute bottom-3 left-3 bg-white text-stone-900 px-3 py-1 rounded-full text-xs font-bold">
                                {photo.label}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
