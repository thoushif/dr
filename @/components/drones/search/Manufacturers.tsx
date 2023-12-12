"use client";
const Manufacturers: React.FC<{
  manufacturers: string[];
  selectedManufacturers: string[];
  onSelect: (manufacturer: string) => void;
  onRemove: (manufacturer: string) => void;
}> = ({ manufacturers, selectedManufacturers, onSelect, onRemove }) => (
  <div className="flex flex-wrap gap-4">
    {manufacturers?.map((manufacturer) => (
      <span
        key={manufacturer}
        className={`bg-slate-500 text-white text-sm px-2 py-1 rounded-2xl cursor-pointer ${
          selectedManufacturers.includes(manufacturer)
            ? "bg-slate-800 text-white"
            : ""
        }`}
        onClick={() =>
          selectedManufacturers.includes(manufacturer)
            ? onRemove(manufacturer)
            : onSelect(manufacturer)
        }
      >
        {manufacturer}
        {selectedManufacturers.includes(manufacturer) && (
          <button
            type="button"
            className="ml-1 text-white-600"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the tag click event from firing
              onRemove(manufacturer);
            }}
          >
            x
          </button>
        )}
      </span>
    ))}
  </div>
);
export default Manufacturers;
