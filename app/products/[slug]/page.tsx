"use client";

export const dynamic = "force-dynamic";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql, useMutation } from "@apollo/client";
import Image from "next/image";
import { Asset, Variant } from "@/lib/types/Products.type";
import { formatPrice } from "@/lib/utils/FormatPrice";
import { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSidebar } from "@/lib/context/SidebarProvider";
import { getOrderQuery } from "@/lib/graphql/bag";

interface ProductQuery {
  product: Product;
}

interface Product {
  id: string;
  name: string;
  description: string;
  variants: Variant[];
  featuredAsset: Asset;
  assets: Asset[];
  collections: CollectionBreadCrumbs[];
}

interface CollectionBreadCrumbs {
  id: string;
  slug: string;
  breadcrumbs: { id: string; name: string; slug: string }[];
}

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

const addToCartMutation = gql`
  mutation AddToCart($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ... on Order {
        ...CartSummary
        ...CartDetails
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

export default function Page({ params }: { params: { slug: string } }) {
  const [quantityAdd, setQuantityAdd] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [displaySuccessful, setDisplaySuccessful] = useState(false);
  const { isOpen, openSidebar, closeSidebar } = useSidebar();

  const productDetails = useSuspenseQuery<ProductQuery>(query, {
    variables: { productSlug: params.slug },
  });

  const errors = productDetails.error;

  let collection = productDetails.data?.product?.collections;
  let breadcrumbs = collection[collection.length - 1].breadcrumbs;
  let product = productDetails.data?.product;
  let selected = product.variants[0];
  const [addToCart, { data, loading, error }] = useMutation(addToCartMutation, {
    variables: { productVariantId: selected.id, quantity: quantityAdd },
  });

  const handleOnClick = () => {
    if (addingToCart == false && isOpen == false) {
      setAddingToCart(true);
      addToCart({
        refetchQueries: [
          getOrderQuery, // DocumentNode object parsed with gql
        ],
      });
    }
  };

  useEffect(() => {
    if (addingToCart == true && isOpen == true) {
      setAddingToCart(false);
    }
  }, [addingToCart, isOpen]);

  if (errors) return <div>An Error has Occured</div>;

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
                  <a
                    href={`/collections/${breadcrumb.slug}`}
                    className="underline mr-2"
                  >
                    {breadcrumb.name}
                  </a>
                </div>
              );
            }
          })}
        </div>
        <div className="flex flex-col md:flex-row md:space-x-8">
          <section className="flex shrink-0 flex-col md:w-1/2">
            <Image
              className="object-cover bg-gray-950 w-full aspect-square"
              src={`${product.featuredAsset.preview}?w=500&h=500&mode=crop&format=webp`}
              width={500}
              height={500}
              alt={product.featuredAsset.name}
              priority={true}
              unoptimized
            />
            <span>
              {product.assets.map((asset: Asset) => (
                <Image
                  key={asset.id}
                  src={`${asset.preview}?w=500&h=500&mode=crop&format=webp`}
                  width={150}
                  height={150}
                  alt={asset.name}
                  unoptimized
                />
              ))}
            </span>
          </section>
          <section className="flex flex-col shrink space-y-4">
            <p className="text-2xl">{product.name}</p>
            <p className="text-lg">{formatPrice(selected.price)}</p>
            <button
              onClick={handleOnClick}
              className="buttonHover border-solid border-2 border-black p-4 h-16"
            >
              {error ? (
                <p className="text-xl">Error has occured</p>
              ) : addingToCart ? (
                <div className="flex flex-row justify-center space-x-4">
                  {displaySuccessful ? (
                    <>
                      <p className="text-xl">Added</p>
                      <AiOutlineCheck className="w-6 h-6" />
                    </>
                  ) : (
                    <>
                      <p className="text-xl">Adding</p>
                      <AiOutlineLoading3Quarters className="animate-spin w-6 h-6" />
                    </>
                  )}
                </div>
              ) : (
                <p className="text-xl">Add to Cart</p>
              )}
            </button>
            <p>{product.description}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
