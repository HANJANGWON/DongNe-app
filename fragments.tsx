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
