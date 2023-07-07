import gql from 'graphql-tag';

export const setTransitionStateMutation = gql`
  mutation transitionOrderToState($state: String!) {
    transitionOrderToState(state: $state) {
      ...CartDetails
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

export const nextOrderStatesQuery = gql`
  query nextOrderStates {
    nextOrderStates
  }
`;


export const addPaymentToOrderMutation = gql`
  mutation addPaymentToOrder($method: String!, $metadata: JSON!) {
    addPaymentToOrder(input: { method: $method, metadata: $metadata }) {
      ... on PaymentFailedError {
        errorCode
        message
      }

      ... on NoActiveOrderError {
        errorCode
        message
      }
    }
  }
`;