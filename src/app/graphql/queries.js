
// export const GET_MESSAGES = gql`
//   query GetMessages($sessionId: String!) {
//     getMessages(sessionId: $sessionId) {
//       id
//       sessionId
//       from
//       content
//       timestamp
//     }
//   }
// `;
import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query GetMessagesBySession($sessionId: String!) {
    getMessagesBySession(sessionId: $sessionId) {
      id
      sessionId
      from
      content
      timestamp
    }
  }
`;

export const GET_ALL_USER_MESSAGES = gql`
  query GetAllUserMessages {
    getAllUserMessages {
      id
      sessionId
      from
      content
      timestamp
    }
  }
`;
