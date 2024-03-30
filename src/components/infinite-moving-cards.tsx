import React, { useEffect, useState } from "react";
import { cn } from "../utils/cn";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  pauseOnHover = true,
  className,
}: {
  items: {
    name: string;
    img: string;
  }[];
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }

      containerRef.current.style.setProperty("--animation-duration", "80s");

      setStart(true);
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn("scroller relative z-20 w-full overflow-hidden", className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap ",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            className="w-[200px]  relative rounded-xl shadow-md border flex-shrink-0 px-8 py-2 md:w-[270px]"
            key={item.name}
          >
            <blockquote>
              <img src={item.img} alt={item.name} className="" />
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] text-gray-400 font-normal">
                    {item.name}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
