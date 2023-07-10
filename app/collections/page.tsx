"use client";

export const dynamic = "force-dynamic";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import Collection from "@/components/CollectionCard";
import { CollectionDetails } from "@/lib/types/Products.type";

const collectionQuery = gql`
  query GetCollections {
    collections(options: { sort: { updatedAt: ASC } }) {
      items {
        id
        name
        slug
        parent {
          id
          slug
          name
        }
        featuredAsset {
          id
          preview
        }
      }
    }
  }
`;

export default function Collections() {
  const {data, loading, error} = useQuery(collectionQuery);

  console.log(error)
  if (error) return <div>Error has Occured</div>;

  return (
    <div>
      <div className="center flex-col p-6">
        <section className="pt-8 py-4">
          <h2 className="text-2xl mb-4 font-semibold">Shop by Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data?.collections?.items.map(
              (collection: CollectionDetails) => (
                <Collection
                  key={collection.id}
                  collection={{ ...collection }}
                />
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
