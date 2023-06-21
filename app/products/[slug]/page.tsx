"use client";

export const dynamic = "force-dynamic";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import Image from "next/image";
import { Asset } from "@/lib/types/Products.type";
import { formatPrice } from "@/lib/utils/FormatPrice";

const query = gql`
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

export default function Page({ params }: { params: { slug: string } }) {
  const productDetails = useQuery(query, {
    variables: { productSlug: params.slug },
  });
  const errors = productDetails.error;
  const loading = productDetails.loading;
  if (loading) return null;
  if (errors) return `Error! ${errors}`;

  let collection = productDetails.data?.product?.collections;
  let breadcrumbs = collection[collection.length - 1].breadcrumbs;
  let product = productDetails.data?.product;
  let selected = product.variants[0];
  let focalPoint = product.assets.focalPoint;

  console.log(selected);
  return (
    <div className="center flex-col p-6">
      <div>
        <div className="breadcrumb flex justify-start pb-4">
          {breadcrumbs.map((breadcrumb: any) => {
            if (breadcrumb.name === "__root_collection__") {
              return (
                <a href="/" className="underline mr-2" key={breadcrumb.id}>
                  Home
                </a>
              );
            } else {
              return (
                <div key={breadcrumb.id}>
                  <span className="before:mr-2 before:content-['/']" />
                  <a href={`/collections/${breadcrumb.slug}`} className="underline mr-2">{breadcrumb.name}</a>
                </div>
              );
            }
          })}
        </div>
        <div className="flex flex-col md:flex-row md:space-x-8">
          <section className="flex shrink-0 flex-col md:w-1/2">
            <Image
              className="object-cover bg-gray-950 w-full aspect-square"
              src={product.featuredAsset.preview}
              width={500}
              height={500}
              alt={product.featuredAsset.name}
            />
            <span>
              {product.assets.map((asset: Asset) => (
                <Image
                  key={asset.id}
                  src={asset.preview}
                  width={150}
                  height={150}
                  alt={asset.name}
                />
              ))}
            </span>
          </section>
          <section className="flex flex-col shrink space-y-4">
            <p className="text-2xl">{product.name}</p>
            <p className="text-lg">{formatPrice(selected.price)}</p>
            <button className="buttonHover border-solid border-2 border-black p-4">
              Add To Cart
            </button>
            <p>{product.description}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
