import gql from 'graphql-tag';


export const getOrderQuery = gql`
  query getOrder {
    activeOrder {
      ...CartDetails
      totalQuantity
    }
  }
`;

export const removeItemMutation = gql`
  mutation removeOrderLine($id: ID!) {
    removeOrderLine(orderLineId: $id) {
      ... on Order {
        updatedAt
      }
      ... on OrderModificationError {
        errorCode
        message
      }
    }
  }
`;