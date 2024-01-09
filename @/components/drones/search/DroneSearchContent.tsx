"use client";
import { SheetClose } from "@/components/ui/sheet";
import _ from "lodash";
import { FormState, UseFormRegister, UseFormWatch } from "react-hook-form";
import { MdClose } from "react-icons/md";
import searchItems from "@/components/drones/advanced-search/droneOptions.json";
import { camelCaseToWords, chainCaseToWords } from "@/lib/sanity/queryMaker";

// JSON-like structure for search items
const searchItems_OLD = {
  categories: ["Racing", "Fun", "Photography", "Professional"],
  easeOfUse: ["Beginner-Friendly", "Intermediate", "Advanced"],
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
  applySearch,
}: {
  register: UseFormRegister<DroneSearchState>;
  watch: UseFormWatch<DroneSearchState>;
  handleCheckboxChange: (name: string, value: string) => void;
  applySearch: () => void;
  isDirty: boolean;
}) => {
  return (
    <>
      <div className="flex flex-row flex-wrap mb-4">
        {Object.entries(watch()).map(([key, values]) => {
          if (Array.isArray(values) && values.length > 0) {
            return values.map((value: string) => (
              <span
                key={`${key}-${value}`}
                className="flex items-center px-2 py-1 m-1 text-sm bg-gray-300 rounded-md"
              >
                {chainCaseToWords(`${value}`)}
                <MdClose
                  className="ml-2 text-red-600"
                  onClick={() => handleCheckboxChange(key, value)}
                />
              </span>
            ));
          }
          return null;
        })}
        <SheetClose
          className="p-2 text-white rounded-sm bg-slate-600 "
          onClick={() => applySearch()}
        >
          Apply
        </SheetClose>
      </div>
      <form>
        <div className="grid grid-cols-1">
          {searchItems.useCases.map((useCase) => (
            <div key={useCase.category_value}>
              <label className="block mt-2 text-sm font-semibold">
                {useCase.category}
              </label>
              {useCase.choices.map((choice) => (
                <div
                  key={`${useCase.category_value}-${choice.value}`}
                  className="flex items-center"
                >
                  <input
                    type="checkbox"
                    id={`${useCase.category_value}-${choice.value}`}
                    value={choice.value}
                    {...register(`${useCase.category_value}` as any)}
                    onChange={() =>
                      handleCheckboxChange(
                        `${useCase.category_value}`,
                        choice.value
                      )
                    }
                  />
                  <label
                    htmlFor={`${useCase.category_value}-${choice.value}`}
                    className="ml-2"
                  >
                    {choice.label}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
      </form>
      {/* <form>
        <div className="grid grid-cols-1">
           
          <div>
            <label className="block mt-2 text-sm font-semibold">
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
            <label className="block mt-2 text-sm font-semibold">
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
          
          <div>
            <label className="block mt-2 text-sm font-semibold">Reviews</label>
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

         
          <div>
            <label className="block mt-2 text-sm font-semibold">Ratings</label>
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

         
          <div>
            <label className="block mt-2 text-sm font-semibold">
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

          
          <div>
            <label className="block mt-2 text-sm font-semibold">
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
      </form> */}
    </>
  );
};

export default DroneSearchContent;
