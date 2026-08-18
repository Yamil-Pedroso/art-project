interface CategoryMenuProps {
  onSelect: (category: string) => void;
  activeCategory: string;
}

const categories = [
  "All",
  "Fantasy",
  "Pets",
  "Old Cars",
  "Master copies",
  "Portraits",
  "Landscapes",
  "Anatomy Study",
  "Still Life Study",
  "Drawings",
  "Digital Art",
  "Rarisity",
  "Daily Sketching",
  "Exhibitions & Collectors",
  "Art Curriculum",
] as const;

const CategoryMenu: React.FC<CategoryMenuProps> = ({
  onSelect,
  activeCategory,
}) => {
  return (
    <nav aria-label="Artwork categories" className="mb-14 w-full sm:mb-16">
      <ul className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2 border-y border-[#172019]/10 py-5 sm:gap-3 sm:py-6">
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => onSelect(category)}
              data-active={activeCategory === category}
              className={`category-brush-button relative isolate cursor-pointer overflow-hidden rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-in-out hover:text-white sm:px-5
                ${
                  activeCategory === category
                    ? "border-[#172019] bg-[#172019] text-white shadow-[0_8px_24px_rgba(23,32,25,0.18)]"
                    : "border-transparent bg-white/55 text-[#4c5550] hover:-translate-y-0.5 hover:border-[#b5502d]/40 hover:bg-white hover:shadow-sm"
                }`}
            >
              <span
                aria-hidden="true"
                className="category-brush-stroke"
              >
                <svg
                  viewBox="0 0 180 48"
                  preserveAspectRatio="none"
                  className="h-full w-full"
                >
                  <path
                    d="M-8 32 12 23 4 20 31 15 21 11 57 10 48 5 88 8 82 3 124 9 166 4 148 13 181 14 153 21 174 24 135 27 149 32 109 31 115 37 72 34 57 42 34 35 16 43Z"
                    fill="currentColor"
                    opacity="0.98"
                  />
                  <path
                    d="M-5 39 22 27 14 25 48 19 39 16 80 15 70 11 111 14 104 10 151 13 181 10 160 19 177 21 146 25 164 29 122 30 136 35 91 33 76 40 45 36 24 45Z"
                    fill="currentColor"
                    opacity="0.78"
                  />
                  <path
                    d="m8 14 38-6M2 18l25-7m121 21 31-4m-42 9 37-2M15 45l28-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    opacity="0.72"
                  />
                </svg>
              </span>
              <span className="relative z-10">{category}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryMenu;
