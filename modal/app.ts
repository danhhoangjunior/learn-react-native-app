export interface IApp {
  seName: string;
  img_preview: string;
  create_at: string;
  id: string;
  publish: boolean;
  isDemo: boolean;
  title: string;
  total_vote: number;
  screen_app: string;
  discription: string;
  type: string;
  total_screen: number;
  total_download: number;
  price: number;
  discount: number;
  rating: number;
  image_photos: string[];
  updated_at: string;
  user_id: string;
  category: ProductCategoryType;
}

export enum ProductCategoryType {
  SOCIAL = "Social",
  ECOMMERCE = "Ecommerce",
  HEALTH = "Health",
  FINANCE = "Finance",
  FOOD = "Food",
  OTHER = "Other",
}
