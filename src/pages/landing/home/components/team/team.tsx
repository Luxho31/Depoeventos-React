import { InfiniteMovingCards } from '../../../../../components/infinite-moving-cards';

export default function Team() {

  const testimonials = [
    {
      name: "Charles Dickens",
      img: "https://w0.peakpx.com/wallpaper/58/22/HD-wallpaper-spider-man-game-art-vertical-artwork-comic-art-portrait-display-marvel-super-heroes.jpg"
    },
    {
      name: "William Shakespeare",
      img: "https://w0.peakpx.com/wallpaper/58/22/HD-wallpaper-spider-man-game-art-vertical-artwork-comic-art-portrait-display-marvel-super-heroes.jpg"

    },
    {
      name: "Edgar Allan Poe",
      img: "https://w0.peakpx.com/wallpaper/58/22/HD-wallpaper-spider-man-game-art-vertical-artwork-comic-art-portrait-display-marvel-super-heroes.jpg"

    },
    {
      name: "Jane Austen",
      img: "https://w0.peakpx.com/wallpaper/58/22/HD-wallpaper-spider-man-game-art-vertical-artwork-comic-art-portrait-display-marvel-super-heroes.jpg"

    },
    {
      name: "Herman Melville",
      img: "https://w0.peakpx.com/wallpaper/58/22/HD-wallpaper-spider-man-game-art-vertical-artwork-comic-art-portrait-display-marvel-super-heroes.jpg"
    },
  ];

  return (
    <div className="w-[80%] m-auto mt-20 mb-20">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-3">Equipo</h1>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </p>
      </div>
      <div className="w-full m-auto flex justify-around max-xl:w-full max-lg:flex-col max-lg:items-center max-lg:gap-10">
        <InfiniteMovingCards items={testimonials} direction="right" />
      </div>
    </div>
  );
}
