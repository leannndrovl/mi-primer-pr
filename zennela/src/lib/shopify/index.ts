import type {
  Cart,
  CartLineItem,
  Collection,
  Product,
  ShopifyCartRaw,
  ShopifyProductRaw,
} from '@/types/shopify'
import {
  GET_CART_QUERY,
  GET_COLLECTION_QUERY,
  GET_COLLECTIONS_QUERY,
  GET_FEATURED_PRODUCTS_QUERY,
  GET_PRODUCT_QUERY,
  GET_PRODUCTS_QUERY,
} from './queries'
import {
  ADD_TO_CART_MUTATION,
  CREATE_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  UPDATE_CART_MUTATION,
} from './mutations'

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!
const API_URL = `https://${DOMAIN}/api/2024-01/graphql.json`

async function shopifyFetch<T>({
  query,
  variables,
  cache = 'force-cache',
  tags,
}: {
  query: string
  variables?: Record<string, unknown>
  cache?: RequestCache
  tags?: string[]
}): Promise<T> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    next: tags ? { tags } : undefined,
  })

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`)
  }

  const json = await res.json()

  if (json.errors) {
    throw new Error(json.errors[0]?.message ?? 'Shopify GraphQL error')
  }

  return json.data as T
}

// Normalizers

function normalizeProduct(raw: ShopifyProductRaw): Product {
  return {
    ...raw,
    images: raw.images.edges.map((e) => e.node),
    variants: raw.variants.edges.map((e) => e.node),
  }
}

function normalizeCart(raw: ShopifyCartRaw): Cart {
  return {
    ...raw,
    lines: raw.lines.edges.map((e): CartLineItem => e.node),
  }
}

// Products

export async function getProducts(options?: {
  first?: number
  after?: string
  query?: string
}): Promise<Product[]> {
  const data = await shopifyFetch<{
    products: { edges: Array<{ node: ShopifyProductRaw }> }
  }>({
    query: GET_PRODUCTS_QUERY,
    variables: { first: options?.first ?? 12, after: options?.after, query: options?.query },
    tags: ['products'],
  })

  return data.products.edges.map((e) => normalizeProduct(e.node))
}

export async function getFeaturedProducts(first = 8): Promise<Product[]> {
  const data = await shopifyFetch<{
    products: { edges: Array<{ node: ShopifyProductRaw }> }
  }>({
    query: GET_FEATURED_PRODUCTS_QUERY,
    variables: { first },
    tags: ['products'],
  })

  return data.products.edges.map((e) => normalizeProduct(e.node))
}

export async function getProduct(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{ productByHandle: ShopifyProductRaw | null }>({
    query: GET_PRODUCT_QUERY,
    variables: { handle },
    tags: [`product-${handle}`],
  })

  if (!data.productByHandle) return null
  return normalizeProduct(data.productByHandle)
}

// Collections

export async function getCollections(): Promise<Collection[]> {
  const data = await shopifyFetch<{
    collections: { edges: Array<{ node: Omit<Collection, 'products'> }> }
  }>({
    query: GET_COLLECTIONS_QUERY,
    variables: { first: 20 },
    tags: ['collections'],
  })

  return data.collections.edges.map((e) => ({ ...e.node, products: [] }))
}

export async function getCollection(
  handle: string,
  first = 12,
  after?: string
): Promise<Collection | null> {
  const data = await shopifyFetch<{
    collectionByHandle: {
      id: string
      title: string
      handle: string
      description: string
      image: Collection['image']
      products: { edges: Array<{ node: ShopifyProductRaw }> }
    } | null
  }>({
    query: GET_COLLECTION_QUERY,
    variables: { handle, first, after },
    tags: [`collection-${handle}`],
  })

  if (!data.collectionByHandle) return null

  return {
    ...data.collectionByHandle,
    products: data.collectionByHandle.products.edges.map((e) => normalizeProduct(e.node)),
  }
}

// Cart

export async function createCart(variantId?: string, quantity = 1): Promise<Cart> {
  const input = variantId
    ? { lines: [{ merchandiseId: variantId, quantity }] }
    : {}

  const data = await shopifyFetch<{
    cartCreate: { cart: ShopifyCartRaw; userErrors: Array<{ message: string }> }
  }>({
    query: CREATE_CART_MUTATION,
    variables: { input },
    cache: 'no-store',
  })

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message)
  }

  return normalizeCart(data.cartCreate.cart)
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCartRaw | null }>({
    query: GET_CART_QUERY,
    variables: { cartId },
    cache: 'no-store',
  })

  if (!data.cart) return null
  return normalizeCart(data.cart)
}

export async function addToCart(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: ShopifyCartRaw; userErrors: Array<{ message: string }> }
  }>({
    query: ADD_TO_CART_MUTATION,
    variables: { cartId, lines },
    cache: 'no-store',
  })

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors[0].message)
  }

  return normalizeCart(data.cartLinesAdd.cart)
}

export async function updateCart(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: ShopifyCartRaw; userErrors: Array<{ message: string }> }
  }>({
    query: UPDATE_CART_MUTATION,
    variables: { cartId, lines },
    cache: 'no-store',
  })

  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message)
  }

  return normalizeCart(data.cartLinesUpdate.cart)
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: ShopifyCartRaw; userErrors: Array<{ message: string }> }
  }>({
    query: REMOVE_FROM_CART_MUTATION,
    variables: { cartId, lineIds },
    cache: 'no-store',
  })

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors[0].message)
  }

  return normalizeCart(data.cartLinesRemove.cart)
}
