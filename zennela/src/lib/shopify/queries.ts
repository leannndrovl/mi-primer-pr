const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    title
    handle
    description
    descriptionHtml
    tags
    images(first: 10) {
      edges { node { url altText width height } }
    }
    options { id name values }
    variants(first: 100) {
      edges {
        node {
          id
          title
          availableForSale
          quantityAvailable
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
          image { url altText width height }
        }
      }
    }
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    seo { title description }
  }
`

const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount currencyCode }
              compareAtPrice { amount currencyCode }
              image { url altText width height }
              product { id title handle }
              selectedOptions { name value }
            }
          }
          cost {
            totalAmount { amount currencyCode }
          }
        }
      }
    }
    cost {
      totalAmount { amount currencyCode }
      subtotalAmount { amount currencyCode }
    }
  }
`

export const GET_PRODUCTS_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetProducts($first: Int!, $after: String, $query: String) {
    products(first: $first, after: $after, query: $query, sortKey: BEST_SELLING) {
      pageInfo { hasNextPage endCursor }
      edges { node { ...ProductFragment } }
    }
  }
`

export const GET_PRODUCT_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetProduct($handle: String!) {
    productByHandle(handle: $handle) { ...ProductFragment }
  }
`

export const GET_FEATURED_PRODUCTS_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetFeaturedProducts($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      edges { node { ...ProductFragment } }
    }
  }
`

export const GET_COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id title handle description
          image { url altText width height }
        }
      }
    }
  }
`

export const GET_COLLECTION_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetCollection($handle: String!, $first: Int!, $after: String) {
    collectionByHandle(handle: $handle) {
      id title handle description
      image { url altText width height }
      products(first: $first, after: $after, sortKey: BEST_SELLING) {
        pageInfo { hasNextPage endCursor }
        edges { node { ...ProductFragment } }
      }
    }
  }
`

export const GET_CART_QUERY = `
  ${CART_FRAGMENT}
  query GetCart($cartId: ID!) {
    cart(id: $cartId) { ...CartFragment }
  }
`
