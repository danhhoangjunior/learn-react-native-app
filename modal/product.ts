interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface File {
  _id: string;
  name: string;
  size: number;
}

interface DetailImage {
  video_poster_version: number;
  _id: string;
  url: string;
  label: string;
}

interface Author {
  _id: string;
  last_name: string;
  first_name: string;
  display_name_slug: string;
  avatar_url: string;
  display_name: string;
  avatar_url_version: number;
  has_resized_avatar: boolean;
}

export interface ProductType {
  _id: string;
  type: string;
  featured: boolean;
  is_subscription: boolean;
  category: Category[];
  has_scaled_images: boolean;
  has_resized_card_image: boolean;
  card_image_version: number;
  seasonal_promo_enabled: boolean;
  name: string;
  slug: string;
  blurb: string;
  price: number;
  card_image: string;
  card_primary: string;
  files: File[];
  detail_images: DetailImage[];
  author: Author;
  on_sale: boolean;
  seasonal_promo_price: number | null;
  site_promo: boolean;
  permalink: string;
  likes: number;
  empty?: boolean;
}
