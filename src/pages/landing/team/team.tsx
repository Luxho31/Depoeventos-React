import CarouselCard from "../../../components/carousel-card/carousel-card";
import 'animate.css';

export default function Team() {
    return (

        <main className="flex-1 overflow-y-auto mt-[100px] h-[82vh] pb-8">
            <section className="container grid max-w-3xl gap-8 px-4 py-8 mx-auto lg:gap-10 lg:px-6 lg:py-12">
                <div className="flex flex-col items-center justify-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate__animated animate__bounce">Meet our Team</h1>
                    <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                        The team behind the innovation. We're a group of passionate individuals dedicated to pushing the
                        boundaries of what's possible.
                    </p>
                </div>
                <div>
                    <CarouselCard />
                </div>
            </section>
        </main>
    )
}