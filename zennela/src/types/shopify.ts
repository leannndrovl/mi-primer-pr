export type Money = {
  amount: string
  currencyCode: string
}

export type ShopifyImage = {
  url: string
  altText: string | null
  width: number
  height: number
}

export type SelectedOption = {
  name: string
  value: string
}

export type ProductVariant = {
  id: string
  title: string
  availableForSale: boolean
  quantityAvailable?: number
  price: Money
  compareAtPrice: Money | null
  selectedOptions: SelectedOption[]
  image?: ShopifyImage | null
}

export type ProductOption = {
  id: string
  name: string
  values: string[]
}

export type Product = {
  id: string
  title: string
  handle: string
  description: string
  descriptionHtml: string
  tags: string[]
  images: ShopifyImage[]
  options: ProductOption[]
  variants: ProductVariant[]
  priceRange: {
    minVariantPrice: Money
    maxVariantPrice: Money
  }
  seo?: {
    title: string
    description: string
  }
}

export type CartLineItem = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: Money
    compareAtPrice: Money | null
    image: ShopifyImage | null
    product: {
      id: string
      title: string
      handle: string
    }
    selectedOptions: SelectedOption[]
  }
  cost: {
    totalAmount: Money
  }
}

export type Cart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  lines: CartLineItem[]
  cost: {
    totalAmount: Money
    subtotalAmount: Money
  }
}

export type Collection = {
  id: string
  title: string
  handle: string
  description: string
  image: ShopifyImage | null
  products: Product[]
}

// Raw Shopify API response types (with edges/node)
export type ShopifyProductRaw = {
  id: string
  title: string
  handle: string
  description: string
  descriptionHtml: string
  tags: string[]
  images: { edges: Array<{ node: ShopifyImage }> }
  options: ProductOption[]
  variants: { edges: Array<{ node: ProductVariant }> }
  priceRange: {
    minVariantPrice: Money
    maxVariantPrice: Money
  }
  seo?: { title: string; description: string }
}

export type ShopifyCartLineRaw = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: Money
    compareAtPrice: Money | null
    image: ShopifyImage | null
    product: { id: string; title: string; handle: string }
    selectedOptions: SelectedOption[]
  }
  cost: { totalAmount: Money }
}

export type ShopifyCartRaw = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  lines: { edges: Array<{ node: ShopifyCartLineRaw }> }
  cost: {
    totalAmount: Money
    subtotalAmount: Money
  }
}
