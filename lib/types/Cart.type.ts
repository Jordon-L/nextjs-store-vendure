import {Asset,Variant} from "@/lib/types/Products.type"

export interface CartSummary {
  id: number;
  totalQuantity: number;
}

export interface CartDetails {
  lines: OrderLine[]
}

export interface OrderLine {
  id: number
  quantity: number
  linePrice: number
  productVariant: Variant
  featuredAsset: Asset
  subTotal: number
  shipping: number
  taxSummary: TaxSummary[]
  totalWithTax: number
}

export interface TaxSummary{
  description: string
  taxRate: number
  taxTotal: number
}