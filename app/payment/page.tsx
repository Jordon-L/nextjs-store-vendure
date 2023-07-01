"use client";

export const dynamic = "force-dynamic";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query GetOrder {
    activeOrder {
      ...CartDetails
    }
  }
`;

export default function Cart() {


  return <div>payment</div>;
}
