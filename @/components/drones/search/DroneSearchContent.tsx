"use client";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

// JSON-like structure for search items
const searchItems = {
  categories: ["Racing", "Fun", "Photography", "Professional"],
  priceRanges: ["0-100", "100-200", "200-500", "500+"],
  reviews: [
    "5 stars",
    "4 stars & above",
    "3 stars & above",
    "2 stars & above",
    "1 star & above",
  ],
  ratings: ["Excellent", "Very Good", "Good", "Average", "Poor"],
  usage: [
    "Recreational",
    "Professional Filmmaking",
    "Agriculture",
    "Surveying",
  ],
  weightClasses: ["Mini Drones", "Lightweight", "Medium", "Heavy-duty"],
  compatibility: ["VR Headsets", "Mobile Devices", "Accessories"],
};
const DroneSearchContent = ({
  register,
  watch,
  handleCheckboxChange,
}: {
  register: UseFormRegister<DroneSearchState>;
  watch: UseFormWatch<DroneSearchState>;
  handleCheckboxChange: (name: string, value: string) => void;
}) => {
  return (
    <>
      <form>
        <div className="grid grid-cols-1">
          {/* Categories */}
          <div>
            <label className="block mb-2 text-sm font-semibold">
              Categories
            </label>
            {searchItems.categories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  value={category}
                  {...register("selectedCategories")}
                  onChange={() =>
                    handleCheckboxChange("selectedCategories", category)
                  }
                />
                <label htmlFor={`category-${category}`} className="ml-2">
                  {category}
                </label>
              </div>
            ))}
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">
              Price Ranges
            </label>
            {searchItems.priceRanges.map((priceRange) => (
              <div key={priceRange} className="flex items-center">
                <input
                  type="checkbox"
                  id={`priceRange-${priceRange}`}
                  value={priceRange}
                  {...register("selectedPriceRanges")}
                  onChange={() =>
                    handleCheckboxChange("selectedPriceRanges", priceRange)
                  }
                />
                <label htmlFor={`priceRange-${priceRange}`} className="ml-2">
                  {priceRange}
                </label>
              </div>
            ))}
          </div>
          {/* Reviews */}
          <div>
            <label className="block mb-2 text-sm font-semibold">Reviews</label>
            {searchItems.reviews.map((review) => (
              <div key={review} className="flex items-center">
                <input
                  type="checkbox"
                  id={`review-${review}`}
                  value={review}
                  {...register("selectedReviews")}
                  onChange={() =>
                    handleCheckboxChange("selectedReviews", review)
                  }
                />
                <label htmlFor={`review-${review}`} className="ml-2">
                  {review}
                </label>
              </div>
            ))}
          </div>

          {/* Ratings */}
          <div>
            <label className="block mb-2 text-sm font-semibold">Ratings</label>
            {searchItems.ratings.map((rating) => (
              <div key={rating} className="flex items-center">
                <input
                  type="checkbox"
                  id={`rating-${rating}`}
                  value={rating}
                  {...register("selectedRatings")}
                  onChange={() =>
                    handleCheckboxChange("selectedRatings", rating)
                  }
                />
                <label htmlFor={`rating-${rating}`} className="ml-2">
                  {rating}
                </label>
              </div>
            ))}
          </div>

          {/* Weight Classes */}
          <div>
            <label className="block mb-2 text-sm font-semibold">
              Weight Classes
            </label>
            {searchItems.weightClasses.map((weightClass) => (
              <div key={weightClass} className="flex items-center">
                <input
                  type="checkbox"
                  id={`weightClass-${weightClass}`}
                  value={weightClass}
                  {...register("selectedWeightClasses")}
                  onChange={() =>
                    handleCheckboxChange("selectedWeightClasses", weightClass)
                  }
                />
                <label htmlFor={`weightClass-${weightClass}`} className="ml-2">
                  {weightClass}
                </label>
              </div>
            ))}
          </div>

          {/* Compatibility */}
          <div>
            <label className="block mb-2 text-sm font-semibold">
              Compatibility
            </label>
            {searchItems.compatibility.map((compatibility) => (
              <div key={compatibility} className="flex items-center">
                <input
                  type="checkbox"
                  id={`compatibility-${compatibility}`}
                  value={compatibility}
                  {...register("selectedCompatibility")}
                  onChange={() =>
                    handleCheckboxChange("selectedCompatibility", compatibility)
                  }
                />
                <label
                  htmlFor={`compatibility-${compatibility}`}
                  className="ml-2"
                >
                  {compatibility}
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </>
  );
};

export default DroneSearchContent;
