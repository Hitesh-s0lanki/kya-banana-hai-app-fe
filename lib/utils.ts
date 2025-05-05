import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sampleData = {
  "dish_name": "Rajasthani Mirchi Vada",
  "dish_description": "A spicy and flavorful Rajasthani snack made with large green chilies stuffed with a spicy potato filling, dipped in gram flour batter, and deep-fried to perfection.",
  youtube_link: "https://www.youtube.com/embed/5oSulCW3QGw",
  "ingredients": [
    "6 large green chilies",
    "3 large potatoes, boiled and mashed",
    "1 teaspoon mustard seeds",
    "1 teaspoon cumin seeds",
    "1 pinch asafoetida (Hing)",
    "1 teaspoon ginger, grated",
    "2 green chilies, finely chopped",
    "1/2 teaspoon turmeric powder",
    "1 teaspoon red chili powder",
    "1 teaspoon coriander powder",
    "Salt to taste",
    "2 tablespoons fresh coriander leaves, chopped",
    "1 cup gram flour (Besan)",
    "1/4 teaspoon baking soda",
    "Water as needed",
    "Oil for deep frying"
  ],
  "recipe": [
    "Slit the green chilies lengthwise and remove the seeds. Set aside.",
    "In a pan, heat a tablespoon of oil and add mustard seeds, cumin seeds, and asafoetida.",
    "Add grated ginger and finely chopped green chilies. Sauté for a minute.",
    "Add mashed potatoes, turmeric powder, red chili powder, coriander powder, and salt. Mix well.",
    "Cook the mixture for a few minutes and then add chopped coriander leaves. Allow it to cool.",
    "Stuff the slit green chilies with the prepared potato mixture.",
    "In a bowl, mix gram flour, baking soda, and salt. Add water gradually to make a thick batter.",
    "Heat oil in a deep frying pan.",
    "Dip the stuffed chilies in the gram flour batter and coat them evenly.",
    "Deep fry the batter-coated chilies until they are golden brown and crispy.",
    "Drain on paper towels to remove excess oil.",
    "Serve hot with chutney or sauce of your choice."
  ],
  "type": { "veg": true, "non_veg": false, "vegan": false, "eggs": false },
  "meal": { "breakfast": false, "lunch": true, "dinner": false, "snacks": false },
  "preferenes": { "rajasthani": true, "gujarati": false, "punjabi": false, "south_indian": false, "chinese": false, "italian": false, "mexican": false },
  "preferences_taste": { "spicy": true, "sweet": false, "savory": false, "sour": false }
}