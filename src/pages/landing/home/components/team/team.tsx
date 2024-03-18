import { InfiniteMovingCards } from '../../../../../components/infinite-moving-cards';

export default function Team() {

    const testimonials = [
        {
          quote:
            "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
          name: "Charles Dickens",
          title: "A Tale of Two Cities",
        },
        {
          quote:
            "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
          name: "William Shakespeare",
          title: "Hamlet",
        },
        {
          quote: "All that we see or seem is but a dream within a dream.",
          name: "Edgar Allan Poe",
          title: "A Dream Within a Dream",
        },
        {
          quote:
            "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
          name: "Jane Austen",
          title: "Pride and Prejudice",
        },
        {
          quote:
            "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
          name: "Herman Melville",
          title: "Moby-Dick",
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
