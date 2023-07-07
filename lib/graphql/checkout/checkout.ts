import { gql } from "@apollo/client";

export const transitionStateMutation = gql`
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
