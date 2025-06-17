export interface Ingredient {
  id: string;
  quantity: string;
  unit: string;
  name: string;
}

export interface Instruction {
  id: string;
  step: string;
  photoUri?: string;
  timerDuration?: number;
}

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  prepTime?: number; //Hazırlık Süresi (dakika)
  cookTime?: number; //Pişirme Süresi (dakika)
  servings?: number; //Porsiyon Sayısı
  ingredients: Ingredient[];
  instructions: Instruction[];
  photos?: string[];
  categories: string[];
  tags: string[];
  isFavorite: boolean;
  isUserAdded?: boolean;
  createdAt: string;
  updatedAt: string;
}
