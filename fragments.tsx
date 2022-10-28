import { gql } from "@apollo/client";

export const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    id
    file
    likes
    commentsNumber
    isLiked
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      username
      fullName
      avatar
    }
    payload
    isMine
    createdAt
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    avatar
    isFollowing
    isMe
  }
`;

export const FEED_POST = gql`
  fragment FeedPost on Post {
    ...PostFragment
    user {
      id
      username
      fullName
      avatar
    }
    caption
    createdAt
    isMine
  }
  ${POST_FRAGMENT}
`;

export const ROOM_FRAGMENT = gql`
  fragment RoomParts on Room {
    id
    unreadTotal
    users {
      avatar
      username
    }
  }
`;
