import "animate.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { InfiniteMovingCards } from "../../../components/infinite-moving-cards";

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
    <div className="h-screen pt-5">
      <div className="flex flex-col items-center justify-center h-[30%]">
        <h1 className="text-4xl font-bold">Conoce a nuestro equipo</h1>
        <p className="text-lg">
          Our team is composed of the best of the best. We are a group of
          passionate individuals who are dedicated to providing the best service
          to our clients.
        </p>
      </div>
      <div className="h-[70%] flex items-center justify-center flex-col gap-y-4">
        <InfiniteMovingCards items={testimonials} direction="right" />
        <InfiniteMovingCards items={testimonials} direction="left" />
      </div>
    </div>
  );
}
