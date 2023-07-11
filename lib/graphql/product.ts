import gql from "graphql-tag";

export const getProductQuery = gql`
query GetProductDetail($productSlug: String!) {
  product(slug: $productSlug) {
    id
    name
    description
    variants {
      ...Variant
    }
    featuredAsset {
      ...Asset
    }
    assets {
      ...Asset
    }
    collections {
      id
      slug
      breadcrumbs {
        id
        name
        slug
      }
    }
  }
}
`;

export const getProductsQuery = gql`
  query GetProducts(
    $term: String
    $collectionSlug: String!
    $numOfItems: Int!
    $skip: Int!
    $sort: SearchResultSortParameter
    $inStock: Boolean
  ) {
    search(
      input: {
        term: $term
        take: $numOfItems
        skip: $skip
        groupByProduct: true
        collectionSlug: $collectionSlug
        sort: $sort
        inStock: $inStock
      }
    ) {
      items {
        ...ProductDetails
      }
      collections {
        collection {
          id
          slug
          breadcrumbs {
            id
            name
            slug
          }
        }
      }
      totalItems
    }
  }
`;
