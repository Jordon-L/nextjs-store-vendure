import { gql } from "@apollo/client";

export const numberOfItems = gql`
  query numberOfItems {
    activeOrder {
      totalQuantity
    }
  }
`;
