"use client";
// ^ this file needs the "use client" pragma

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  SuspenseCache,
  gql,
} from "@apollo/client";
import { createFragmentRegistry } from "@apollo/client/cache";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

import { setContext } from "@apollo/client/link/context";
const AUTH_TOKEN_KEY = "auth_token";
import { onError } from "@apollo/client/link/error";

// have a function to create a client for you
function makeClient() {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        // Here you may display a message to indicate graphql error
        // You may use 'sweetalert', 'ngx-toastr' or any of your preference
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    }
    if (networkError) {
      // Here you may display a message to indicate network error
      console.log(`[Network error]: ${networkError}`);
    }
  });
  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: "http://vendure-store.jordonlee.com/shop-api",
    credentials: "include",
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: { cache: "no-cache" },
  });

  const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
      const context = operation.getContext();
      const authHeader = context.response.headers.get("vendure-auth-token");
      if (authHeader) {
        // If the auth token has been returned by the Vendure
        // server, we store it in localStorage
        localStorage.setItem(AUTH_TOKEN_KEY, authHeader);
      }
      return response;
    });
  });

  return new ApolloClient({
    // use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
    connectToDevTools: true,
    query: {
      errorPolicy: 'all',
    },
    cache: new NextSSRInMemoryCache({
      fragments: createFragmentRegistry(gql`
        fragment ProductDetails on SearchResult {
          productId
          slug
          productName
          productAsset {
            preview
          }
          inStock
          price {
            ... on PriceRange {
              min
              max
            }
          }
        }
        fragment Variant on ProductVariant {
          id
          name
          options {
            code
            name
          }
          price
          priceWithTax
          sku
          stockLevel
        }
        fragment Asset on Asset {
          id
          width
          height
          name
          preview
          focalPoint {
            x
            y
          }
        }
        fragment CartSummary on Order {
          id
          totalQuantity
        }
        fragment CartDetails on Order {
          lines {
            id
            unitPrice
            quantity
            linePrice
            productVariant {
              name
            }
            featuredAsset {
              preview
            }
          }
          subTotal
          shipping
          taxSummary {
            description
            taxRate
            taxTotal
          }
          total
          totalWithTax
        }
      `),
    }),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            // in a SSR environment, if you use multipart features like
            // @defer, you need to decide how to handle these.
            // This strips all interfaces with a `@defer` directive from your queries.
            new SSRMultipartLink({
              stripDefer: true,
            }),
            errorLink,
            httpLink,
          ])
        : ApolloLink.from([
            setContext(() => {
              const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
              if (authToken) {
                // If we have stored the authToken from a previous
                // response, we attach it to all subsequent requests.
                return {
                  headers: {
                    authorization: `Bearer ${authToken}`,
                  },
                };
              }
            }),
            errorLink,
            afterwareLink,
            httpLink,
          ]),
  });
}

// also have a function to create a suspense cache
function makeSuspenseCache() {
  return new SuspenseCache();
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider
      makeClient={makeClient}
      makeSuspenseCache={makeSuspenseCache}
    >
      {children}
    </ApolloNextAppProvider>
  );
}
