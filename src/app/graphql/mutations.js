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
      }
    }
  }
`;

export const VERIFY_OTP = gql`
  mutation VerifyOTP($email: String!, $otp: String!) {
    verifyOTP(email: $email, otp: $otp) {
      message
      token
      user {
        id
        name
        email
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
// Chat Queries & Mutations
// ==========================

// Get all messages for a chat
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

// Send a new message
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

// Get all chat IDs (for admin to see all users)
export const GET_ALL_CHATS = gql`
  query GetAllChats {
    getAllChats {
      id
      name
      email
    }
  }
`;
