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

// ==========================
// Booking Queries & Mutations
// ==========================
export const GET_USER_BOOKINGS = gql`
  query GetUserBookings($userId: ID!) {
    getUserBookings(userId: $userId) {
      id
      userId
      name
      phone
      email
      room
      date
      time
      duration
      notes
      paymentMethod
      sessionType
      createdAt
    }
  }
`;

export const CREATE_BOOKING = gql`
  mutation CreateBooking(
    $name: String!
    $phone: String!
    $email: String!
    $room: String!
    $date: String!
    $time: String!
    $duration: String!
    $notes: String
    $paymentMethod: String!
    $sessionType: String!
  ) {
    createBooking(
      name: $name
      phone: $phone
      email: $email
      room: $room
      date: $date
      time: $time
      duration: $duration
      notes: $notes
      paymentMethod: $paymentMethod
      sessionType: $sessionType
    ) {
      id
      userId
      name
      phone
      email
      room
      date
      time
      duration
      notes
      paymentMethod
      sessionType
      createdAt
    }
  }
`;
