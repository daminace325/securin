export type Nutrients = {
  calories: string;
  carbohydrateContent: string;
  cholesterolContent: string;
  fiberContent: string;
  proteinContent: string;
  saturatedFatContent: string;
  sodiumContent: string;
  sugarContent: string;
  fatContent: string;
};

export type Recipe = {
  _id: string;
  title: string;
  cuisine: string;
  rating: number;
  prep_time: number;
  cook_time: number;
  total_time: number;
  description: string;
  nutrients: Nutrients;
  serves: string;
};
