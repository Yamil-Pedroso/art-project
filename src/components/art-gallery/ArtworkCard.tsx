import { useState, useEffect, useRef } from "react";
import { artworks } from "@/data/artworks";

const ArtworkCard = ({
  artwork,
  index,
  onClick,
}: {
  artwork: (typeof artworks)[0];
  index: number;
  onClick: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 100);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    const currentCard = cardRef.current;
    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, [index]);

  return (
    <div>
      <div
        ref={cardRef}
        className={`group bg-[#e8e6db] shadow-lg overflow-hidden cursor-pointer transition-all duration-700 ease-out hover:scale-105 hover:shadow-2xl transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
        onClick={onClick}
      >
        <div className="relative overflow-hidden">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            loading="lazy"
            className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors duration-300">
          {artwork.title}
        </h3>

        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600 font-medium">
            <span className="text-gray-800">Medium:</span> {artwork.medium}
          </p>
          <p className="text-sm text-gray-600 font-medium">
            <span className="text-gray-800">Dimensions:</span>{" "}
            {artwork.dimensions}
          </p>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed line-clamp-1">
          {artwork.description}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-700">
          <button
            onClick={onClick}
            className="text-gray-500 hover:text-neutral-700 text-sm font-semibold transition-colors duration-200 cursor-pointer"
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
