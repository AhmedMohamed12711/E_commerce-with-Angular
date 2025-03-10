interface RootObject {
  results: number;
  metadata: Metadata;
  data: brands[];
}

export interface brands {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}export interface Brand {
}
