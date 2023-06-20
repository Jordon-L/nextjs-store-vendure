"use client";

export const dynamic = "force-dynamic";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import Collection from "@/components/Collection";
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

export default function Home() {
  const collections = useQuery(collectionQuery);

  const errors = collections.error;
  const loading = collections.error;

  if (loading) return null;
  if (errors) return `Error! ${errors}`;
  return (
    <div>
      <div className="center flex-col p-6">
        <section className="pt-8 py-4">
          <h2 className="text-2xl mb-4 font-semibold">Shop by Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collections.data?.collections?.items.map(
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
