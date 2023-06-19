export interface Asset {
  height: number;
  width: number;
  preview: string;
  name?: string;
}
export interface PriceRange {
  min: number,
  max: number,
}
export interface ProductDetails {
  productId: number
  slug: string,
  productName: string,
  productAsset: Asset,
  inStock: boolean,
  price: PriceRange,
}

export interface ParentCollection{
  id: number,
  slug: string,
  name: string,
}
export interface CollectionDetails{
  id: number,
  name: string,
  slug: string,
  parent: ParentCollection,
  featuredAsset: Asset
}