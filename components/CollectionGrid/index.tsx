"use client";

export const dynamic = "force-dynamic";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import { CollectionDetails } from "@/lib/types/Products.type";
import { CollectionCard, Skeleton } from "@/components/CollectionCard";

const query = gql`
  query GetColletions {
    collections(options: { take: 4, sort: { updatedAt: ASC } }) {
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

export default function CollectionGrid() {
  const collectionQuery = useQuery(query);

  const errors = collectionQuery.error;
  const loading = collectionQuery.loading;

  if (loading)
    return (
      <>
        <h2 className="text-2xl mb-4 font-semibold">Shop by Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </>
    );
  if (errors) return <div></div>;

  return (
    <>
      <h2 className="text-2xl mb-4 font-semibold">Shop by Collection</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
        {collectionQuery.data?.collections?.items.map(
          (collection: CollectionDetails) => (
            <CollectionCard
              key={collection.id}
              collection={{ ...collection }}
            />
          )
        )}
      </div>
    </>
  );
}
