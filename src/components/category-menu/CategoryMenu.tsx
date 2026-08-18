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
              className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-in-out sm:px-5
                ${
                  activeCategory === category
                    ? "border-[#172019] bg-[#172019] text-white shadow-[0_8px_24px_rgba(23,32,25,0.18)]"
                    : "border-transparent bg-white/55 text-[#4c5550] hover:-translate-y-0.5 hover:border-[#b5502d]/40 hover:bg-white hover:text-[#b5502d] hover:shadow-sm"
                }`}
            >
              {category === "Art Curriculum" ? (
                <div>Art Curriculum</div>
              ) : (
                <span>{category}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryMenu;
