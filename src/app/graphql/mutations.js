import { gql } from "@apollo/client";

// ==========================
// Auth Mutations
// ==========================
export const REGISTER_USER = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      message
      token
      user {
        id
        name
        email
        archived
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
      token
      user {
        id
        name
        email
        archived
      }
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut {
      message
    }
  }
`;

// ==========================
// Chat Queries
// ==========================
export const GET_ALL_CHATS = gql`
  query GetAllChats {
    getAllChats {
      id
      name
      email
      archived
    }
  }
`;

export const GET_ARCHIVED_CHATS = gql`
  query GetArchivedChats {
    getArchivedChats {
      id
      name
      email
      archived
    }
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages($chatId: String!) {
    getMessages(chatId: $chatId) {
      id
      chatId
      from
      type
      content
      timestamp
    }
  }
`;

// ==========================
// Chat Mutations
// ==========================
export const SEND_MESSAGE = gql`
  mutation SendMessage(
    $chatId: String!
    $from: String!
    $type: String!
    $content: String!
  ) {
    sendMessage(chatId: $chatId, from: $from, type: $type, content: $content) {
      id
      chatId
      from
      type
      content
      timestamp
    }
  }
`;

export const ARCHIVE_CHAT = gql`
  mutation ArchiveChat($chatId: String!) {
    archiveChat(chatId: $chatId) {
      message
    }
  }
`;

export const UNARCHIVE_CHAT = gql`
  mutation UnarchiveChat($chatId: String!) {
    unarchiveChat(chatId: $chatId) {
      message
    }
  }
`;
