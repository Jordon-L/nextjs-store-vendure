export interface Asset {
  id: number;
  height: number;
  width: number;
  preview: string;
  name: string;
  focalPoint: focalPoint
}

export interface Variant {
  id : number
  name : string
  options : {code: string, name:string}
  price: number
  priceWithTax: number
  sku: string
  stockLevel: string
}
export interface focalPoint {
  x: number;
  y: number;
}
export interface PriceRange {
  min: number;
  max: number;
}
export interface ProductDetails {
  productId: number;
  slug: string;
  productName: string;
  productAsset: Asset;
  inStock: boolean;
  price: PriceRange;
}



export interface ParentCollection {
  id: number;
  slug: string;
  name: string;

}
export interface CollectionDetails {
  id: number;
  name: string;
  slug: string;
  parent: ParentCollection;
  featuredAsset: Asset;
  breadcrumbs: Breadcrumb[];
}

export interface SearchQuery {
  search: SearchItems;
}

export interface SearchItems {
  items: ProductDetails[];
  totalItems: number
  collections: CollectionsResults[];
}

export interface CollectionsResults {
  collection: CollectionDetails
}

export interface Breadcrumb {
  id: string;
  name: string;
  slug: string;
}